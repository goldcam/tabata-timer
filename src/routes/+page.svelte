<script lang="ts">

    /* CSS HEX */
// --engineering-orange: #ba2d0bff;
// --honeydew: #d5f2e3ff;
// --cambridge-blue: #73ba9bff;
// --british-racing-green: #003e1fff;
// --night: #01110aff;
// --oldgold: #E2C044ffs


//  CSS HEX
// --icterine: #ffff82ff;
// --beige: #f5f7dcff;
// --celadon: #b5d99cff;
// --dark-purple: #0f0326ff;
// --indian-red: #e65f5cff;

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
let backgroundcolor: string = BACKGROUND_COLORS.GET_READY,
    isRunning = false,        
    timeLeft = 20,
    round = 0,
    isWork = true,
    totalRounds = 1,
    isDone = false,
    timer: number;
const totalTime = {
    min:0,
    sec:0
}

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
    if (timeLeft > 0) {
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
  round = 0; 
  isWork = true; 
  backgroundcolor = BACKGROUND_COLORS.GET_READY;
  isDone = false;
},
calculateTotalTime = () => {
    totalTime.sec++;
    if(totalTime.sec = 59) {
        totalTime.sec = 0;
        totalTime.min ++; 
    }
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
        <div class="timer text-9xl" >00:{#if lesThanTen(timeLeft)}0{/if}{timeLeft}</div>
        <div class="flex justify-around">
            <div>
                Total Time:
                {#if lesThanTen(totalTime.min)}0{/if}{totalTime.min}:{#if lesThanTen(totalTime.sec)}0{/if}{totalTime.sec}
            </div>
            <div class="text-lg">Round: <span>{round}</span>/{totalRounds}</div>
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

/* CSS HEX */
 /* --engineering-orange: #ba2d0bff;
 --honeydew: #d5f2e3ff;
 --cambridge-blue: #73ba9bff;
 --british-racing-green: #003e1fff;
 --night: #01110aff;
 --oldgold: #E2C044ff; */
 .main {
  	background: var(--theme-backgroundcolor);
    transition: background .3s ease-in;
    color: #0f0326ff;
    text-transform: uppercase;
 }
 
    
</style>