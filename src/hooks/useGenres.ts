import { useQuery } from "@tanstack/react-query";
import genres from "../data/genres";
import APIClient from "../services/apiClient";
import ms from "ms";
import Genre from "../entities/Genre";

const apiClient = new APIClient<Genre>("/genre");

// const useGenres = () => useData<Genre>("/genres")
const useGenres = () =>
  useQuery({
    queryKey: ["genres"],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"), //24h
    initialData: genres,
  });

export default useGenres;
