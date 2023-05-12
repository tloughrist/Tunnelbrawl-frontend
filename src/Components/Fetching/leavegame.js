export default async function leave(playerId) {
  const res = await fetch(`https://tunnelbrawl.onrender.com/players/${playerId}`, {
    method: "DELETE"
  });
  if (res.ok) {
    const pkg = await res.json();
    return pkg;
  } else {
    alert(res.errors);
  }
};