<script lang="ts">
import state from '$lib/state/state.svelte';
import { claculateTimeRemaining } from '$lib/utils/utilFunctions.svelte';

// Components
import Timer from '$lib/components/timer/timer.svelte';
import StatusDisplay from '$lib/components/statusDisplay/statusDisplay.svelte';
import TimeMetrics from '$lib/components/timeMetrics/timeMetrics.svelte';
import Controls from '$lib/components/controls/controls.svelte';
//initalize timeRemaininng 
state.timeRemaining = claculateTimeRemaining(30 * state.totalRounds)
</script>

<svelte:head>
	<title>Tabata Timer</title>
</svelte:head>

<div class="main flex justify-center h-screen " style="--theme-backgroundcolor: {state.backgroundcolor}">
    <div class="wrap m-auto text-center w-sm">
        <StatusDisplay currentPhase={state.currentPhase} />
        
        <Timer timeLeftInPhase={state.timeLeft} />

        <TimeMetrics currentRound={state.round} 
                     totalElapsedTime={state.totalTime} 
                     timeRemaining={state.timeRemaining} />
        
        <Controls />
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