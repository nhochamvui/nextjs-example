import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { randomInt } from "crypto";
import { NextPage } from "next";
import {
  addTask,
  delTask,
  getAllTasks,
  getUser,
  login,
  registerUser,
} from "./api";

const Fetching: NextPage = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: isLoging,
    isError: isLoginError,
    data: loginInfo,
    error: loginError,
  } = useQuery(["user"], login, { staleTime: Infinity });

  const {
    isLoading,
    isError,
    data: user,
    error,
  } = useQuery(["userInfo"], () => getUser(loginInfo.token), {
    enabled: loginInfo != null,
    staleTime: Infinity,
  });

  const { isLoading: isLoadingTasks, data: tasks } = useQuery(
    ["tasks"],
    () => getAllTasks(loginInfo.token),
    {
      enabled: user != null,
      staleTime: Infinity,
    }
  );

  const taskAddMmutation = useMutation(["addNewTask"], addTask, {
    onSuccess: (response) => {
      // queryClient.invalidateQueries(["tasks"]);
      queryClient.setQueryData(["tasks"], {
        count: tasks.count + 1,
        data: [...tasks.data, response.data],
      });
    },
  });

  const taskDelMmutation = useMutation(["delTask"], delTask, {
    onSuccess: (response) => {
      queryClient.invalidateQueries(["tasks"]);
    },
    onMutate: (variables) => {
      return { id: variables.id };
    },
  });

  return (
    <>
      <h1>Fetch Data with React Query</h1>
      {isLoading && <span>Loading...</span>}
      {user && <h2>Hello {user.name}!</h2>}
      {!isLoading && isLoadingTasks && <span>Loading all task...</span>}
      {tasks && <h2>Task count: {tasks.count}</h2>}
      {tasks && (
        <>
          <div>
            {tasks.count > 0 &&
              tasks.data.map((task: any, index: number) => (
                <div
                  key={task._id}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <>
                    <li style={{ display: "inline" }}>{task.description}</li>
                    <button
                      onClick={(event) => {
                        event.currentTarget.disabled = true;
                        taskDelMmutation.mutate({
                          token: loginInfo.token,
                          id: task._id,
                        });
                      }}
                    >
                      Delete
                    </button>
                    {}
                    {taskDelMmutation.context?.id === task._id &&
                      taskDelMmutation.isLoading &&
                      "Deleting task..."}
                    <br />
                  </>
                </div>
              ))}
          </div>
        </>
      )}
      <br />
      <br />
      <button
        onClick={(event) => {
          taskAddMmutation.mutate({
            token: loginInfo.token,
            data: {
              description: `Task @${Math.random() * 1000}`,
            },
          });
        }}
      >
        {taskAddMmutation.isLoading
          ? "Adding new task..."
          : "Add New Random Task"}
      </button>
    </>
  );
};

export default Fetching;
