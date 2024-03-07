import { useQuery } from "@tanstack/react-query";
import genres from "../data/genres";
import apiClient from "../services/apiClient";
import { FetchResponse } from "../services/apiClient";

export interface Genre {
    id: number;
    name: string;
    image_background: string;
}

// const useGenres = () => useData<Genre>("/genres")
const useGenres = () => useQuery({
    queryKey: ['genres'],
    queryFn: () => 
        apiClient
            .get<FetchResponse<Genre>>('/genres')
            .then(res => res.data),
    staleTime: 24 * 60 * 60 * 1000, //24h
    initialData: genres
})

export default useGenres;