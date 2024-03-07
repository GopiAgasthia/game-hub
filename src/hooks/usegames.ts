import { useInfiniteQuery } from "@tanstack/react-query";
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

const useGames = (gameQuery: GameQuery) =>  useInfiniteQuery({
        queryKey: ["games", gameQuery],
        queryFn: ({ pageParam=1 }) =>
            apiClient.getAll({
                params: {
                    page: pageParam,
                    genres: gameQuery.genreId,
                    parent_platforms: gameQuery.platformId,
                    ordering: gameQuery.sortOrder,
                    search: gameQuery.searchQuery,
                },
            }),
        staleTime: 24 * 60 * 60 * 1000, //24h
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.next ? allPages.length + 1 : undefined;
        }
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