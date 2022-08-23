import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import { getUser, login, registerUser } from "./api";

const Fetching: NextPage = () => {
  const queryClient = useQueryClient();
  const refreshToken = localStorage.getItem("token");
  const {
    isLoading: isLoging,
    isError: isLoginError,
    data: loginInfo,
    error: loginError,
  } = useQuery(["user"], login, {
    enabled: !refreshToken
  });

  const {
    isLoading,
    isError,
    data: userInfo,
    error,
  } = useQuery(["user"], () => getUser(refreshToken), {
    enabled: refreshToken !== null,
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

      {userInfo && <h2>Hello {userInfo.user.name}!</h2>}
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
