<script lang="ts">
    import state from '$lib/state/state.svelte';
    import type { TimeObjec } from '$lib/state/state.svelte';
    import { BACKGROUND_COLORS } from '$lib/constants/constants.svelte';
    import { claculateTimeRemaining } from '$lib/utils/utilFunctions.svelte';

let timer: NodeJS.Timeout;


export const workUpdateState = ():void => {
    state.backgroundcolor = state.isWork ? BACKGROUND_COLORS.WORK : BACKGROUND_COLORS.REST;
    state.currentPhase = state.isWork ? 'work' : 'rest'; 
},
incrementTime = (timeObj: TimeObjec): TimeObjec => {
    timeObj.sec++;
    if (timeObj.sec === 59) {
        timeObj.sec = 0;
        timeObj.min++;
    }

    return timeObj
},
decrementTime = (timeObj: TimeObjec): TimeObjec => {
    if (timeObj.sec === 0 && timeObj.min > 0) {
        timeObj.sec = 59;
        timeObj.min--;
    } else {
        timeObj.sec--;
    }
    return timeObj
},
createSwitchPhase = (
    workUpdateState: () => void
) => ():void => {
        state.isWork = !state.isWork;
        state.timeLeft = state.isWork ? 20 : 10;
        workUpdateState();
        if (state.isWork) state.round++;
        if (state.round > state.totalRounds) {
            state.timeLeft = 0
            state.round = state.totalRounds;
            clearInterval(timer);
            state.isRunning = false;
            state.isWork = false;
            state.backgroundcolor = BACKGROUND_COLORS.GET_READY;
            state.isDone = true;
            state.currentPhase = 'done';
        }
},
switchPhase = createSwitchPhase(workUpdateState),
createStartTabata = (
    workUpdateState: () => void,
    incrementTime: (t: TimeObjec) => TimeObjec,
    decrementTime: (t: TimeObjec) => TimeObjec
) => ():void => {
        if (state.isRunning) return;
        state.isRunning = true;
        workUpdateState();
        if (state.round === 0) state.round++;
        if (state.timeLeft === 0) switchPhase(); // if paused at 0
        timer = setInterval(() => {
            state.totalTime = incrementTime(state.totalTime);
            state.timeRemaining = decrementTime(state.timeRemaining)
            if (state.timeLeft > 1) {
                state.timeLeft--;
            } else {
                switchPhase();
            }
        }, 1000);
},
startTabata = createStartTabata(workUpdateState, incrementTime, decrementTime),
pauseTabata = (): void => {
        clearInterval(timer);
        state.isRunning = false;
        state.backgroundcolor = BACKGROUND_COLORS.PAUSE;
        state.currentPhase = 'paused';
    },
createResetTabata = (
    pauseTabata:() => void, 
    claculateTimeRemaining:(n:number) => TimeObjec    
) => ():void => {
        pauseTabata();
        state.timeLeft = 20;
        state.timeRemaining = claculateTimeRemaining(30 * state.totalRounds);
        state.round = 0;
        state.isWork = true;
        state.backgroundcolor = BACKGROUND_COLORS.GET_READY;
        state.isDone = false;
        state.totalTime = {
            min: 0,
            sec: 0
        };
        state.currentPhase = 'pre';
},
resetTabata = createResetTabata(pauseTabata, claculateTimeRemaining); 

</script>

<div class="text-3xl flex justify-between">        
    {#if !state.isDone}
        {#if state.isRunning}
            <button class="btn" onclick={pauseTabata}>
                Pause
            </button>                
        {:else}
            <button class="btn" onclick={startTabata}>
                Start
            </button>
        {/if}
    {:else}
        <div class="font-bold py-4 px-6 uppercase">End</div>
    {/if}            
    <button class="btn" onclick={resetTabata}>Reset</button>
</div>