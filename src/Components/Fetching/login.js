export default async function login(username, password) {
  const res = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      username: username,
      password: password
    }),
  });
  return res;
};