import type { TimeObjec } from "$lib/state/state.svelte";

export const claculateTimeRemaining = (timeReminSec: number): TimeObjec => {
    let sec = timeReminSec % 60;
    let min = Math.floor(timeReminSec / 60);
    return { sec, min }
};

export const lessThanTen = (num: number): boolean => num < 10;

export const createFormatTime = (lessThanTen: (n: number) => boolean) => (
    num:number
): string => lessThanTen(num) ? `0${num}` : `${num}`;

export const formatTime = createFormatTime(lessThanTen);

//gemini generated
export const calculateTotalTabataDuration = (rounds: number, workSecs: number, restSecs: number, prepSecs: number): number => {
    return prepSecs + (rounds * workSecs) + (rounds * restSecs);
};