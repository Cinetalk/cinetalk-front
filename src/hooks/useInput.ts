import {
  ChangeEventHandler,
  Dispatch,
  EventHandler,
  SetStateAction,
  useCallback,
  useState,
} from "react";

const useInput = <T = any>(
  initialData: T,
): [T, (e: any) => void, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState(initialData);
  const handler = useCallback((e: any) => {
    setValue(e.target.value);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
