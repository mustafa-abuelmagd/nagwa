import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {getRanking} from "../APIMethods.js";

interface RankScreenScreenProps {
    updateProgress: (x: number, y: number) => void;
}

const RankScreen = ({updateProgress}: RankScreenScreenProps) => {
    const [_score, setScore] = useState(0);
    const [rank, setRank] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const {score} = location.state;

    useEffect(() => {
        // Update the score state with the score received from the previous screen
        setScore(score)
        // Fetch the ranking data based on the score
        getRanking(score * 10).then((data) => {
                // Update the rank state with the received rank data
                setRank(data.rank)
            }
        );
    }, [score]);

    const handleTryAgain = () => {
        // Reset the score and rank states
        setScore(0);
        setRank(0);
        // Reset the progress and navigate to the PracticeScreen
        updateProgress(0, 10)
        navigate("/PracticeScreen")
    };

    return (
        <div>
            <h1>Rank Screen</h1>
            <p>Your Score: {score}</p>
            <p>Your Rank: {rank}</p>
            <button onClick={handleTryAgain}>Try Again</button>
        </div>
    );
};
export default RankScreen;