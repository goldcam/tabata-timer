<script lang="ts">
//  CSS HEX
// --icterine: #ffff82ff;
// --beige: #f5f7dcff;
// --celadon: #b5d99cff;
// --dark-purple: #0f0326ff;
// --indian-red: #e65f5cff;

import state from '$lib/state/state.svelte';
import { claculateTimeRemaining } from '$lib/utils/utilFunctions.svelte';
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
        <StatusDisplay />
        <Timer />
        <TimeMetrics />
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