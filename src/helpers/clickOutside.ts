import {useEffect, useRef} from 'react';

// Такая странная архитектура позволяет использовать лишь 1 обработчик для клика по документу
const clickActions: Map<React.RefObject<any | null>, (e: MouseEvent) => void> = new Map();
document.addEventListener("click", (e: MouseEvent) => {
    Array.from(clickActions.entries()).forEach(([ref, handler]) => {
        if(ref.current && !ref.current.contains(e.target as HTMLElement)) {
            handler(e);
        }
    });
});

export default function useClickOutsideRef<T = HTMLElement>(callback: () => void): React.RefObject<T> {
    const ref = useRef<T|null>(null);

    useEffect(() => {
        clickActions.set(ref, callback);

        return () => {
            clickActions.delete(ref);
        };
    });

    return ref;
}