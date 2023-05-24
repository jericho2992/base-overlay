<script>
// @ts-nocheck
import { team0 } from "./lib/processor";
import { team1 } from "./lib/processor";
import BoostCard from "./BoostCard.svelte";

export let teamNumber = 0;
</script>
<div class="main">
    {#if $team0?.length && $team1?.length}
        {#if teamNumber === 0}
            <div class="team-0">
                {#each $team0 as p}
                    <BoostCard bind:name={p.name} bind:boostBasic={p.boost} team={0} bind:id={p.id} bind:isDead={p.isDead}></BoostCard>
                {/each}
            </div>
        {:else}
            <div class="team-1">
                {#each $team1 as p}
                    <BoostCard bind:name={p.name} bind:boostBasic={p.boost} team={1} bind:id={p.id} bind:isDead={p.isDead}></BoostCard>
                {/each}
            </div>
        {/if}
    {/if}
</div>
<style>

</style>