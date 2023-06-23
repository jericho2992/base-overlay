<script>
  import { socket } from "./lib/socket.js";  
  import { targetPlayer, gameEnd, matchCreated, goal, assist, replayEnd, matchDestroyed } from "./lib/processor.js";
  import { fade, fly } from "svelte/transition";

  import TeamPanel from "./TeamPanel.svelte";
  import Scoreboard from "./Scoreboard.svelte";
  import FocusPanel from "./FocusPanel.svelte";
  import FocusRadial from "./FocusRadial.svelte";
  import StatsScreen from "./StatsScreen.svelte";
  import GoalPanel from "./GoalPanel.svelte";

  
  let setup = true;
  let logo1;
  let logo2;
  let seriesLength;
  let stat = false;
  let counter=1;
  let goalPanel=false;
  let scorer;
  let assister="";
  let speed;

  $: if($goal?.scorer) {
    goalPanel = true;
    scorer = $goal.scorer;
    assister = $goal.assister;
    speed = $goal.speed;
  }



  $: if($replayEnd?.end === true) {
    goalPanel = false;
  }

  let lastReportedMatch = 0;
  $: if($gameEnd?.match != 0) {
    if($gameEnd.match != lastReportedMatch) {
      lastReportedMatch = $gameEnd.match;
      stat=true;
    }
  }

  let lastCreatedMatch = 0;
  $: if($matchDestroyed?.destroyed) {
      if($matchDestroyed.destroyed === true) {
        counter++;
        stat = false;
      }
  }

  function completeSetup(event) {
    if(!seriesLength) {
      alert("Select a series length");
      return;
    }
    setup = false;
  }
  function handleLogo1(event) {
    let image = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = e => {
      logo1 = e.target.result;
    };
  }
  function handleLogo2(event) {
    let image = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = e => {
      logo2 = e.target.result;
    };
  }
</script>

<main>
  {#if setup}
    <div class="setup">
      <form on:submit|preventDefault={completeSetup}>
        <label for="logo1">Team Logo 1</label>
        <input type="file" id="logo1" name="logo1" on:change={handleLogo1}><br>
        <label for="logo2">Team Logo 2</label>
        <input type="file" id="logo2" name="logo2" on:change={handleLogo2}><br>
        <label for="series-length">Series Length</label><br>
        <label for="0">0</label>
        <input type="radio" value="0" name="series-length" id="0" bind:group={seriesLength}>
        <label for="3">3</label>
        <input type="radio" value="3" name="series-length" id="3" bind:group={seriesLength}>
        <label for="5">5</label>
        <input type="radio" value="5" name="series-length" id="5" bind:group={seriesLength}>
        <label for="7">7</label>
        <input type="radio" value="7" name="series-length" id="7" bind:group={seriesLength}><br>
        <input type="submit" name="submit" id="submit" value="Submit">
      </form>
    </div>
  {:else}
    <div class="team0-wrap">
      <TeamPanel teamNumber={0}></TeamPanel>
    </div>
    <div class="team1-wrap">
      <TeamPanel teamNumber={1}></TeamPanel>
    </div>
    <div class="scoreboard">
      <Scoreboard logo1={logo1} logo2={logo2} seriesLength={seriesLength}></Scoreboard>
    </div>
    <div class="focus-wrap">
      {#if $targetPlayer?.name && !goalPanel}
        <FocusPanel></FocusPanel>
      {/if}
    </div>
    <div class="radial-wrap">
      {#if $targetPlayer?.name && !goalPanel}
        <FocusRadial></FocusRadial>
      {/if}
    </div>
    {#if stat}
      <div class="end-stats" transition:fade={{duration:3000}}>
        <StatsScreen bind:seriesLength={seriesLength} bind:counter={counter}></StatsScreen>
      </div>
    {/if}
    {#if goalPanel}
      <div class="goal-wrap" transition:fly={{ duration:750, y:100}}>        
        <GoalPanel scorer={scorer} assist={assister} speed={speed}></GoalPanel>         
      </div>
    {/if}
    
  {/if}
  
</main>

<style>
  label {
    font-size: 4em;
    font-weight: 600;
    -webkit-text-stroke: 1px white;
  }
  input {
    font-size: 2em;
  }
  input[type="radio"] {
    width: 1.5em;
    height: 1.5em;
  }
  .team0-wrap {
    position: absolute;
    top: 0;
    left: 0;
  }
  .team1-wrap {
    position: absolute;
    top: 0;
    right: 0;
  }
  .focus-wrap {
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .radial-wrap {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .end-stats {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
  }
  .goal-wrap {
    position: absolute;
    bottom: 0;
    left: 0;
  }
</style>
