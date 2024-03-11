import { create } from "zustand";

interface GameQuery {
    platformId?: number;
    genreId?: number;
    sortOrder?: string;
    searchQuery?: string;
}

interface GameQueryStore {
    gameQuery: GameQuery;
    setSearchText: (searchQuery: string) => void;
    setGenreId: (genreId: number) => void;
    setPlatformId: (platformId: number) => void;
    setSortOrder: (sortOrder: string) => void;
}

const useGameQueryStore = create<GameQueryStore>(set => ({
    gameQuery: {},
    setSearchText: (searchQuery) => set(() => ({
        gameQuery: { searchQuery }
    })),
    setGenreId: (genreId) => set(store => ({
        gameQuery: {...store.gameQuery, genreId}
    })),
    setPlatformId: (platformId) => set(store => ({
        gameQuery: {...store.gameQuery, platformId}
    })),
    setSortOrder: (sortOrder) => set(store => ({
        gameQuery: {...store.gameQuery, sortOrder}
    }))
}))

export default useGameQueryStore;