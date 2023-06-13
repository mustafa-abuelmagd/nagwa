import axios from "axios";

const API = "http://localhost:3000";
const GET_WORDS = "/getWords";
const GET_RANKING = "/getRanking";
export const apiClient = axios.create({
    baseURL: API,
});

export const getWords = async () => {
    try {
        const response = await apiClient.get(GET_WORDS);
        const {data} = response;
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const getRanking = async (score) => {
    try {
        const response = await apiClient.post(GET_RANKING, {
            "score": score
        });
        const {data} = response;
        return data;
    } catch (error) {
        console.error(error);
    }
};
