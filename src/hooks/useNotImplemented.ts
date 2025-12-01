import { useState, useCallback } from 'react';

export const useNotImplemented = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [featureName, setFeatureName] = useState('');

  const showNotImplemented = useCallback((name: string = '') => {
    setFeatureName(name);
    setIsOpen(true);
  }, []);

  const closeNotImplemented = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    featureName,
    showNotImplemented,
    closeNotImplemented
  };
};
