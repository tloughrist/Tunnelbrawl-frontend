export default async function submitUser(userId, newUserObj) {
  const res = await fetch(`/users/${userId}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserObj),
    });
  if (res.ok) {
    const usr = await res.json();
    return usr;
  } else {
    alert(res.errors);
  }
};