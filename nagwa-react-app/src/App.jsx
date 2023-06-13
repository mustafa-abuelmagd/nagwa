import './App.css'
import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import PracticeScreen from "./Components/PracticeScreen";
import RankScreen from "./Components/RankScreen";

const App = () => {

    const [progress, setProgress] = useState(10);
    const location = useLocation();
    const navigate = useNavigate();
    const updateProgress = (answeredQuestions, totalQuestions) => {
        const progressPercentage = ((answeredQuestions + 1) / totalQuestions) * 100;
        setProgress(progressPercentage);
    };

    useEffect(() => {
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
            <div>
                Progress: {progress}%
            </div>
        </>
    )
}

export default App
