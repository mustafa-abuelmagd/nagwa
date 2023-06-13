import './App.css'
import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import PracticeScreen from "./Components/PracticeScreen";
import RankScreen from "./Components/RankScreen";

const App = () => {

    // State to track the progress percentage
    const [progress, setProgress] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    // Function to update the progress based on answered questions and total questions
    const updateProgress = (answeredQuestions: number, totalQuestions: number) => {
        const progressPercentage = ((answeredQuestions ) / totalQuestions) * 100;
        setProgress(progressPercentage);
    };

    useEffect(() => {
        // If progress is less than 100, navigate to the PracticeScreen
        if (progress < 100) {
            navigate("/PracticeScreen")
        }
    }, [])
    return (
        <>
            {location.pathname === "/PracticeScreen" ? (
                <PracticeScreen updateProgress={updateProgress}/>
            ) : location.pathname === "/RankScreen" ? (
                <RankScreen updateProgress={updateProgress}/>
            ) : <></>}

            <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
            </div>
        </>
    )
}

export default App
