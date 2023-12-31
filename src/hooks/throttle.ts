import { useState, useCallback } from 'react';

export function useThrottle(callback: (...args: any[]) => void, limit: number) {
    const [lastCall, setLastCall] = useState<number>(0);

    return useCallback(
        (...args: any[]) => {
            const now = Date.now();
            if (now - lastCall >= limit) {
                callback(...args);
                setLastCall(now);
            }
        },
        [callback, limit, lastCall]
    );
}