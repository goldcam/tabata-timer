import { claculateTimeRemaining } from '$lib/utils/utilFunctions.svelte';

import { BACKGROUND_COLORS, STATUS_TEXT } from '$lib/constants/constants.svelte';

export interface TimeObjec {
    sec: number;
    min: number;
}


export interface ApplicationState {
    backgroundcolor: string;
    isRunning:boolean;
    timeLeft:number;
    round:number;
    isWork: boolean;
    totalRounds:number;
    timeRemaining: TimeObjec;
    totalTime: TimeObjec;
    isDone: boolean;
}

export const applicationState = $state<ApplicationState>({
    backgroundcolor: BACKGROUND_COLORS.GET_READY,
    isRunning: false,
    timeLeft: 20,
    round: 0,
    isWork: true,
    totalRounds:8,
    timeRemaining: {
        min:0,
        sec: 0
    },    
    totalTime: {
        min:0,
        sec: 0
    },    
    isDone:false,
});


export default applicationState

// export let timeRemaining = $state<TimeObjec>(claculateTimeRemaining(30 * totalRounds));

// export let totalTime = $state < TimeObjec>({
//             min: 0,
//             sec: 0
//            });

