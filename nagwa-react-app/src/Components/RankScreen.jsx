import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {getRanking} from "../APIMethods";

const RankScreen = ({updateProgress}) => {
    const [_score, setScore] = useState(0);
    const [rank, setRank] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const {score} = location.state;

    useEffect(() => {
        setScore(score)

        getRanking(score * 10).then((data) => {
                console.log("received data is ", data)
                setRank(data.rank)
            }
        );
    }, [score]);

    const handleTryAgain = () => {
        setScore(0);
        setRank(0);
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