import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getWords} from "../APIMethods.js";

interface PracticeScreenProps {
    updateProgress: (x: number, y: number) => void;
}

// Define the type for the word object

type wordType = {
    id: number,
    word: string,
    pos: string
}
// Define the prop types for the PracticeScreen component
const PracticeScreen = ({updateProgress}: PracticeScreenProps) => {
    const [words, setWords] = useState([]);
    const [word_poses, setWordPoses] = useState([]);
    const [score, setScore] = useState(0);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [feedback, setFeedback] = useState('');
    const [completed, setCompleted] = useState(false);
    const navigate = useNavigate();
    const [nextActivated, setNextActivated] = useState(false);

    const handleNavigateRankScreen = (e: any) => {
        e.preventDefault();
        //navigate to the ranking screen and pass score to get user ranking
        navigate("/RankScreen", {state: {score: score}});
    };

    // Fetch the words data from the API on component mount
    useEffect(() => {
        getWords().then(data => {
            setWords(data.wordObjs) //word objects
            setWordPoses(data.wordPoses) // word parts of speech
        });
    }, []);
    // Function to handle option selection
    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
        checkAnswer(option);
    };
    // Function to check the answer and score and update the state accordingly
    const checkAnswer = (option: string) => {
        if (option === "undefined") { //cannot move on to next question if current question is not answered
            setNextActivated(false);
        }
        setNextActivated(true);
        const currentWord = words[currentWordIndex];
        const isCorrect = (currentWord as wordType).pos === option; //check if user chose the right answer
        const feedbackMessage = isCorrect ? 'Correct!' : 'Incorrect!';
        setFeedback(feedbackMessage);
        isCorrect ? setScore(score + 1) : null; //update score
    };
    // Function to handle moving to the next word, update the counter
    const handleNextWord = (e: any) => {
        e.preventDefault();
        setSelectedOption('');
        setFeedback('');
        if (currentWordIndex + 1 < words.length) {
            setCurrentWordIndex(currentWordIndex + 1);
            updateProgress((currentWordIndex +1), words.length)
        } else {
            setCurrentWordIndex(currentWordIndex + 1);
            updateProgress((currentWordIndex +1), words.length);
            //whether to show the "Show Rank" or continue to next word
            setCompleted(true);
        }
        setNextActivated(false);

    };
    // Render the PracticeScreen component
    return (
        <div>
            <h1>Practice Screen</h1>
            {completed ? (<div>
                Congrats!! Let's check the results
            </div>) : (
                <div>
                    <h2>Word: {(words[currentWordIndex] as wordType)?.word}</h2>
                    <div>
                        {word_poses.map((word_pos, idx) => {
                            return (<button key={idx}
                                            onClick={() => handleOptionSelect(word_pos)}
                                            disabled={selectedOption !== ''}
                            >
                                {word_pos}
                            </button>)
                        })}
                    </div>
                </div>
            )}
            {feedback && <p>{feedback}</p>}
            <button disabled={completed ? false : !nextActivated}
                    onClick={completed ? (e) => handleNavigateRankScreen(e) : (e) => handleNextWord(e)}>{completed ? "Show Rank" : "Next Word"}</button>
        </div>
    );
};
export default PracticeScreen;