'use client';

import { useState, useEffect } from 'react';

/**
 * A hook that returns true when the component is mounted on the client side.
 * Use this to safely render components that depend on browser APIs.
 */
export function useClientOnly() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}