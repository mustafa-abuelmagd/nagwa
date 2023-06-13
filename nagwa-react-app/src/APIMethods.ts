import axios from "axios";

const API = "http://localhost:3000";
const GET_WORDS = "/getWords";
const GET_RANKING = "/getRanking";
export const apiClient = axios.create({
    baseURL: API,
});


// Function to fetch words from the API
export const getWords = async () => {
    try {
        const response = await apiClient.get(GET_WORDS);
        const {data} = response;
        return data;
    } catch (error) {
        console.error(error);
    }
};

// Function to fetch ranking based on the score from the API
export const getRanking = async (score: number) => {
    try {
        // Send a POST request to the 'getRanking' endpoint with the score data
        const response = await apiClient.post(GET_RANKING, {
            "score": score
        });
        const {data} = response;
        return data;
    } catch (error) {
        console.error(error);
    }
};
