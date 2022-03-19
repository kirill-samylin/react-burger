import {useEffect, useState } from "react"

type TWindowSize = {
  width: number;
  height: number;
}

type TUseWindowSize = () => TWindowSize

export const useWindowSize: TUseWindowSize = () => {
  const [windowSize, setWindowSize] = useState<TWindowSize>({
    width: 0,
    height: 0,
  })

  const handleSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }
  
  useEffect(() => {
    window.addEventListener('resize', handleSize);
    return () => window.removeEventListener('resize', handleSize);
  }, [handleSize]);

  return windowSize
};
