import { useEffect } from 'react';

interface PageMeta {
  title: string;
  description?: string;
}

/**
 * Minimal document-head management. A helmet library would be a dependency for
 * two DOM writes; this covers everything a client-rendered marketing site needs.
 */
export function usePageMeta({ title, description }: PageMeta) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    if (!description) return;
    const tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!tag) return;
    const previous = tag.content;
    tag.content = description;
    return () => {
      tag.content = previous;
    };
  }, [description]);
}
