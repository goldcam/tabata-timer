import type { TimeObjec } from "$lib/state/state.svelte";

export const claculateTimeRemaining = (timeReminSec: number): TimeObjec => {
    let sec = timeReminSec % 60;
    let min = Math.floor(timeReminSec / 60);
    return { sec, min }
};