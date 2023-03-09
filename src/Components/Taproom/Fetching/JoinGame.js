export default async function joinGame(game_id, user_id) {
  const response = await fetch(`/players`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      user_id: user_id,
      game_id: game_id,
    }),
  });
  const user = await res.json();
  if (user.errors) {
    alert("Incorrect username/password");
  } else {
    onLogin(user);
  }
};
};