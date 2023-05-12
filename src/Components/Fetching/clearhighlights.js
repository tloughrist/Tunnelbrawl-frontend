export default async function clearhighlights(boardId) {
  const res = await fetch(`https://tunnelbrawl.onrender.com/boards/clear_highlights/${boardId}`, {
    method: "PUT",
  });
  return res;
};