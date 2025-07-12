<script lang='ts' >
    import { formatTime } from '$lib/utils/utilFunctions.svelte';
    let {timeLeftInPhase} = $props(); 
</script>

 <div class="timer text-[9rem] flex justify-center" >
    <div>00:</div>
    <div class="w-[180px]">{formatTime(timeLeftInPhase)}</div>
</div>