export default async function changepassword(userId, password) {
  const res = await fetch(`/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      password
    }),
  });
  return res;
};