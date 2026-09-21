# Security Specification: 1st Impressions Firestore Architecture

## 1. Data Invariants

- **Lead Invariant**: Any visitor can submit a lead / demo request. The payload must strictly conform to allowed keys (`name`, `email`, `businessName`, `industry`, `teamSize`, `phoneSetup`, `problemStatement`, `planInterest`, `source`, `createdAt`), `name` and `email` must be non-empty strings under size limits, and `createdAt` must match `request.time`. Direct client modification or deletion of submitted leads is denied to prevent tampering or data loss.
- **Agent Invariant**: An agent configuration must contain a valid `businessName` and `personalityId` within defined lengths. If signed in, `userId` must match `request.auth.uid`. Unauthenticated users can save anonymous drafts where `userId == 'anonymous'`. Updates must not alter `createdAt`.
- **CallLog Invariant**: Call logs record call status and summary. Client cannot forge timestamps or exceed maximum transcript lengths.
- **Admin Invariant**: Read access to private leads is restricted to authorized admins (`chrisfbailey.CB@gmail.com`).

---

## 2. The "Dirty Dozen" Malicious Payloads

1. **Ghost Field Lead Injection**: Submitting a lead with `{ "name": "John", "email": "john@test.com", "isAdmin": true, "source": "demo" }` -> REJECTED (Strict keys).
2. **Payload Flooding on Lead**: Submitting `problemStatement` of 100KB -> REJECTED (Max size exceeded).
3. **Invalid Email Format**: Submitting `email` with `not-an-email` or length > 100 -> REJECTED.
4. **Forged Timestamp**: Submitting a lead with `createdAt: "1999-01-01T00:00:00Z"` instead of `request.time` -> REJECTED.
5. **Lead Tampering (Update Gap)**: Attempting to update or overwrite an existing lead -> REJECTED (Leads are append-only).
6. **Lead Scraping**: Unauthorized client attempting `allow list` or `get` on `/leads` collection without admin authentication -> REJECTED.
7. **Identity Spoofing on Agent**: Authenticated user `user-123` submitting an agent with `userId: "admin-456"` -> REJECTED (Identity integrity check).
8. **Immortal Field Corruption**: Updating an agent and changing its original `createdAt` timestamp -> REJECTED.
9. **Prompt Buffer Overflow**: Injecting a 50KB prompt string into `prompt` field -> REJECTED (Prompt limit 8000 chars).
10. **ID Poisoning Attack**: Writing an agent to path `/agents/..%2F..%2Fsys` with malicious chars -> REJECTED (`isValidId` check).
11. **Blanket Collection Deletion**: Attempting `delete` on `/leads/{leadId}` as anonymous or non-admin user -> REJECTED.
12. **CallLog System Field Hijacking**: Writing a CallLog with arbitrary unvalidated object fields -> REJECTED (Strict schema validation).

---

## 3. Test Runner & Verification

All 12 test vectors are verified against the ABAC validation predicates in `firestore.rules`.
