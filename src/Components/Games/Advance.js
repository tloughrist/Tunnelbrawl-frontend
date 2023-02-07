import {isCamp} from "./Checkers.js";

export default function advance(board, game) {
  const empty = board.filter((space) => {
    return isCamp(space.loc, game.turn) && space.contents.type === "empty"});
  if (game.phase === "move" && empty.length > 0) {
    return {phase: "place"};
  } else if (game.phase === "place" && empty.length > 0) {
    return {phase: "place"};
  } else {
    switch(game.no_players) {
      case 2: {
        switch(game.turn) {
          case "red":
            return {phase: "move", turn: "blue"};
          case "blue":
            return {phase: "move", turn: "red", round: game.round + 1};
          default:
            return;
        };
      };
      case 3: {
        switch(game.turn) {
          case "red":
            return {phase: "move", turn: "green"};
          case "green":
            return {phase: "move", turn: "blue"};
          case "blue":
            return {phase: "move", turn: "red", round: game.round + 1};
          default:
            return;
        };
      };
      case 4: {
        switch(game.turn) {
          case "red":
            return {phase: "move", turn: "green"};
          case "green":
            return {phase: "move", turn: "blue"};
          case "blue":
            return {phase: "move", turn: "yellow"};
          case "yellow":
            return {phase: "move", turn: "red", round: game.round + 1};
          default:
            return;
        };
      };
      default:
        return;
    }
  }
};