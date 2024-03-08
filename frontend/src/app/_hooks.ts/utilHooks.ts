import { useCallback, useEffect, useState } from 'react';

/**
 * Detect first render of a component
 * @returns isFirstRender
 */
export function useFirstRender() {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    }
  }, [isFirstRender]);

  return isFirstRender;
};

interface UseValidateString {
  /** Whether the string is valid */
  hasError: boolean;
  /** Helper text message for error */
  errorText: string;
  /** Check if a string is valid or not */
  validateString: (value: string) => void;
}

/**
 * 
 * @param hasErrorDefault 
 * @returns 
 */
export function useValidateString(hasErrorDefault = false): UseValidateString {
  const [hasError, setHasError] = useState(hasErrorDefault);
  const [errorText, setErrorText] = useState(" ");

  const validateString = useCallback((value: string) => {
    if (!value || value.length <= 0) {
      setHasError(true);
      setErrorText("Please enter a value.")
    } else {
      setHasError(false);
      setErrorText(" ");
    }
  }, [])

  return { hasError, errorText, validateString };
};
