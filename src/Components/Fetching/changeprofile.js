export default async function changeprofile(userId, email, pic) {
  const res = await fetch(`https://tunnelbrawl.onrender.com/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      email: email,
      pic_url: pic,
      }),
  });
  return res;
};