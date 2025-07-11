<script lang='ts' >
    import {lessThanTen} from '../../utils/utilFunctions.svelte';
    import state from '../../state/state.svelte';
</script>

 <div class="timer text-[9rem] flex justify-center" >
    <div>00:</div>
    <div class="w-[180px]">{#if lessThanTen(state.timeLeft)}0{/if}{state.timeLeft}</div>
</div>