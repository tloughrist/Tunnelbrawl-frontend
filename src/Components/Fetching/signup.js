export default async function signup(username, email, profilePic, password) {
  const res = await fetch(`https://tunnelbrawl.onrender.com/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      username: username,
      email: email,
      pic_url: profilePic,
      password: password
      }),
  });
  return res;
};