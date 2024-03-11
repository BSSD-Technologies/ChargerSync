import { useCallback, useEffect, useState } from "react";

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
}

interface UseValidateString {
  /** Whether the string is valid */
  hasError: boolean;
  /** Helper text message for error */
  errorText: string;
  /** Check if a string is valid or not */
  validateString: (value: string) => void;
}

/**
 * Validate string input, and deal with error handling
 * @param hasErrorDefault = false
 * @returns hasError, errorText, validateString
 */
export function useValidateString(hasErrorDefault = false): UseValidateString {
  const [hasError, setHasError] = useState(hasErrorDefault);
  const [errorText, setErrorText] = useState(" ");

  const validateString = useCallback((value: string) => {
    if (!value || value.length <= 0) {
      setHasError(true);
      setErrorText("Please enter a value.");
    } else {
      setHasError(false);
      setErrorText(" ");
    }
  }, []);

  return { hasError, errorText, validateString };
}

interface UseValidateInt {
  /** Whether the int is valid */
  hasError: boolean;
  /** Helper text message for error */
  errorText: string;
  /** Check if an int, sent as string, is valid or not. Optionally check if exceeds max */
  validateInt: (value: string, max?: number) => void;
  setError: (value: boolean) => void;
}

/**
 * Validate REQUIRED int input, and deal with error handling
 * @param hasErrorDefault = false
 * @returns hasError, errorText, validateInt
 */
export function useValidateInt(hasErrorDefault = false): UseValidateInt {
  const [hasError, setHasError] = useState(hasErrorDefault);
  const [errorText, setErrorText] = useState(" ");
  
  const setError = useCallback((value: boolean) => {
    setHasError(value);
  }, []);

  const validateInt = useCallback((value: string, max?: number) => {
    if (!value || value.length <= 0) {
      setHasError(true);
      setErrorText("Please enter a value.");
    } else if (value.includes("-")) {
      setHasError(true);
      setErrorText("Negative values are not allowed.");
    } else if (value.includes(".")) {
      setHasError(true);
      setErrorText("Please enter a whole number.");
    } else if (max && parseInt(value) > max) {
      setHasError(true);
      setErrorText("Cannot exceed maximum enrollment.");
    } else {
      setHasError(false);
      setErrorText(" ");
    }
  }, []);

  return { hasError, errorText, validateInt, setError };
}

/**
 * Validate NON-REQUIRED int input, and deal with error handling
 * @param hasErrorDefault = false
 * @returns hasError, errorText, validateInt
 */
export function useValidateIntNR(hasErrorDefault = false): UseValidateInt {
  const [hasError, setHasError] = useState(hasErrorDefault);
  const [errorText, setErrorText] = useState(" ");

  const setError = useCallback((value: boolean) => {
    setHasError(value);
  }, []);

  const validateInt = useCallback((value: string, max?: number) => {
    if (value.includes("-")) {
      setHasError(true);
      setErrorText("Negative values are not allowed.");
    } else if (value.includes(".")) {
      setHasError(true);
      setErrorText("Please enter a whole number.");
    } else if (max && parseInt(value) > max) {
      setHasError(true);
      setErrorText("Cannot exceed maximum enrollment.");
    } else {
      setHasError(false);
      setErrorText(" ");
    }
  }, []);

  return { hasError, errorText, validateInt, setError };
}
