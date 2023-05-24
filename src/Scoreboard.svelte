<script>
    import { timer } from "./lib/processor";
    import { board0 } from "./lib/processor";
    import { board1 } from "./lib/processor";
    import { fly } from "svelte/transition";
    import { gameEnd } from "./lib/processor";
    import { scores } from "./lib/processor";
    import { isOT } from "./lib/processor";
    import { matchCreated } from "./lib/processor";

    export let logo1;
    export let logo2;
    export let seriesLength;

    let counter = 0;
    let lastReportedMatch="11";
    let lastReportedWinner;
    let lastCreatedMatch = 0;
    let team0Games = new Array(Math.ceil(seriesLength/2));
    team0Games.forEach(g => {
        g=false;
    });
    let team1Games = new Array(Math.ceil(seriesLength/2));
    team0Games.forEach(g => {
        g=false;
    });
    
$: if($gameEnd?.match != 0) {
    if(seriesLength>0) {
        if(lastReportedMatch!=$gameEnd.match) {
            lastReportedWinner = $gameEnd.winner;
            if($gameEnd.winner === 0) {
                for(let i=0; i<team0Games.length; i++) {
                    if(!team0Games[i]) {
                        team0Games[i]=true;
                        break;
                    }
                }
            } else {
                for(let i=0; i<team1Games.length; i++) {
                    if(!team1Games[i]) {
                        team1Games[i]=true;
                        break;
                    }
                }
            }
            lastReportedMatch = $gameEnd.match;
        }
    }   
}

$: if($matchCreated?.id) {
    if($matchCreated.id != lastCreatedMatch) {
        lastCreatedMatch = $matchCreated.id;
        counter++;
    }
}

    $:minutes = Math.floor($timer/60);
    $:seconds = $timer%60;
</script>
<div class="main">
    <div class="left">
        {#if $board0?.length===2 && $board0[0] && $board0[1]}
            <div class="name-logo" transition:fly={{y:-100, duration:500}} style="background-image: linear-gradient(#{$board0[0]}, white); padding-right: 0;">
                <div class="logo-cont">
                    {#if logo1}
                        <img src="{logo1}" alt="team 1 logo">
                    {/if}
                </div>
                <div class="name-cont">
                    <h1>{$board0[1]}</h1>
                </div>
                <div class="score0" style="background-color: #{$board0[0]}">
                    {#if $scores?.score0}
                        <h1>{$scores.score0}</h1>
                    {:else}
                        <h1>0</h1>
                    {/if}
                </div>                       
            </div>
            <div class="team0-games">
                {#each team0Games as g}
                    {#if g}
                        <div style="min-width: 50px; height: 15px; min-height: 15px; border: 2px black solid; border-radius: 15px; background-color: #{$board0[0]}"></div>
                    {:else}
                        <div style="min-width: 50px; height: 15px; min-height: 15px; border: 2px black solid; border-radius: 15px;"></div>
                    {/if}
                {/each}
            </div>
        {/if}
    </div>
    <div class="center">
        {#if $board0?.length===2 && $board1?.length===2 && $board0[1] && $board1[1]}
            <div class="timer" transition:fly={{y:-100, duration:500}}>
                {#if minutes!= undefined && seconds !=undefined && !$isOT}
                    {#if seconds>9}
                        <h1 style="-webkit-text-stroke-width: 0px;">{minutes}:{seconds}</h1>
                    {:else}
                        <h1>{minutes}:0{seconds}</h1>
                    {/if}
                {:else if $isOT}
                    {#if seconds>9}
                            <h1 style="-webkit-text-stroke-width: 0px;">+{minutes}:{seconds}</h1>
                        {:else}
                            <h1>+{minutes}:0{seconds}</h1>
                    {/if}
                {:else}
                    <h1>5:00</h1>
                {/if}
            </div>
            <div class="series-tracker">
                {#if seriesLength > 0}
                    <p style="padding:0; margin: 0;"> Game {counter} of {seriesLength}</p>
                {/if}
            </div>
        {/if}
    </div>
    <div class="right">
        {#if $board1?.length===2 && $board1[0] && $board1[1]}
            <div class="name-logo" transition:fly={{y:-100, duration:500}} style="background-image: linear-gradient(#{$board1[0]}, white); padding-left: 0;">
                <div class="score1" style="background-color: #{$board1[0]}">
                    {#if $scores?.score1}
                        <h1>{$scores.score1}</h1>
                    {:else}
                        <h1>0</h1>
                    {/if}
                </div>
                <div class="name-cont">                
                    <h1>{$board1[1]}</h1>
                </div> 
                <div class="logo-cont">
                    {#if logo1}
                        <img src="{logo2}" alt="team 2 logo">
                    {/if}
                </div>
            </div>
            <div class="team1-games">
                {#each team1Games as g}
                    {#if g}
                        <div style="min-width: 50px; height: 15px; min-height: 15px; border: 2px black solid; border-radius: 15px; background-color: #{$board1[0]}"></div>
                    {:else}
                        <div style="min-width: 50px; height: 15px; min-height: 15px; border: 2px black solid; border-radius: 15px;"></div>
                    {/if}
                {/each}
            </div>
        {/if}
    </div>
</div>
<style>
    img {
        width: 100px;
        height: 100px;
        border: none;
        background: none;
    }
    h1 {
        margin: 0;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: white;
    }
    .main {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
    }
    .left {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
    }
    .center {
        background-color: rgb(30, 30, 30);
        color: white;
    }
    .name-logo {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        min-width: 30em;
        max-width: 30em;
        width: 30em;
        padding: 0.5em 1.5em;
        min-height: 100px;
        height: 100px;
        max-height: 100px;
        border: 1px solid black;
    }
    .timer {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        padding: 0.5em 1.5em;
        min-height: 100px;
        height: 100px;
        max-height: 100px;
        border: 1px solid rgb(30, 30, 30);
    }
    .series-tracker {
        height: 20px;
        border: 1px solid white;
    }
    .team0-games {
        height: 20px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-around;
        align-items: center;
        border: 1px solid black;
        background: white;
    }
    .team1-games {
        height: 20px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-around;
        align-items: center;
        border: 1px solid black;
        background: white;
    }
    .score0 {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0.5em;
        min-width: 3.75em;
    }
    .score1 {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0.5em;
        min-width: 3.75em;
    }
</style>