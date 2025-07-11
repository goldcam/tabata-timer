<script lang="ts">
    import state from '../../state/state.svelte';
    import { lessThanTen } from '$lib/utils/utilFunctions.svelte';
</script>

<div class="flex justify-around">
    <div class="text-lg flex flex-col basis-0">
        <span>Total</span>
        <span>{#if lessThanTen(state.totalTime.min)}0{/if}{state.totalTime.min}:{#if lessThanTen(state.totalTime.sec)}0{/if}{state.totalTime.sec}</span>                
    </div>
    <div class="text-lg flex flex-col basis-0">
        <span>Round</span>
        <span>{state.round}/{state.totalRounds}</span>
    </div>
        <div class="text-lg flex flex-col basis-0">
        <span>Remaining</span>
        <span>{#if lessThanTen(state.timeRemaining.min)}0{/if}{state.timeRemaining.min}:{#if lessThanTen(state.timeRemaining.sec)}0{/if}{state.timeRemaining.sec}</span>                
    </div>
</div>