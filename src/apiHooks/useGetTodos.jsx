import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetTodos = () =>
  useQuery({
    queryKey: [`todos`],
    queryFn: async () => {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/todos/1`
      );
      return res.data;
    },
    placeholderData: { userId: 1, id: 1, title: "loading data..." },
  });

export default useGetTodos;
