import {useEffect, useRef} from 'react';

export default function useClickOutsideRef(callback: () => void) {
    const ref = useRef<HTMLElement | null>(null);
    const handleClick = (e: MouseEvent) => {
        if(ref.current && !ref.current.contains(e.target as HTMLElement)) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    });

    return ref;
}