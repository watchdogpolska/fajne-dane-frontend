import { useEffect, useRef } from "react";


export const useHasChanged = (val) => {
    const prevVal = usePrevious(val);
    return [prevVal !== val, prevVal];
}

const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}
