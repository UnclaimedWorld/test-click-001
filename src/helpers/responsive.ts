import { useEffect, useState } from "react";

export const MOBILE_BOUNDARY = 1280;
export const useResponsive = () => {
  const [isTable, setIsTable] = useState(window.innerWidth > MOBILE_BOUNDARY);

  useEffect(() => {
    const resize = () => {
      if (!isTable && window.innerWidth > MOBILE_BOUNDARY) {
        setIsTable(true);
      } else if (isTable && window.innerWidth <= MOBILE_BOUNDARY) {
        setIsTable(false);
      }
    };
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  });

  return isTable;
};
