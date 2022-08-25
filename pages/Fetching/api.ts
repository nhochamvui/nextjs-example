export const registerUser = (data: any) => {
  fetch("https://api-nodejs-todolist.herokuapp.com/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      name: "Hoang Tho",
      email: "hoangtho@gmail.com",
      password: "1234567",
      age: 20,
    }),
  });
};

export const login = async () => {
  const res = await fetch("https://api-nodejs-todolist.herokuapp.com/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "hoangtho@gmail.com",
      password: "1234567",
    }),
  });

  return res.json();
};

export const getUser = async (token: string | null) => {
  const res = await fetch("https://api-nodejs-todolist.herokuapp.com/user/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  });

  return res.json();
};

export const getAllTasks = async (token: string | null) => {
  const res = await fetch("https://api-nodejs-todolist.herokuapp.com/task", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  });

  return res.json();
};

export const addTask = async ({token, data}: {token: string | null, data: any}) => {
  const res = await fetch("https://api-nodejs-todolist.herokuapp.com/task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const delTask = async ({token, id}: {token: string | null, id: number}) => {
  const res = await fetch(`https://api-nodejs-todolist.herokuapp.com/task/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  });
  return res.json();
};