# JavaScript Developer Task

## Task Description
In the English language, words can be categorized according to their syntactic functions, which is known as "Part of Speech". This application creates an interactive activity using React.js, Node.js, and Express.js that helps students practice categorizing a set of words based on their part of speech. The repo provides the testing data in the attached JSON file (`TestData.json`).

### Installation

Clone the repository:
git clone git@github.com:mustafa-abuelmagd/nagwa.git


### Express App (Server-side)
1. **Words Endpoint**: An endpoint that returns a list of 10 objects selected randomly from the "wordsList" (check `wordsList` in `TestData.json`). The array should include at least 1 adjective, 1 adverb, 1 noun, and 1 verb.

2. **Rank Endpoint**: An endpoint that accepts the final score in the request body and responds with the rank percentage rounded to the nearest hundredth. The rank represents the percentage of scores (check `scoresList` in `TestData.json`) below the given final score. Use the following formula to calculate the rank:

    - Score: 90 => Rank: 80
      Explanation: There are 24 scores out of 30 in the `scoresList` which are below 90. This is 80% of the `scoresList`, so the rank will be 80%. (check `scoresList` in `TestData.json`)
    - Score: 60 => Rank: 56.67
    - Score: 50 => Rank: 40
    - Score: 30 => Rank: 26.67
## API Endpoints

The following API endpoints are available:
- `GET /getWords`: Retrieve list of length 10 of words.
- `POST /getRank`: Post score to get the ranking. Takes "score" as a number in the body

## Running App

Change Directory to Backend:
```
cd Backend
```
Install the required modules:
```
npm install
```

Build the project from the typescript code:
```
tsc
```

### Starting the Backend

To start the backend project, run the following command:
```
npm run start
```

The backend server will start running on the specified port, and you can access the API endpoints.

### React App (Client-side)
The React app should include the following features:

- **Practice Screen**: Fetches the words list from the "words" endpoint. Show the student one word at a time and provide four buttons representing the options of part of speech (noun, adverb, adjective, or verb). After an option is selected, provide feedback to the student regarding the correctness of their answer without revealing the correct answer for an incorrect selection. Include a progress bar that shows the student's progress in percentage, calculated as follows: (number of answered questions / total number of questions) * 100.

- **Rank Screen**: This screen is displayed after the user answers the final question. Sends a POST request to the "rank" endpoint to get the student's rank based on their score percentage provided in the request body. The score is calculated as follows: (number of correct answers / total number of questions) * 100. Show the student their rank across their peers (not their score) when they reach a progress of 100% (finish the activity). Include a "Try Again" button that enables the student to repeat the activity.

## Running App

Change Directory to Backend:
```
cd nagwa-react-app
```
Install the required modules:
```
npm install
```

### Starting the Frontend

To start the backend project, run the following command:
```
npm run dev
```


