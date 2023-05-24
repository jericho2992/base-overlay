<script>
    import { targetPlayer, board0, board1 } from "./lib/processor";
    import { tweened } from "svelte/motion";

    const bTween = tweened($targetPlayer.boost,
    {
        duration: 60,
    });
    $: bTween.set($targetPlayer.boost);
</script>

<div class="main">
    {#if $targetPlayer.team ===0 && $board0?.length === 2}    
        <div class="panel-wrap">    
            <div class="name-boost-cont" style="background: #{$board0[0]}">
                <h2>{$targetPlayer.name}</h2>
                <div class="empty-boost">
                    <div class="blue-boost-fill" style="background-color: white; min-width: {$bTween}%; border-radius: 0.5em; height: 0.4em; border-left: 1px solid black; border-right: 1px solid black;" >
                    </div>
                </div>
                <h3>{Math.floor($bTween)}</h3>
            </div>
            <div class="stats-cont">
                <table><tr>
                    <th>Goals</th><td>{$targetPlayer.goals}</td>
                    <th>Assists</th><td>{$targetPlayer.assists}</td> 
                    <th>Shots</th><td>{$targetPlayer.shots}</td>             
                    <th>Saves</th><td>{$targetPlayer.saves}</td>  
                    <th>Demos</th><td>{$targetPlayer.demos}</td>     
                </tr></table>
            </div>
        </div>
    {:else if $board1?.length === 2}
        <div class="panel-wrap">    
            <div class="name-boost-cont" style="background: #{$board1[0]};">
                <h2>{$targetPlayer.name}</h2>
                <div class="empty-boost">
                    <div class="blue-boost-fill" style="background-color: white; min-width: {$bTween}%; border-radius: 0.5em; height: 0.4em; border-left: 1px solid black; border-right: 1px solid black;" >
                    </div>
                </div>
                <h3>{Math.floor($bTween)}</h3>
            </div>
            <div class="stats-cont">
                <table><tr>
                    <th>Goals</th><td>{$targetPlayer.goals}</td>
                    <th>Assists</th><td>{$targetPlayer.assists}</td> 
                    <th>Shots</th><td>{$targetPlayer.shots}</td>             
                    <th>Saves</th><td>{$targetPlayer.saves}</td>  
                    <th>Demos</th><td>{$targetPlayer.demos}</td>     
                </tr></table>
            </div>
        </div>
    {/if}
</div>

<style>
    h2 {
        margin: 0;
        color: white;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: black;
        text-shadow: 2px 2px black;
    }
    h3 {
        margin: 0;
        color: white;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: black;
        text-shadow: 2px 2px black;
    }    
    th, td {
        padding-right: 0.25em;
        font-weight: 200;
        font-size: 1.2em;
    }
    th {
        font-weight: 400;
    }
    .panel-wrap {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        align-items: flex-start;
        margin: 2em;
        transform: skew(-3deg);
    }
    .name-boost-cont {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        min-width: 100%;
        padding: 0 1em;
    }
    .stats-cont {
        padding: 0.25em 1em;
        background: black;
        color: white;
        min-width: 100%;
    }
    .empty-boost {
        margin-left: 1em;
        margin-right: 1em;
        width: 10em;
        min-width: 10em;
        max-width: 10em;
        height: 0.5em;
        background-color: black;
        border-radius: 0.5em;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
    }
</style>