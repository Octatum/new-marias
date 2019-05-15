import { useEffect } from 'react';

export function useScrollBehaviorPolyfill() {
  useEffect(() => {
    async function importPolyfill() {
      if (!('scrollBehavior' in document.documentElement.style)) {
        await import('scroll-behavior-polyfill');
      } else {
        console.log('No need to import module');
      }
    }

    importPolyfill();
  }, []);
}
