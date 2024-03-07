import axios from "axios";

export interface FetchResponse<T> {
    count: number;
    results: T[];
}

export default axios.create(
    {
        baseURL: "https://api.rawg.io/api",
        params:{
            key: "a4fd710b62ed4c36a783d8f9639ba9a6"
        }
    }
)
