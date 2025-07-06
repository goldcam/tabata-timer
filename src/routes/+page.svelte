<script lang="ts">

    interface TimerObj {
        sec: number;
        min: number;
        hour: number;
    }

    const timerObj: TimerObj = {
        sec:0, 
        min:0,
        hour:0
    };


    let count: number = 0,
        isRunning: boolean = false,
        timer: number, //for interval
        cycles: number = 0,
        preCountDown: number = 0,
        totalTime: number;
    

    const tabataTimer = ():void => {
        isRunning = !isRunning;
        if(isRunning) {
            timer = setInterval(() => {
            timerObj.sec++;
            if (timerObj.sec === 60) {
                timerObj.sec = 0;
                timerObj.min++;
                if (timerObj.min === 60) {
                    timerObj.min = 0;
                    timerObj.hour++;
                }
            }
        }, 1000);
        } else {
            clearInterval(timer);
        }

    }
    const resetTabata = ():void => {
        isRunning = false;
        timerObj.sec = 0;
        timerObj.min = 0;
        timerObj.hour = 0;

    }

</script>


<div class="main">
    <div class="clockWrap">
        {count}
        <div id="display">{timerObj.hour} {timerObj.min} : {#if timerObj.sec < 10} 0 {/if} {timerObj.sec}</div>
         <button id="Btn" on:click={tabataTimer}>
            {#if isRunning}
                Pause
            {:else}
               Start
            {/if}
        </button>
        <button id="resetBtn" on:click={resetTabata}>Reset</button>
    </div>
</div>

