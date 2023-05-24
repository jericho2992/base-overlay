<script>
    import { board0, board1, targetPlayer } from "./lib/processor";
    import { tweened } from "svelte/motion";

    const bTween = tweened($targetPlayer.boost,
    {
        duration: 60,
    });
    $: bTween.set($targetPlayer.boost);
</script>

<div class="main">
    <div class="radial-wrap">
        {#if $targetPlayer?.team === 0 && $board0?.length === 2}
            <div class="radial-back" style="background-color: #{$board0[0]};">
                <div class="full-boost" style="
                background: conic-gradient(from 240deg, rgb(100, 100, 100) 0deg, rgb(255, 255, 255) 240deg, #{$board0[0]} 240deg, #{$board0[0]} 240deg);">
                    <div class="empty-boost" style="
                    background: conic-gradient(from 240deg, transparent 0deg, transparent {($bTween/100)*240}deg, black {($bTween/100)*240}deg, black 240deg, transparent 240deg, transparent 360deg);">
                        <div class="meter-marker">
                            <div class="center" style="background-color: #{$board0[0]};">
                                <div class="center-content">
                                    <h1 style="color: #{$board0[0]};">{Math.floor($bTween)}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {:else if $targetPlayer?.team === 1 && $board1?.length === 2}
        <div class="radial-back" style="background-color: #{$board1[0]};">
            <div class="full-boost" style="
            background: conic-gradient(from 240deg, rgb(100, 100, 100) 0deg, rgb(255, 255, 255) 240deg, #{$board1[0]} 240deg, #{$board1[0]} 240deg);">
                <div class="empty-boost" style="
                background: conic-gradient(from 240deg, transparent 0deg, transparent {($bTween/100)*240}deg, black {($bTween/100)*240}deg, black 240deg, transparent 240deg, transparent 360deg);">
                    <div class="meter-marker">
                        <div class="center" style="background-color: #{$board1[0]};">
                            <div class="center-content">
                                <h1 style="color: #{$board1[0]};">{Math.floor($bTween)}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/if}
    </div>
</div>

<style>
    .radial-wrap {
        margin: 2em;
    }
    .radial-back {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        place-items: center;
        min-width: 18em;
        width: 18em;
        max-width: 18em;
        height: 18em;
        min-height: 18em;
        max-height: 18em;
        border-radius: 50%;
        border: 3px inset black;
    }
    .full-boost {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        place-items: center;
        min-width: 16em;
        width: 16em;
        max-width: 16em;
        height: 16em;
        min-height: 16em;
        max-height: 16em;
        border-radius: 50%;
    }
    .empty-boost {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        place-items: center;
        min-width: 16em;
        width: 16em;
        max-width: 16em;
        height: 16em;
        min-height: 16em;
        max-height: 16em;
        border-radius: 50%;
    }
    .meter-marker {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        place-items: center;
        min-width: 18em;
        width: 18em;
        max-width: 18em;
        height: 18em;
        min-height: 18em;
        max-height: 18em;
        border-radius: 50%;
        background: conic-gradient(from 240deg, transparent 0deg, transparent 240deg, white 240deg, white 241deg, transparent 241deg, transparent 359deg, white 359deg, white 360deg);
    }
    .center {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        place-items: center;
        min-width: 13em;
        width: 13em;
        max-width: 13em;
        height: 13em;
        min-height: 13em;
        max-height: 13em;
        border-radius: 50%;
    }
    .center-content {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        place-items: center;
        min-width: 10em;
        width: 10em;
        max-width: 10em;
        height: 10em;
        min-height: 10em;
        max-height: 10em;
        border-radius: 50%;
        background: radial-gradient(white, rgb(100, 100, 100));
        border: 1px solid black;
    }
</style>