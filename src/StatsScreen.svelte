<script>
    import { board0, board1, team0, team1, matchCreated, gameEnd } from "./lib/processor";

    export let seriesLength;
    export let counter;
</script>

{#if $board0?.length === 2 && $board1?.length === 2}
    <div class="main">
        <div class="outer-frame" style="
        background-image: conic-gradient(from 0deg, white 0deg, #{$board1[0]} 90deg, white 180deg, #{$board0[0]} 270deg, white 360deg);">
            <div class="inner-frame">
                <div class="title">
                    {#if seriesLength>0}
                        <h1>Game {counter} Recap</h1>
                    {:else}
                        <h1>Game Recap</h1>
                    {/if}
                </div>
                <div class="table-cont">
                    {#if $team0?.length && $team1?.length}
                        <table>
                            <tr>
                                {#each $team0 as p}
                                    <td>{p.name}</td>
                                {/each}
                                <th>Players</th>
                                {#each $team1 as p}
                                    <td>{p.name}</td>
                                {/each}
                            </tr>
                            <tr>
                                {#each $team0 as p}
                                    <td>{p.score}</td>
                                {/each}
                                <th>Score</th>
                                {#each $team1 as p}
                                    <td>{p.score}</td>
                                {/each}
                            </tr>
                            <tr>
                                {#each $team0 as p}
                                    <td>{p.goals}</td>
                                {/each}
                                <th>Goals</th>
                                {#each $team1 as p}
                                    <td>{p.goals}</td>
                                {/each}
                            </tr>
                            <tr>
                                {#each $team0 as p}
                                    <td>{p.shots}</td>
                                {/each}
                                <th>Shots</th>
                                {#each $team1 as p}
                                    <td>{p.shots}</td>
                                {/each}                                
                            </tr>
                            <tr>
                                {#each $team0 as p}
                                    <td>{p.assists}</td>
                                {/each}
                                <th>Assists</th>
                                {#each $team1 as p}
                                    <td>{p.assists}</td>
                                {/each}
                            </tr>
                            <tr>
                                {#each $team0 as p}
                                    <td>{p.saves}</td>
                                {/each}
                                <th>Saves</th>
                                {#each $team1 as p}
                                    <td>{p.saves}</td>
                                {/each}
                            </tr>
                            <tr>
                                {#each $team0 as p}
                                    <td>{p.demos}</td>
                                {/each}
                                <th>Demos</th>
                                {#each $team1 as p}
                                    <td>{p.demos}</td>
                                {/each}
                            </tr>
                            <tr>
                                {#each $team0 as p}
                                    <td>{p.touches}</td>
                                {/each}
                                <th>Ball Touches</th>
                                {#each $team1 as p}
                                    <td>{p.touches}</td>
                                {/each}
                            </tr>
                        </table>
                    {/if}
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    .main {
        margin-top: 2em;
    }
    .outer-frame {
        background: black;
        min-width: 90em;
        max-width: 90em;
        min-height: 50em;
        height: 50em;
        max-height: 50em;
        clip-path: polygon(5em 0em, 85em 0em, 90em 5em, 90em 45em, 85em 50em, 5em 50em, 0em 45em, 0em 5em);
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
    }
    .inner-frame {
        background-image: radial-gradient(rgb(200, 200, 200), rgb(100, 100, 100));
        min-width: 88em;
        max-width: 88em;
        min-height: 48em;
        height: 48em;
        max-height: 48em;
        clip-path: polygon(4.25em 0em, 83.75em 0em, 88em 4.25em, 88em 43.5em, 83.75em 48em, 4.5em 48em, 0em 43.5em, 0em 4.25em);
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
    }
    th, td {
        font-size: 1.6em;
        padding: 0.15em 0.25em;
        min-width: 5.7em;
        width: 5.7em;
        max-width: 5.7em;
        margin: 0;
        overflow-wrap: break-word;
    }
    
</style>