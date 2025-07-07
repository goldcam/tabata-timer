<script lang="ts">

    interface ComponentProps {
    }

    let {
        id, 
        name, 
        bindValue = $bindable(), 
        plceholderText,
        options,
        onchange
    } = $props();

</script>

 <select {id} {name} bind:value={bindValue} {onchange}>                
    {#if plceholderText}
        <option value="" disabled selected>{plceholderText}</option>
    {/if}
    {#each options as option}
        <option value={option}>{option}</option>
    {/each}
</select>

