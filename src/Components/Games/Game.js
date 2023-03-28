import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import swal from '@sweetalert/with-react';
import HostButtonsMid from './GameControls/HostBtnsMid.js';
import HostButtonsBegin from './GameControls/HostBtnsBegin.js';
import GuestButtons from './GameControls/GuestBtns.js';
import PlayingField from './Board/Components/PlayingField.js';
import { UserContext } from '../../App.js';
import { GamesContext } from './Games.js';
import { convert } from './Helpers/Converters.js';

export const GameContext = createContext();
export const BoardContext = createContext();
export const ColorContext = createContext();
export const BoardIdContext = createContext();
export const ActivePieceContext = createContext();

export default function Game({ gamePkg, setGames, setSelectedGame }) {
  
  const [boardId, setBoardId] = useState(gamePkg.board.id);
  const user = useContext(UserContext);
  const games = useContext(GamesContext);
  const setterBundle = {setGames: setGames, setActivePiece: setActivePiece};
  const [game, _setGame] = useState(gamePkg.game);
  const [board, _setBoard] = useState(convert(gamePkg.board, setterBundle));
  const [color, _setColor] = useState(gamePkg.game.players.find(({user_id}) => user_id === user.id).color);
  const [activePiece, _setActivePiece] = useState();
  const [moveAcknowledged, setMoveAcknowledged] = useState(false);
  const isHost = gamePkg.game.host_id === user.id;
  const gameRef = useRef(game);
  const boardRef = useRef(board);
  const colorRef = useRef(color);
  const activeRef = useRef(activePiece);

  function setGame(data) {
    _setGame(data);
    gameRef.current = data;
  };

  function setBoard(data) {
    _setBoard(data);
    boardRef.current = data;
  };

  function setColor(data) {
    _setColor(data);
    colorRef.current = data;
  };

  function setActivePiece(data) {
    _setActivePiece(data);
    activeRef.current = data;
  };

  function announceGameWinner() {
    const winner = game.players.find((player) => {
      return player.status === "winner";
    })
    return swal(`${winner.username} Wins!`)
  };

  function announceMove() {
    if (game.round === 1) {
      return swal("It's your move.", "After your move, don't forget to place a new piece from your hand onto one of the four squares of your tunnel." )
    } else {
      return swal("It's your move.");
    }
  };

  useEffect(() => {
    if (Object.keys(gamePkg).length > 0) {
      setGame(gamePkg.game);
      setBoard(convert(gamePkg.board, setterBundle));
      setBoardId(gamePkg.board.id)
      setColor(gamePkg.game.players.find(({user_id}) => user_id === user.id).color);
      //Dev only
      //setColor(gamePkg.game.turn)
    }
  }, [gamePkg])

  useEffect(() => {
    if (game.status === "complete") {
      announceGameWinner()
    }
  }, [game]);

  useEffect(() => {
    if (game.turn !== colorRef.current) {
      setMoveAcknowledged(false);
    }
    if (game.turn === colorRef.current && !moveAcknowledged) {
      announceMove()
      .then((value) => {
        if (value) {
          setMoveAcknowledged(true);
        }
      });
    }
  }, [game])
  
  return (
    <GameContext.Provider value={gameRef.current}>
      <BoardContext.Provider value={boardRef.current}>
        <ColorContext.Provider value={colorRef.current}>
          <BoardIdContext.Provider value={boardId}>
            <ActivePieceContext.Provider value={activeRef.current}>
              <div>
                {
                  isHost ?
                    game.status === "pending" ?
                      <HostButtonsBegin
                        games={games}
                        setGames={setGames}
                        setSelectedGame={setSelectedGame}
                      />
                    : <HostButtonsMid
                        games={games}
                        setGames={setGames}
                        setSelectedGame={setSelectedGame}
                      />
                  : <GuestButtons
                      game={gameRef.current}
                      setGames={setGames}
                      setSelectedGame={setSelectedGame}
                    />
                }
                <PlayingField setterBundle={setterBundle} />
              </div>
            </ActivePieceContext.Provider>
          </BoardIdContext.Provider>
        </ColorContext.Provider>
      </BoardContext.Provider>
    </GameContext.Provider>
  );
};