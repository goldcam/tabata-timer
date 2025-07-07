<script lang="ts">
    import Select from "$lib/components/Select.svelte";

   

    interface TabataData {
        isRunning:boolean;
        displayExcersie:boolean;
        excersieMinuteValue: string;
        excersieSecondsValue: string;
        restMinuteValue: string;
        restSecondsValue: string;
        cycleOptionsValue: string;
        initalCountdownValue: string;
        displayMin: number;
        displaySec: number;
    }

    

    const excersieMinPlaceholder:string = 'Excersie Minutes Interval', 
          excersieSecPlaceholder:string = 'Excersie Seconds Interval',
          restMinPlaceholder:string = 'Rest Minutes Interval', 
          restSecPlaceholder:string = 'Rest Seconds Interval',
          cycleOptionsPlaceholder: string = 'Number of Cycles',
          initalCountdownPlaceholder: string = 'Inital countdown';
          

    

    const excersieSecondsOptions: number[] = [], 
          excersieMinuteOptions: number[] = [], 
          restSecondsOptions: number[] = [], 
          restMinuteOptions: number[] = [],
          initalCountdownOptions : number[] = [],
          cycleOptions: number[] = [];   

    for(let i = 0; i < 60; i++){
        excersieSecondsOptions.push(i);
        excersieMinuteOptions.push(i);

        restSecondsOptions.push(i);
        restMinuteOptions.push(i);

        initalCountdownOptions.push(i);
    }
    for(let i = 1; i <= 100; i++ ) {
        cycleOptions.push(i);
    }

 


    export const tabataData: TabataData = $state({
        isRunning: false,
        displayExcersie: true,
        excersieMinuteValue: '',
        excersieSecondsValue: '',
        restMinuteValue: '',
        restSecondsValue: '',
        cycleOptionsValue: '',
        initalCountdownValue: '',
        displayMin: 0, 
        displaySec: 0
    })




    let  timer: number, //for interval
        numberOfCycles: number = 0;
   

    const tabataTimer = ():void => {
        let { isRunning, 
              displayExcersie,
              excersieMinuteValue,
              excersieSecondsValue,
              restMinuteValue,
              restSecondsValue,
              cycleOptionsValue,
              displayMin,
              displaySec
            //   initalCountdownValue  
            } = tabataData;

        let excersieMinute = Number(excersieMinuteValue), 
            excersieSeconds = Number(excersieSecondsValue),
            restMinutes = Number(restMinuteValue),
            restSeconds = Number(restMinuteValue);
        numberOfCycles = Number(cycleOptionsValue);

        
        isRunning = !isRunning;
        console.log('tabataTimer...', {isRunning})
        if(isRunning) {
            timer = setInterval(() => {
                console.log('setInterval....', {numberOfCycles, displayExcersie, displayMin, displaySec})
                if(numberOfCycles > 0) {                   
                    if(displayExcersie) {
                        if(displayMin === 0 && displaySec === 0 ){
                            displayExcersie = !displayExcersie;   
                            displaySec = Number(tabataData.restSecondsValue);
                            displayMin = Number(tabataData.restMinuteValue);
                            tabataData.displayMin = displayMin;
                            tabataData.displaySec = displaySec;                        
                        } else {
                            displaySec--;
                            tabataData.displaySec = displaySec;
                            if(displaySec === 0 && displayMin > 0) {
                                displayMin--;
                                tabataData.displayMin = displayMin;
                                displaySec = 59;
                                tabataData.displaySec = displaySec;
                            }
                        }

                    }else {                        
                         if(displayMin === 0 && displaySec === 0 ){
                            displayExcersie = !displayExcersie;
                            numberOfCycles--;
                            tabataData.cycleOptionsValue = numberOfCycles.toString(); 
                            displaySec = Number(tabataData.excersieSecondsValue);
                            displayMin = Number(tabataData.excersieMinuteValue);   
                            tabataData.displayMin = displayMin;
                            tabataData.displaySec = displaySec;                          
                        } else {
                            displaySec--;
                            tabataData.displaySec = displaySec;
                            if(displaySec === 0 && displayMin > 0) {
                                displayMin--;
                                tabataData.displayMin = displayMin;
                                displaySec = 59;
                                tabataData.displaySec = displaySec;
                            }
                        }
                    }                        
                } else {
                    isRunning = false;
                    clearInterval(timer);
                }                
            }, 1000);
        } else {
            clearInterval(timer);
        }

    }
    const resetTabata = ():void => {
        // isRunning = false;
        // timerObj.sec = 0;
        // timerObj.min = 0;
        // timerObj.hour = 0;
    }
    
    const excersieMinChange = () => {
        tabataData.displayMin = Number(tabataData.excersieMinuteValue);        
    }
    const excersieSecChange = () => {
        tabataData.displaySec = Number(tabataData.excersieSecondsValue);        
    }
    

</script>

<svelte:head>
	<title>Tabata Timer</title>
</svelte:head>

<div class="main">
    <div class="clockWrap">
        <form action="" class="tabataForm">
            <h2>Excersie Interval</h2>   
            <Select name="excersieMin" 
                    id="excersieMin"
                    bind:bindValue={tabataData.excersieMinuteValue}
                    plceholderText={excersieMinPlaceholder}
                    options={excersieMinuteOptions}
                    onchange={excersieMinChange} />  

            <Select name="excersieSec" 
                    id="excersieSec"
                    bind:bindValue={tabataData.excersieSecondsValue}
                    plceholderText={excersieSecPlaceholder}
                    options={excersieSecondsOptions}
                    onchange={excersieSecChange} /> 

            <h2>Rest Interval</h2>
            <Select name="restMin" 
                    id="restMin"
                    bind:bindValue={tabataData.restMinuteValue}
                    plceholderText={restMinPlaceholder}
                    options={restMinuteOptions} 
                    onchange={() => {}}/>   

            <Select name="restSec" 
                    id="restSec"
                    bind:bindValue={tabataData.restSecondsValue}
                    plceholderText={restSecPlaceholder}
                    options={restSecondsOptions}
                    onchange={() => {}} /> 
            
            <h2>{cycleOptionsPlaceholder}</h2>
            <Select name='cycleOptions' 
                    id='cycleOptions' 
                    plceholderText={cycleOptionsPlaceholder} 
                    options={cycleOptions} 
                    bind:bindValue={tabataData.cycleOptionsValue}
                    onchange={() => {}} />

            <!-- <h2>{initalCountdownPlaceholder}</h2>
            <Select name='initalCountdown' 
                    id='initalCountdown' 
                    plceholderText={initalCountdownPlaceholder} 
                    options={initalCountdownOptions} 
                    bind:bindValue={tabataData.initalCountdownValue} /> -->
            
            

            <div id="display">{#if tabataData.displayMin < 10}0{/if}{tabataData.displayMin} : {#if tabataData.displaySec < 10}0{/if}{tabataData.displaySec} Cycles Remaining: {tabataData.cycleOptionsValue}</div>
            <button id="Btn" onclick={tabataTimer}>
                {#if tabataData.isRunning}
                    Pause
                {:else}
                Start
                {/if}
            </button>
            <button id="resetBtn" onclick={resetTabata}>Reset</button>
        </form>        
    </div>
</div>

