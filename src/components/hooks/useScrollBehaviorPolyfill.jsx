import { useEffect } from 'react';
import 'scroll-behavior-polyfill';

export function useScrollBehaviorPolyfill() {
  useEffect(() => {
    async function importPolyfill() {}

    importPolyfill();
  }, []);
}
