import { BACKGROUND_COLORS } from '$lib/constants/constants.svelte';

export interface TimeObjec {
    sec: number;
    min: number;
}

export interface ApplicationState {
    backgroundcolor: string;
    isRunning:boolean;
    timeLeft:number;
    prepTime:number;
    round:number;
    isWork: boolean;
    totalRounds:number;
    timeRemaining: TimeObjec;
    totalTime: TimeObjec;
    isDone: boolean;
    currentPhase: 'pre' | 'work' | 'rest' | 'paused' | 'done';
}

export const applicationState = $state<ApplicationState>({
    backgroundcolor: BACKGROUND_COLORS.GET_READY,
    isRunning: false,
    timeLeft: 20,
    prepTime: 5,
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
    currentPhase: 'pre'
});


export default applicationState