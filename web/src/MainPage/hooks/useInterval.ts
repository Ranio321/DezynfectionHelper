import { useEffect, useRef, useState } from "react";

export function useInterval(
    callback: () => any,
    delay: number,
    immediate?: boolean
  ) {
    const callbackRef = useRef(callback);
    callbackRef.current = callback;
  
    const [handle, setHandle] = useState(-1);
    const [isActive, setIsActive] = useState(false);
    const [timeDelay] = useState(delay);
    
    // useEffect(() => {
    //   const tick = () => callbackRef.current && callbackRef.current();
  
    //   if (delay) {
    //     if (immediate) tick();
  
    //     setHandle(window.setInterval(tick, delay));
    //      return () => window.clearInterval(handle);
    //   }
    // }, [delay, immediate, refresh]);

    function begin() {
        const tick = () => callbackRef.current && callbackRef.current();
        console.log(timeDelay)
  
        if (delay) {
          if (immediate) tick();
    
          setHandle(window.setInterval(tick, timeDelay));
          setIsActive(true);
        }
    }

    function cancel()
    {
        setHandle(-1);
        window.clearInterval(handle);
        setIsActive(false);
    }

    function resume(){
        if(handle === -1){
        begin();
        }
    }


    return [cancel,resume, isActive] as const;
  }