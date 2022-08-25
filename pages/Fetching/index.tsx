import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import { getUser, login, registerUser } from "./api";

const Fetching: NextPage = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: isLoging,
    isError: isLoginError,
    data: loginInfo,
    error: loginError,
  } = useQuery(["user"], login);

  const {
    isLoading,
    isError,
    data: user,
    error,
  } = useQuery(["userInfo"], () => getUser(loginInfo.token), {
    enabled: loginInfo !== null,
  });
  

//   const registerUserMutation = useMutation(registerUser, {
//     onSuccess: () => {
//       // Invalidate and refetch
//       queryClient.invalidateQueries(["user"]);
//     },
//   });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      <h1>Fetch Data with React Query</h1>

      {user && <h2>Hello {user.name}!</h2>}
      {/* <button
        onClick={() => {
          mutation.mutate({
            email: "hoangtho@gmail.com",
            password: "1234567",
          });
        }}
      >
        Login
      </button> */}
    </>
  );
};

export default Fetching;
