<script>
    import { tweened } from "svelte/motion";
    import { fly } from "svelte/transition";
    import { demo, targetPlayer, shot, save, assist, board0, board1 } from "./lib/processor";
    import { fade } from "svelte/transition";

    export let team;
    export let boostBasic;
    export let name;
    export let id;
    export let isDead=false;
    
    let team0Color;
    let team1Color;

    $: if($board0?.length===2) {
        team0Color=$board0[0];
    }

    $: if($board1?.length===2) {
        team1Color=$board1[0];
    }

    const bTween = tweened(boostBasic,
    {
        duration: 60,
    });
    $: bTween.set(boostBasic);

    function popup (node, { delay, duration }) {
        return {
            delay,
            duration,
            css: t => {
                return `transform: scale(${t});`
            }
        }
    }
</script>
    <div class="main" transition:fly="{{y:-100, duration: 500}}">
        {#if isDead} 
            <div class="card-wrap" style="background-color: red;">
                {#if team===0}
                    <div class="name-boost">
                        <h2>{name}</h2>
                        {#if $demo?.demo === id}
                            <p in:popup={{ duration: 250, delay: 0}} out:popup|local={{ duration: 250, delay: 3000}}>💣</p>
                        {/if}
                        {#if $shot?.shooter === id}
                            <p in:popup={{ duration: 250, delay: 0}} out:popup|local={{ duration: 250, delay: 3000}}>⚽</p>
                        {/if}
                        {#if $save?.keeper === id}
                            <p in:popup={{ duration: 250, delay: 0}} out:popup|local={{ duration: 250, delay: 3000}}>🥅</p>
                        {/if}
                        {#if $assist?.buddy === id}
                            <p in:popup={{ duration: 250, delay: 0}} out:popup|local={{ duration: 250, delay: 3000}}>🤝</p>
                        {/if}
                        <h2>{Math.floor($bTween)}</h2>
                    </div>
                    <div class="blue-boost">
                        <div class="blue-boost-fill" style="background-color: #{team0Color}; min-width: {$bTween}%; border-radius: 0.35em;" >

                        </div>
                    </div>
                {:else}
                    <div class="boost-name">
                        <h2>{Math.floor($bTween)}</h2>
                        {#if $demo?.demo === id}
                            <p in:popup={{ duration: 250, delay: 0}} out:popup|local={{ duration: 250, delay: 3000}}>💣</p>
                        {/if}
                        {#if $shot?.shooter === id}
                            <p in:popup={{ duration: 250, delay: 0}} out:popup|local={{ duration: 250, delay: 3000}}>⚽</p>
                        {/if}
                        {#if $save?.keeper === id}
                            <p in:popup={{ duration: 250, delay: 0}} out:popup|local={{ duration: 250, delay: 3000}}>🥅</p>
                        {/if}
                        {#if $assist?.buddy === id}
                            <p in:popup={{ duration: 250, delay: 0}} out:popup|local={{ duration: 250, delay: 3000}}>🤝</p>
                        {/if}
                        <h2>{name}</h2>
                    </div>
                    <div class="orange-boost">
                        <div class="blue-boost-fill" style="background-color: #{team1Color}; min-width: {$bTween}%; border-radius: 0.35em;" >

                        </div>
                    </div>
                {/if}
            </div>
        {:else if $targetPlayer?.id === id}
            <div class="card-wrap">
                {#if team===0}
                    <div class="name-boost" style="background: #{team0Color};">
                        <h2 style="-webkit-text-stroke-width: 1px; -webkit-text-stroke-color: black;">{name}</h2>
                        {#if $demo?.demo === id}
                            <p in:popup={{ duration: 250, delay: 0}} out:popup|local={{ duration: 250, delay: 3000}}>💣</p>
                        {/if}
                        {#if $shot?.shooter === id}
                            <p in:popup={{ duration: 250, delay: 0}} out:popup|local={{ duration: 250, delay: 3000}}>⚽</p>
                        {/if}
                        {#if $save?.keeper === id}
                            <p in:popup={{ duration: 250, delay: 0}} out:popup|local={{ duration: 250, delay: 3000}}>🥅</p>
                        {/if}
                        {#if $assist?.buddy === id}
                            <p in:popup={{ duration: 250, delay: 0}} out:popup|local={{ duration: 250, delay: 3000}}>🤝</p>
                        {/if}
                        <h2 style="-webkit-text-stroke-width: 1px; -webkit-text-stroke-color: black;">{Math.floor($bTween)}</h2>
                    </div>
                    <div class="blue-boost">
                        <div class="blue-boost-fill" style="background-color: white; min-width: {$bTween}%; border-radius: 0.35em;" >

                        </div>
                    </div>
                {:else}
                    <div class="boost-name" style="background: #{team1Color};">
                        <h2 style="-webkit-text-stroke-width: 1px; -webkit-text-stroke-color: black;">{Math.floor($bTween)}</h2>
                        {#if $demo?.demo === id}
                            <p in:popup={{ duration: 250, delay: 0}} out:popup|local={{ duration: 250, delay: 3000}}>💣</p>
                        {/if}
                        {#if $shot?.shooter === id}
                            <p in:popup={{ duration: 250, delay: 0}} out:popup|local={{ duration: 250, delay: 3000}}>⚽</p>
                        {/if}
                        {#if $save?.keeper === id}
                            <p in:popup={{ duration: 250, delay: 0}} out:popup|local={{ duration: 250, delay: 3000}}>🥅</p>
                        {/if}
                        {#if $assist?.buddy === id}
                            <p in:popup={{ duration: 250, delay: 0}} out:popup|local={{ duration: 250, delay: 3000}}>🤝</p>
                        {/if}
                        <h2 style="-webkit-text-stroke-width: 1px; -webkit-text-stroke-color: black;">{name}</h2>
                    </div>
                    <div class="orange-boost">
                        <div class="blue-boost-fill" style="background-color: white; min-width: {$bTween}%; border-radius: 0.35em;" >

                        </div>
                    </div>
                {/if}
            </div>
        {:else}  
            <div class="card-wrap">
                {#if team===0}
                    <div class="name-boost">
                        <h2>{name}</h2>
                        {#if $demo?.demo === id}
                            <p in:popup={{ duration: 250, delay: 0}} out:popup|local={{ duration: 250, delay: 3000}}>💣</p>
                        {/if}
                        {#if $shot?.shooter === id}
                            <p in:popup={{ duration: 250, delay: 0}} out:popup|local={{ duration: 250, delay: 3000}}>⚽</p>
                        {/if}
                        {#if $save?.keeper === id}
                            <p in:popup={{ duration: 250, delay: 0}} out:popup|local={{ duration: 250, delay: 3000}}>🥅</p>
                        {/if}
                        {#if $assist?.buddy === id}
                            <p in:popup={{ duration: 250, delay: 0}} out:popup|local={{ duration: 250, delay: 3000}}>🤝</p>
                        {/if}
                        <h2>{Math.floor($bTween)}</h2>
                    </div>
                    <div class="blue-boost">
                        <div class="blue-boost-fill" style="background-color: #{team0Color}; min-width: {$bTween}%; border-radius: 0.35em;" >

                        </div>
                    </div>
                {:else}
                    <div class="boost-name">
                        <h2>{Math.floor($bTween)}</h2>
                        {#if $demo?.demo === id}
                            <p in:popup={{ duration: 250, delay: 0}} out:popup|local={{ duration: 250, delay: 2000}}>💣</p>
                        {/if}
                        {#if $shot?.shooter === id}
                            <p in:popup={{ duration: 250, delay: 0}} out:popup|local={{ duration: 250, delay: 3000}}>⚽</p>
                        {/if}
                        {#if $save?.keeper === id}
                            <p in:popup={{ duration: 250, delay: 0}} out:popup|local={{ duration: 250, delay: 3000}}>🥅</p>
                        {/if}
                        {#if $assist?.buddy === id}
                            <p in:popup={{ duration: 250, delay: 0}} out:popup|local={{ duration: 250, delay: 3000}}>🤝</p>
                        {/if}
                        <h2>{name}</h2>
                    </div>
                    <div class="orange-boost">
                        <div class="blue-boost-fill" style="background-color: #{team1Color}; min-width: {$bTween}%; border-radius: 0.35em;" >

                        </div>
                    </div>
                {/if}
            </div>
        {/if}
    </div>
<style>
    h2 {
        margin: 0;
        font-size: 1.3em;
    }
    p {
        margin: 0;
        padding: 0;
    }
    
    .main {
        display: flex;
        color: white;
    }
    .card-wrap {
        display: flex;
        padding: 0.25em;
        margin: 0.25em;
        flex-direction: column;
        flex-wrap: nowrap;
        background-color: rgb(50, 50, 50);
    }
    .name-boost {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-between;
        margin-left: 0.75em;
        padding: 0 3px;
    }
    .boost-name {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-between;
        margin-right: 0.75em;
        padding: 0 3px;
    }
    .blue-boost {
        margin-left: 0.75em;
        width: 12em;
        min-width: 12em;
        max-width: 12em;
        height: 0.2em;
        background-color: black;
        border-radius: 0.35em;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
    }
    .orange-boost {
        margin-right: 0.75em;
        width: 12em;
        min-width: 12em;
        max-width: 12em;
        height: 0.2em;
        background-color: black;
        border-radius: 0.35em;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-end;
    }
</style>