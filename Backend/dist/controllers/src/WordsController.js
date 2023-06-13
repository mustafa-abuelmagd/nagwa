"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs = __importStar(require("fs"));
const index_1 = require("../index");
const path = __importStar(require("path"));
const router = express_1.default.Router();
const testData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../TestData.json'), 'utf8'));
router.get('/getWords', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const words = getRandomWords(10);
        res.json(words);
    }
    catch (e) {
        next(e);
    }
}));
router.post('/getRanking', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const score = req.body.score;
        const rank = calculateRank(score);
        res.json({ rank: rank.toFixed(2) });
    }
    catch (e) {
        next(e);
    }
}));
const getRandomWords = (count) => {
    const adjectives = [];
    const nouns = [];
    const adverbs = [];
    const verbs = [];
    testData.wordList.map(word => {
        switch (word.pos) {
            case "adjective":
                adjectives.push(word);
                break;
            case "adverb":
                adverbs.push(word);
                break;
            case "noun":
                nouns.push(word);
                break;
            case "verb":
                verbs.push(word);
                break;
        }
    });
    let shuffledWords = [];
    shuffledWords = [...shuffle(adjectives).slice(0, 3), ...shuffledWords];
    shuffledWords = [...shuffle(adverbs).slice(0, 3), ...shuffledWords];
    shuffledWords = [...shuffle(nouns).slice(0, 3), ...shuffledWords];
    shuffledWords = [...shuffle(verbs).slice(0, 3), ...shuffledWords];
    return shuffle(shuffledWords).slice(0, count);
};
const calculateRank = (score) => {
    const belowScores = testData.scoresList.filter((s) => s < score);
    const rank = (belowScores.length / testData.scoresList.length) * 100;
    return rank;
};
const shuffle = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};
module.exports = new index_1.BaseController('/', 'public', router);
