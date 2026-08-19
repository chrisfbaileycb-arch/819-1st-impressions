import { useEffect } from "react";

interface PageMetaProps {
  title: string;
  description?: string;
  canonical?: string;
}

/**
 * Lightweight per-page meta tag manager for the SPA.
 * Updates document.title and the primary meta description on mount.
 * Restores to the default on unmount.
 */
export default function PageMeta({ title, description, canonical }: PageMetaProps) {
  useEffect(() => {
    const fullTitle = `${title} | 1st Impressions`;
    const prevTitle = document.title;
    document.title = fullTitle;

    const descEl = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    const prevDesc = descEl?.content ?? "";
    if (description && descEl) descEl.content = description;

    const ogTitleEl = document.querySelector('meta[property="og:title"]') as HTMLMetaElement | null;
    const prevOgTitle = ogTitleEl?.content ?? "";
    if (ogTitleEl) ogTitleEl.setAttribute("content", fullTitle);

    const ogDescEl = document.querySelector('meta[property="og:description"]') as HTMLMetaElement | null;
    const prevOgDesc = ogDescEl?.content ?? "";
    if (description && ogDescEl) ogDescEl.setAttribute("content", description);

    // Canonical link
    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const prevCanonical = canonicalEl?.href ?? "";
    if (canonical) {
      if (!canonicalEl) {
        canonicalEl = document.createElement("link");
        canonicalEl.rel = "canonical";
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.href = `https://1stimpressionsai.com${canonical}`;
    }

    return () => {
      document.title = prevTitle;
      if (descEl) descEl.content = prevDesc;
      if (ogTitleEl) ogTitleEl.setAttribute("content", prevOgTitle);
      if (ogDescEl) ogDescEl.setAttribute("content", prevOgDesc);
      if (canonicalEl && !prevCanonical) {
        canonicalEl.remove();
      } else if (canonicalEl && prevCanonical) {
        canonicalEl.href = prevCanonical;
      }
    };
  }, [title, description, canonical]);

  return null;
}
