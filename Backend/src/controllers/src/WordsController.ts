import express, {Request, Response,} from 'express';
import * as fs from 'fs';
import {BaseController} from "../index";
import * as path from "path";


const router = express.Router();

interface TestData {
    wordList: wordType[];
    scoresList: number[];
}

interface wordType {
    id: number;
    word: string;
    pos: string;
}

const testData: TestData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../TestData.json'), 'utf8'));


router.get('/getWords', async (req, res, next) => {
    try {
        const words: wordType[] = getRandomWords(10);
        res.json(words);
    } catch (e) {
        next(e);
    }
});


router.post('/getRanking', async (req, res, next) => {
    try {
        const score: number = req.body.score;
        const rank: number = calculateRank(score);
        res.json({rank: rank.toFixed(2)});
    } catch (e) {
        next(e)
    }
});


const getRandomWords = (count: number): wordType[] => {
    const adjectives: wordType[] = [];
    const nouns: wordType[] = [];
    const adverbs: wordType[] = [];
    const verbs: wordType[] = [];
    testData.wordList.map(word => {
        switch (word.pos) {
            case "adjective":
                adjectives.push(word)
                break;
            case "adverb":
                adverbs.push(word)
                break;
            case "noun":
                nouns.push(word)
                break;
            case "verb":
                verbs.push(word)
                break;

        }
    });

    let shuffledWords: wordType[] = [];
    shuffledWords = [...shuffle(adjectives).slice(0, 3), ...shuffledWords]
    shuffledWords = [...shuffle(adverbs).slice(0, 3), ...shuffledWords]
    shuffledWords = [...shuffle(nouns).slice(0, 3), ...shuffledWords]
    shuffledWords = [...shuffle(verbs).slice(0, 3), ...shuffledWords]

    return shuffle(shuffledWords).slice(0, count);
};

const calculateRank = (score: number): number => {
    const belowScores: number[] = testData.scoresList.filter((s) => s < score);
    const rank: number = (belowScores.length / testData.scoresList.length) * 100;
    return rank;
};

const shuffle = (array: any[]): any[] => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

module.exports = new BaseController('/', 'public', router);
