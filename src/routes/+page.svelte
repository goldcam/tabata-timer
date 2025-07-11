<script lang="ts">
//  CSS HEX
// --icterine: #ffff82ff;
// --beige: #f5f7dcff;
// --celadon: #b5d99cff;
// --dark-purple: #0f0326ff;
// --indian-red: #e65f5cff;

import state from '$lib/state/state.svelte'

import {claculateTimeRemaining} from '$lib/utils/utilFunctions.svelte';


interface TimeObjec {
    sec: number;
    min: number;
}

const BACKGROUND_COLORS = { 
    GET_READY: '#ffff82ff',
    WORK: "#b5d99cff",
    REST: '#e65f5cff',
    PAUSE: '#ffff82ff',

} as const;
const STATUS_TEXT = {
    PRE: 'Get Ready',
    WORK: 'Work',
    REST: 'Rest',
    DONE: 'Done',
    PAUSE: 'Paused'
 } as const;

let timer: number;
    

const switchPhase = (): void => {
  state.isWork = !state.isWork;
  state.timeLeft = state.isWork ? 20 : 10;
  state.backgroundcolor = !state.isWork ? BACKGROUND_COLORS.REST : BACKGROUND_COLORS.WORK;
  if (state.isWork) state.round++;
  if (state.round > state.totalRounds) {
    state.timeLeft = 0
    state.round = state.totalRounds;
    clearInterval(timer);
    state.isRunning = false;
    state.isWork = false; 
    state.backgroundcolor = BACKGROUND_COLORS.GET_READY;
    state.isDone = true;
  }
},
startTabata = ():void =>  {
    console.log(state.isRunning)
  if (state.isRunning) return;
  state.isRunning = true;
  state.backgroundcolor = !state.isWork ? BACKGROUND_COLORS.REST : BACKGROUND_COLORS.WORK;
  if(state.round === 0) state.round++;
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
pauseTabata = ():void =>  {
  clearInterval(timer);
  state.isRunning = false;  
  state.backgroundcolor = BACKGROUND_COLORS.PAUSE;
},
resetTabata = ():void => {
  pauseTabata();
  state.timeLeft = 20;
  state.timeRemaining = claculateTimeRemaining(30 * state.totalRounds);
  state.round = 0; 
  state.isWork = true; 
  state.backgroundcolor = BACKGROUND_COLORS.GET_READY;
  state.isDone = false;
  state.totalTime = {
        min:0,
        sec:0
    };
},
incrementTime = (timeObj: TimeObjec): TimeObjec => {
    timeObj.sec++;
    if(timeObj.sec === 59) {
        timeObj.sec = 0;
        timeObj.min ++; 
    }

    return timeObj
},
decrementTime = (timeObj: TimeObjec): TimeObjec => {
    if(timeObj.sec === 0 && timeObj.min > 0) {
        timeObj.sec = 59;
        timeObj.min --; 
    } else {
        timeObj.sec--;
    }
    return timeObj
},
lesThanTen =  (num:number):boolean => num < 10; 
</script>

<svelte:head>
	<title>Tabata Timer</title>
</svelte:head>

<div class="main flex justify-center h-screen " style="--theme-backgroundcolor: {state.backgroundcolor}">
    <div class="wrap m-auto text-center w-sm">
        <div class="status text-5xl" >             
            {#if !state.isRunning && state.round === 0} 
                {STATUS_TEXT.PRE} 
            {:else if state.isWork && state.isRunning}
                {STATUS_TEXT.WORK}
            {:else if !state.isWork && state.isRunning}
                {STATUS_TEXT.REST}
            {:else if !state.isRunning && !state.isDone} 
                {STATUS_TEXT.PAUSE}
            {:else if state.isDone}
                {STATUS_TEXT.DONE}             
            {/if} 
        </div>
        <div class="timer text-[9rem] flex justify-center" >
                <div>00:</div>
                <div class="w-[180px]">{#if lesThanTen(state.timeLeft)}0{/if}{state.timeLeft}</div>
        </div>
        <div class="flex justify-around">
            <div class="text-lg flex flex-col basis-0">
                <span>Total</span>
                <span>{#if lesThanTen(state.totalTime.min)}0{/if}{state.totalTime.min}:{#if lesThanTen(state.totalTime.sec)}0{/if}{state.totalTime.sec}</span>                
            </div>
            <div class="text-lg flex flex-col basis-0">
                <span>Round</span>
                <span>{state.round}/{state.totalRounds}</span>
            </div>
             <div class="text-lg flex flex-col basis-0">
                <span>Remaining</span>
                <span>{#if lesThanTen(state.timeRemaining.min)}0{/if}{state.timeRemaining.min}:{#if lesThanTen(state.timeRemaining.sec)}0{/if}{state.timeRemaining.sec}</span>                
            </div>
        </div>
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
    </div>
</div>

<style lang="postcss">
 .main {
  	background: var(--theme-backgroundcolor);
    transition: background .3s ease-in;
    color: #0f0326ff;
    text-transform: uppercase;
 }
 
    
</style>