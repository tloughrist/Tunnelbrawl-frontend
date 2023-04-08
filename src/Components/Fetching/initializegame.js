export default async function initialize(gameId, gameUpdateObj) {
  const res = await fetch(`/games/initialize/${gameId}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(gameUpdateObj),
  });
  if (res.ok) {
    const pkg = await res.json();
    return pkg;
  } else {
    alert(res.errors);
  }
};