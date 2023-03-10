import React, { useState, useContext, useEffect } from "react";
import fetchPublic from "./Fetching/FetchPublic.js";
import PublicGameCard from "./PublicGameCard.js";
import { UserContext } from '../../App';

function PlayersWanted() {

  const user = useContext(UserContext);
  const [publicGames, setPublicGames] = useState([]);

  useEffect(() => {
    async function publicGamesProvider() {
      const gamePkgs = await fetchPublic(user.id);
      setPublicGames(gamePkgs);
    }
    if (user.id) {
      publicGamesProvider();
    }
  }, [user]);

  function handleJoin(games) {
    setPublicGames(games);
  };
  //Why is handleJoin "not a function"?
  console.log(publicGames)

  return (
    <div className="text_block">
      <h4>Public Games - Players Wanted</h4>
        <div className="card_container">
          {
            publicGames.length > 0 ?
              <div id="public_games">
                {publicGames.map((game) =>
                  <PublicGameCard
                    key={`game${game.id}`}
                    game={game}
                    handleJoin={handleJoin}
                  />
                )}
              </div>
            : <div>       
                <p>"No games available."</p>
              </div>
          }
        </div>
    </div>
  );
};

export default PlayersWanted;