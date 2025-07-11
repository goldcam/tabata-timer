<script lang="ts">
//  CSS HEX
// --icterine: #ffff82ff;
// --beige: #f5f7dcff;
// --celadon: #b5d99cff;
// --dark-purple: #0f0326ff;
// --indian-red: #e65f5cff;

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

const claculateTimeRemaining = (timeReminSec: number): TimeObjec => {
    let sec = timeReminSec % 60; 
    let min =  Math.floor(timeReminSec / 60);
    return {sec, min}
};
let backgroundcolor: string = BACKGROUND_COLORS.GET_READY,
    isRunning = false,        
    timeLeft = 20,    
    round = 0,
    isWork = true,
    totalRounds = 8,
    timeRemaining = claculateTimeRemaining(30 * totalRounds),
    isDone = false,
    timer: number,
    totalTime: TimeObjec = {
        min:0,
        sec:0
    };

const switchPhase = (): void => {
  isWork = !isWork;
  timeLeft = isWork ? 20 : 10;
  backgroundcolor = !isWork ? BACKGROUND_COLORS.REST : BACKGROUND_COLORS.WORK;
  if (isWork) round++;
  if (round > totalRounds) {
    timeLeft = 0
    round = totalRounds;
    clearInterval(timer);
    isRunning = false;
    isWork = false; 
    backgroundcolor = BACKGROUND_COLORS.GET_READY;
    isDone = true;
  }
},
startTabata = ():void =>  {
  if (isRunning) return;
  isRunning = true;
  backgroundcolor = !isWork ? BACKGROUND_COLORS.REST : BACKGROUND_COLORS.WORK;
  if(round === 0) round++;
  if (timeLeft === 0) switchPhase(); // if paused at 0

  timer = setInterval(() => {
    totalTime = incrementTime(totalTime);
    timeRemaining = decrementTime(timeRemaining)
    if (timeLeft > 1) {
      timeLeft--;
    } else {
      switchPhase();
    }
  }, 1000);
},
pauseTabata = ():void =>  {
  clearInterval(timer);
  isRunning = false;  
  backgroundcolor = BACKGROUND_COLORS.PAUSE;
},
resetTabata = ():void => {
  pauseTabata();
  timeLeft = 20;
  timeRemaining = claculateTimeRemaining(30 * totalRounds);
  round = 0; 
  isWork = true; 
  backgroundcolor = BACKGROUND_COLORS.GET_READY;
  isDone = false;
  totalTime = {
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

<div class="main flex justify-center h-screen" style="--theme-backgroundcolor: {backgroundcolor}">
    <div class="wrap m-auto text-center w-sm">
        <div class="status text-5xl" >             
            {#if !isRunning && round === 0} 
                {STATUS_TEXT.PRE} 
            {:else if isWork && isRunning}
                {STATUS_TEXT.WORK}
            {:else if !isWork && isRunning}
                {STATUS_TEXT.REST}
            {:else if !isRunning && !isDone} 
                {STATUS_TEXT.PAUSE}
            {:else if isDone}
                {STATUS_TEXT.DONE}             
            {/if} 
        </div>
        <div class="timer text-[9rem] flex justify-center" >
                <div>00:</div>
                <div class="w-[180px]">{#if lesThanTen(timeLeft)}0{/if}{timeLeft}</div>
        </div>
        <div class="flex justify-around">
            <div class="text-lg flex flex-col basis-0">
                <span>Total</span>
                <span>{#if lesThanTen(totalTime.min)}0{/if}{totalTime.min}:{#if lesThanTen(totalTime.sec)}0{/if}{totalTime.sec}</span>                
            </div>
            <div class="text-lg flex flex-col basis-0">
                <span>Round</span>
                <span>{round}/{totalRounds}</span>
            </div>
             <div class="text-lg flex flex-col basis-0">
                <span>Remaining</span>
                <span>{#if lesThanTen(timeRemaining.min)}0{/if}{timeRemaining.min}:{#if lesThanTen(timeRemaining.sec)}0{/if}{timeRemaining.sec}</span>                
            </div>
        </div>
        <div class="text-3xl flex justify-between">        
            {#if !isDone}
                {#if isRunning}
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