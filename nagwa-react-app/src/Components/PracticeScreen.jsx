import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getWords} from "../APIMethods";

const PracticeScreen = ({updateProgress}) => {
    const [words, setWords] = useState([]);
    const [score, setScore] = useState(0);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [feedback, setFeedback] = useState('');
    const [completed, setCompleted] = useState(false);
    const navigate = useNavigate();
    const [nextActivated, setNextActivated] = useState(false);

    const handleNavigateRankScreen = (e) => {
        e.preventDefault();
        console.log("score    ", score)

        navigate("/RankScreen", {state: {score: score}});
    };


    useEffect(() => {
        getWords().then(data => {
            setWords(data)
        });
    }, []);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        checkAnswer(option);
    };

    const checkAnswer = (option) => {
        if (option === "undefined") {
            setNextActivated(false);
        }
        setNextActivated(true);
        const currentWord = words[currentWordIndex];
        const isCorrect = currentWord.pos === option;
        const feedbackMessage = isCorrect ? 'Correct!' : 'Incorrect!';
        setFeedback(feedbackMessage);
        isCorrect ? setScore(score + 1) : null;
    };

    const handleNextWord = (e) => {
        e.preventDefault();
        setSelectedOption('');
        setFeedback('');
        if (currentWordIndex + 1 < words.length) {
            setCurrentWordIndex(currentWordIndex + 1);
            updateProgress((currentWordIndex), words.length)
        } else {
            setCurrentWordIndex(currentWordIndex + 1);
            updateProgress((currentWordIndex), words.length)

            setCompleted(true);
        }
        setNextActivated(false);

    };

    return (
        <div>
            <h1>Practice Screen</h1>
            <h2>Word: {words[currentWordIndex]?.word}</h2>
            <div>
                <button
                    onClick={() => handleOptionSelect('noun')}
                    disabled={selectedOption !== ''}
                >
                    Noun
                </button>
                <button
                    onClick={() => handleOptionSelect('adverb')}
                    disabled={selectedOption !== ''}
                >
                    Adverb
                </button>
                <button
                    onClick={() => handleOptionSelect('adjective')}
                    disabled={selectedOption !== ''}
                >
                    Adjective
                </button>
                <button
                    onClick={() => handleOptionSelect('verb')}
                    disabled={selectedOption !== ''}
                >
                    Verb
                </button>
            </div>
            {feedback && <p>{feedback}</p>}
            <button disabled={completed ? false : !nextActivated}
                    onClick={completed ? handleNavigateRankScreen : handleNextWord}>{completed ? "Show Rank" : "Next Word"}</button>
        </div>
    );
};
export default PracticeScreen;