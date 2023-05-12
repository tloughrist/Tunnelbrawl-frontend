export default async function fetchGames(userId) {
  const response = await fetch(`https://tunnelbrawl.onrender.com/users/${userId}/games`);
  if (response.ok) {
    const pkgs = await response.json();
    return pkgs;
  } else {
    alert(response.errors);
  }
};