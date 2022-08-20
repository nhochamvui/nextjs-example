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

export const login = () => {
  fetch("https://api-nodejs-todolist.herokuapp.com/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "hoangtho@gmail.com",
      password: "1234567",
    }),
  });
};
