<script lang="ts">
    import state from '$lib/state/state.svelte';
    import { formatTime } from '$lib/utils/utilFunctions.svelte';

    let {currentRound, timeRemaining, totalElapsedTime} = $props();


    const formattedTotalTime = $derived.by(() => `${formatTime(totalElapsedTime.min)}:${formatTime(totalElapsedTime.sec)}`);


    const formattedTimeRemaining = $derived.by(() => `${formatTime(timeRemaining.min)}:${formatTime(timeRemaining.sec)}`);




</script>

<div class="flex justify-around">
    <div class="text-lg flex flex-col basis-0">
        <span>Total</span>
        <span>{formattedTotalTime}</span>               
    </div>
    <div class="text-lg flex flex-col basis-0">
        <span>Round</span>
        <span>{currentRound}/{state.totalRounds}</span>
    </div>
        <div class="text-lg flex flex-col basis-0">
        <span>Remaining</span>
        <span>{formattedTimeRemaining}</span>             
    </div>
</div>




<!-- 

<script lang="ts">
    import { formatTime, calculateTimeRemaining } from '$lib/utils'; // Adjust path
    import { TOTAL_ROUNDS } from '$lib/stores'; // Adjust path

    export let totalElapsedTime: { min: number; sec: number };
    export let currentRound: number;
    export let totalSecondsRemaining: number; // Prop for the raw seconds remaining

    // Derived for formatted display
    const formattedTotalTime = $derived(() => `${formatTime(totalElapsedTime.min)}:${formatTime(totalElapsedTime.sec)}`);
    const formattedTimeRemaining = $derived(() => {
        const { min, sec } = calculateTimeRemaining(totalSecondsRemaining);
        return `${formatTime(min)}:${formatTime(sec)}`;
    });
</script>

<div class="flex justify-around">
    <div class="text-lg flex flex-col basis-0">
        <span>Total</span>
        <span>{formattedTotalTime}</span>
    </div>
    <div class="text-lg flex flex-col basis-0">
        <span>Round</span>
        <span>{currentRound}/{TOTAL_ROUNDS}</span>
    </div>
    <div class="text-lg flex flex-col basis-0">
        <span>Remaining</span>
        <span>{formattedTimeRemaining}</span>
    </div>
</div> -->
