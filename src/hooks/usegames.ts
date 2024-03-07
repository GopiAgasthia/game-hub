import { useQuery } from "@tanstack/react-query";
import { GameQuery } from "../App";
import APIClient from "../services/apiClient";
import { Platform } from "./usePlatforms";

const apiClient = new APIClient<Game>('/games')

export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: { platform: Platform }[];
    metacritic: number;
    rating_top: number;
}

const useGames = (gameQuery: GameQuery) =>  useQuery({
        queryKey: ["games", gameQuery],
        queryFn: () =>
            apiClient.getAll({params: {
                        genres: gameQuery.genre?.id,
                        parent_platforms: gameQuery.platform?.id,
                        ordering: gameQuery.sortOrder,
                        search: gameQuery.searchQuery,
                    },
                }),
        staleTime: 24 * 60 * 60 * 1000, //24h
    })

export default useGames;

    // useData<Game>("/games", {
    //     params: {
    //         genres: gameQuery.genre?.id,
    //         parent_platforms: gameQuery.platform?.id,
    //         ordering: gameQuery.sortOrder,
    //         search: gameQuery.searchQuery,
    //     } }, [ gameQuery ]
    // );