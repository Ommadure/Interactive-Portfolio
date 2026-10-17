import { useEffect, useState } from 'react';

type NetworkInformation = {
  saveData?: boolean;
  addEventListener?: (type: 'change', listener: () => void) => void;
  removeEventListener?: (type: 'change', listener: () => void) => void;
};

export function useReducedData() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    setReduced(!!connection?.saveData);
    const listener = () => setReduced(!!connection?.saveData);
    connection?.addEventListener?.('change', listener);
    return () => connection?.removeEventListener?.('change', listener);
  }, []);
  return reduced;
}
