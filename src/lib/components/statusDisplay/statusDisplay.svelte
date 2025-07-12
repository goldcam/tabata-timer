<script lang="ts">
    import state from '../../state/state.svelte';
    import { STATUS_TEXT } from '../../constants/constants.svelte';

    let { currentPhase } = $props();

    // export let currentPhase: 'pre' | 'work' | 'rest' | 'paused' | 'done';

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
    // const statusText = () => {
    //     switch (currentPhase) {
    //         default:
    //         case 'pre': return STATUS_TEXT.PRE;
    //         case 'work': return STATUS_TEXT.WORK;
    //         case 'rest': return STATUS_TEXT.REST;
    //         case 'paused': return STATUS_TEXT.PAUSE;
    //         case 'done': return STATUS_TEXT.DONE;            
    //     }
    // };
</script>


<div class="status text-5xl" >             
    {statusText}
</div>