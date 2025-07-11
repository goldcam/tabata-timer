<script lang="ts">
    import state from '../../state/state.svelte';
    import { STATUS_TEXT } from '../../constants/constants.svelte';




    // export let currentPhase: 'pre' | 'work' | 'rest' | 'paused' | 'done';

    // const statusText = $derived(() => {
    //     switch (currentPhase) {
    //         case 'pre': return STATUS_TEXT.PRE;
    //         case 'work': return STATUS_TEXT.WORK;
    //         case 'rest': return STATUS_TEXT.REST;
    //         case 'paused': return STATUS_TEXT.PAUSE;
    //         case 'done': return STATUS_TEXT.DONE;
    //         default: return '';
    //     }
    // });
</script>


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