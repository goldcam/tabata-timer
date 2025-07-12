<script lang="ts">
    import { STATUS_TEXT } from '$lib/constants/constants.svelte';
    let { currentPhase } = $props();
    const statusText = $derived.by(() => {
        switch (currentPhase) {
            default:
            case 'pre': return STATUS_TEXT.PRE;
            case 'work': return STATUS_TEXT.WORK;
            case 'rest': return STATUS_TEXT.REST;
            case 'paused': return STATUS_TEXT.PAUSE;
            case 'done': return STATUS_TEXT.DONE;            
        }
    });
</script>


<div class="status " >             
    <h1 class="text-5xl">{statusText}</h1>
</div>