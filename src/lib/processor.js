import { derived } from "svelte/store";
import { socketMessageStore } from "./socket";

export const updateState = derived(socketMessageStore, ($msg, set) => {
    if(!$msg) return;

    if($msg.event === "game:update_state") {
        set($msg.data);
    }

});

export const statEvent = derived(socketMessageStore, ($msg, set) => {
    if(!$msg) return;

    if($msg.event === "game:statfeed_event") {
        set($msg.data);
    }
});

export const gameEnd = derived(socketMessageStore, ($msg, set) => {
    if(!$msg) return;

    if($msg.event === "game:match_ended") {
        const winner = $msg.data.winner_team_num;
        const id = $msg.data.match_guid;
        set({winner: winner,
        match: id});
    } else {
        set({winner: "",
    match: 0});
    }
});

export const matchCreated = derived(socketMessageStore, ($msg, set) => {
    if(!$msg) return;

    if($msg.event === "game:match_created") {
        const matchID = $msg.data.match_guid;
        set({id: matchID});
    } else {
        set({});
    }
});

export const demo = derived(statEvent, ($stat, set) => {
    if(!$stat) return;

    if($stat.event_name === "Demolish") {
        const boomer = $stat.main_target.id;
        const boomed = $stat.secondary_target.name;
        set({demo: boomer,
        killed: boomed});
        setTimeout(() => {
            set({});
        }, 1000);
    }
});

export const shot = derived(statEvent, ($stat, set) => {
    if(!$stat) return;

    if($stat.event_name === "Shot") {
        const shooter = $stat.main_target.id;
        set({shooter: shooter});
        setTimeout(()=>{
            set({});
        }, 1000);
    }
});

export const save = derived(statEvent, ($stat, set) => {
    if(!$stat) return;

    if($stat.event_name === "Save") {
        const keeper = $stat.main_target.id;
        set({keeper: keeper});
        setTimeout(()=>{
            set({});
        }, 1000);
    }
});

export const assist = derived(statEvent, ($stat, set) => {
    if(!$stat) return;

    if($stat.event_name === "Assist") {
        const buddy = $stat.main_target.id;
        set({buddy: buddy});
        setTimeout(()=>{
            set({});
        }, 1000);
    }
});

export const targetPlayer = derived(updateState, ($update, set) => {
    if (!$update) return;
  
    if ($update.game.hasTarget) {
      const player = $update.players[$update.game.target];
      set(player);
    } else {
      set({});
    }
});

export const team0 = derived(updateState, ($update, set) => {
    if(!$update) return;
    
    const allPlayers = Object.values($update.players);
    let players = [];
    allPlayers.forEach(p =>{
        if(p.team===0) {
            players.push(p);
        }
    });
    if( players.length>0 && !$update.game.isReplay) {
        set(players);
    }
    
});

export const team1 = derived(updateState, ($update, set) => {
    if(!$update) return;
    
    const allPlayers = Object.values($update.players);
    let players = [];
    allPlayers.forEach(p =>{
        if(p.team===1) {
            players.push(p);
        }
    });
    if (players.length>0 && !$update.game.isReplay)
    {
        set(players);
    }
});
export const timer = derived(updateState, ($update, set) => {
    if (!$update) return;

    const time = $update.game.time_seconds;
    set(time);
});

export const board0 = derived(updateState, ($update, set) => {
    if(!$update) return;

    let board = new Array(2);
    board[0] =  $update.game.teams[0].color_primary;
    board[1] = $update.game.teams[0].name;

    if(board[0] && board[1]) {
        set(board);
    } else {
        set({});
    }
});

export const board1 = derived(updateState, ($update, set) => {
    if(!$update) return;

    let board = new Array(2);
    board[0] =  $update.game.teams[1].color_primary;
    board[1] = $update.game.teams[1].name;

    if(board[0] && board[1]) {
        set(board);
    } else {
        set({});
    }
});

export const scores = derived(updateState, ($update, set) => {
    if(!$update) return;

    const score0 = $update.game.teams[0].score;
    const score1 = $update.game.teams[1].score;
    if(score0 || score1) {
        set({score0: score0,
        score1: score1})
    } else {
        set({});
    }
});

export const isOT = derived(updateState, ($update, set) => {
    if(!$update) return;

    const isOT = $update.game.isOT;
    set(isOT);
});
