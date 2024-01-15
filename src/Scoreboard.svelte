<script>
    import { timer } from "./lib/processor";
    import { board0 } from "./lib/processor";
    import { board1 } from "./lib/processor";
    import { fly } from "svelte/transition";
    import { gameEnd } from "./lib/processor";
    import { scores } from "./lib/processor";
    import { isOT } from "./lib/processor";
    import { matchCreated } from "./lib/processor";
    import { matchDestroyed } from "./lib/processor";

    export let logo1;
    export let logo2;
    export let seriesLength;

    let counter = 1;
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
    
$: if($gameEnd?.over === true) {
    if(seriesLength>0) {
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

$: if($matchDestroyed?.destroyed) {
    if($matchDestroyed.destroyed === true) {
        counter++;
    }
}

    $:minutes = Math.floor($timer/60);
    $:seconds = $timer%60;

    function addGames0() {
        let i=0;
        while(team0Games[i]){
            i++;
        } 
        team0Games[i]=true;
    }

    function removeGames0() {
        let i=0;
        do {
            i++;
        } while(team0Games[i])
        team0Games[i-1]=false;
    }

    function addGames1() {
        let i=0;
        while(team1Games[i]){
            i++;
        } 
        team1Games[i]=true;
    }

    function removeGames1() {
        let i=0;
        do {
            i++;
        } while(team1Games[i])
        team1Games[i-1]=false;
    }

    function addSeriesTracker() {
        if(seriesLength > 0) {
            counter++;
        }
    } 

    function removeSeriestTracker() {
        if(seriesLength > 0) {
            counter--;
        }
    }

    let lFont = 100;
    let lNameWidth;
    let lParent;
    $: if(lNameWidth >= lParent) {
        lFont= lFont-1;
    }

    let rFont = 100;
    let rNameWidth;
    let rParent;
    $: if(rNameWidth >= rParent) {
        rFont = rFont-1;
    }

    let nameFont;
    $: if(lNameWidth < lParent && rNameWidth < rParent) {
        nameFont = Math.min(lFont, rFont);
        lFont = nameFont;
        rFont = nameFont;
    }

</script>
<div class="main">
    <div class="left">
        {#if $board0?.length===2 && $board0[0] && $board0[1]}
            <div class="name-logo" transition:fly={{y:-100, duration:500}} style="background-image: radial-gradient(#{$board0[0]}, black); padding-right: 0;">
                <div class="logo-cont">
                    {#if logo1}
                        <img src="{logo1}" alt="team 1 logo">
                    {/if}
                </div>
                <div class="name-cont" bind:clientWidth={lParent}>
                    <h1 style="font-size: {lFont}px;" bind:clientWidth={lNameWidth}>{$board0[1]}</h1>
                </div>
                <div class="score0" style="background-color: #{$board0[0]}">
                    {#if $scores?.score0}
                        <h1>{$scores.score0}</h1>
                    {:else}
                        <h1>0</h1>
                    {/if}
                </div>                       
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="team0-games" on:click={addGames0} on:contextmenu={removeGames0}>
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
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="series-tracker" on:click={addSeriesTracker} on:contextmenu={removeSeriestTracker}>
                {#if seriesLength > 0}
                    <p style="padding:0; margin: 0;"> Game {counter} of {seriesLength}</p>
                {/if}
            </div>
        {/if}
    </div>
    <div class="right">
        {#if $board1?.length===2 && $board1[0] && $board1[1]}
            <div class="name-logo" transition:fly={{y:-100, duration:500}} style="background-image: radial-gradient(#{$board1[0]}, black); padding-left: 0;">
                <div class="score1" style="background-color: #{$board1[0]}">
                    {#if $scores?.score1}
                        <h1>{$scores.score1}</h1>
                    {:else}
                        <h1>0</h1>
                    {/if}
                </div>
                <div class="name-cont" bind:clientWidth={rParent}>                
                    <h1 style="font-size: {rFont}px;" bind:clientWidth={rNameWidth}>{$board1[1]}</h1>
                </div> 
                <div class="logo-cont">
                    {#if logo1}
                        <img src="{logo2}" alt="team 2 logo">
                    {/if}
                </div>
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="team1-games" on:click={addGames1} on:contextmenu={removeGames1}>
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
        -webkit-text-stroke-width: 2px;
        -webkit-text-stroke-color: black;
        color: white;
    }
    .main {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
        clip-path: polygon(5% 0%, 95% 0%, 100% 20%, 100% 95%, 100% 100%, 0% 100%, 0% 100%, 0% 20%);
    }
    .left {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
    }
    .right {
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
    .name-cont {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        overflow: hidden;
        justify-content: center;
        align-items: center;
        width: 60%;
        text-wrap: nowrap;
        white-space: nowrap;
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
        background: rgb(60, 60, 60);
    }
    .team1-games {
        height: 20px;
        display: flex;
        flex-direction: row-reverse;
        flex-wrap: nowrap;
        justify-content: space-around;
        align-items: center;
        border: 1px solid black;
        background: rgb(60, 60, 60);
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