import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import { login, registerUser } from "./api";

const Fetching: NextPage = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data,
    error,
  } = useQuery(["user"], login);
  

//   const registerUserMutation = useMutation(registerUser, {
//     onSuccess: () => {
//       // Invalidate and refetch
//       queryClient.invalidateQueries(["user"]);
//     },
//   });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error</span>;
  }
  else{
    return <span>{data}</span>
  }

  return (
    <>
      <h1>Fetch Data with React Query</h1>

      (data && <h2></h2>)
      <button
        onClick={() => {
          mutation.mutate({
            email: "hoangtho@gmail.com",
            password: "1234567",
          });
        }}
      >
        Login
      </button>
    </>
  );
};

export default Fetching;
