export default async function fetchPublic(user_id) {
  const response = await fetch(`https://tunnelbrawl.onrender.com/games/public/${user_id}`);
  if (response.ok) {
    const pkgs = await response.json();
    return pkgs;
  } else {
    alert(response.errors);
  }
};