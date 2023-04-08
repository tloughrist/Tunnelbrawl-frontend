export default async function cancel(gameId) {
  const res = await fetch(`/games/${gameId}`, {
    method: "DELETE"
  });
  if (res.ok) {
    const pkg = await res.json();
    return pkg;
  } else {
    alert(res.errors);
  }
};