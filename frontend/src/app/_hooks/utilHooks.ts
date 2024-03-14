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
  /** Set the value for hasError manually */
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
    // Check if value DNE, is empty string, or NaN
    if (!value || value.length <= 0 || value == "NaN") {
      setHasError(true);
      setErrorText("Please enter a value.");
    }
    // Check if value is negative
    else if (value.includes("-")) {
      setHasError(true);
      setErrorText("Negative values are not allowed.");
    } 
    // Check if int value is greater than 0
    else if (parseInt(value) == 0) {
      setHasError(true);
      setErrorText("Value must be at least 1.");
    }
    else {
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
    // Check if value is negative
    if (value.includes("-")) {
      setHasError(true);
      setErrorText("Negative values are not allowed.");
    }
    // Check if int value is greater than 0
    else if (parseInt(value) == 0) {
      setHasError(true);
      setErrorText("Value must be at least 1.");
    }
    // Check if value exceeds maximum value
    else if (max && parseInt(value) > max) {
      setHasError(true);
      setErrorText("Cannot exceed maximum enrollment.");
    } else {
      setHasError(false);
      setErrorText(" ");
    }
  }, []);

  return { hasError, errorText, validateInt, setError };
}

interface UseValidateTime {
  /** Whether the time string is valid */
  hasError: boolean;
  /** Helper text message for error */
  errorText: string;
  /** Check if a string is valid or not */
  validateTime: (value: string, min?: string) => void;
  /** Set the value for hasError manually */
  setError: (value: boolean) => void;
}

/**
 * Validate time string input, and deal with error handling
 * @param hasErrorDefault = false
 * @returns hasError, errorText, validateTime
 */
export function useValidateTime(hasErrorDefault = false): UseValidateTime {
  const [hasError, setHasError] = useState(hasErrorDefault);
  const [errorText, setErrorText] = useState(" ");

  const setError = useCallback((value: boolean) => {
    setHasError(value);
  }, []);

  const validateTime = useCallback((value: string, min?: string) => {
    // Check if empty string
    if (!value || value.length <= 0) {
      setHasError(true);
      setErrorText("Please enter a time.");
    } // Check if value is below minimum value
    else if (min && value < min) {
      setHasError(true);
      setErrorText("End time must come after start time.");
    } else {
      setHasError(false);
      setErrorText(" ");
    }
  }, []);

  return { hasError, errorText, validateTime, setError };
}
