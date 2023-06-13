# JavaScript Developer Task

## Task Description
In the English language, words can be categorized according to their syntactic functions, which is known as "Part of Speech". Your task is to create an interactive activity using React.js, Node.js, and Express.js that helps students practice categorizing a set of words based on their part of speech. The activity should follow the requirements mentioned below and use the testing data provided in the attached JSON file (`TestData.json`).

## Requirements
The project should include both a server-side app using Express.js and a client-side app using React.js. Here are the specific requirements for each component:

### Express App (Server-side)
1. **Words Endpoint**: Provide an endpoint that returns a list of 10 objects selected randomly from the "wordsList" (check `wordsList` in `TestData.json`). The array should include at least 1 adjective, 1 adverb, 1 noun, and 1 verb.

2. **Rank Endpoint**: Provide an endpoint that accepts the final score in the request body and responds with the rank percentage rounded to the nearest hundredth. The rank represents the percentage of scores (check `scoresList` in `TestData.json`) below the given final score. Use the following formula to calculate the rank:

    - Score: 90 => Rank: 80
      Explanation: There are 24 scores out of 30 in the `scoresList` which are below 90. This is 80% of the `scoresList`, so the rank will be 80%. (check `scoresList` in `TestData.json`)
    - Score: 60 => Rank: 56.67
    - Score: 50 => Rank: 40
    - Score: 30 => Rank: 26.67

### React App (Client-side)
The React app should include the following features:

- **Practice Screen**: Fetch the words list from the "words" endpoint. Show the student one word at a time and provide four buttons representing the options of part of speech (noun, adverb, adjective, or verb). After an option is selected, provide feedback to the student regarding the correctness of their answer without revealing the correct answer for an incorrect selection. Include a progress bar that shows the student's progress in percentage, calculated as follows: (number of answered questions / total number of questions) * 100.

- **Rank Screen**: This screen is displayed after the user answers the final question. Send a POST request to the "rank" endpoint to get the student's rank based on their score percentage provided in the request body. The score is calculated as follows: (number of correct answers / total number of questions) * 100. Show the student their rank across their peers (not their score) when they reach a progress of 100% (finish the activity). Include a "Try Again" button that enables the student to repeat the activity.

#### Bonus
- Use TypeScript for your implementation.
- Add any extra feature(s) that you think might improve the activity.

## Important Notes
- Code readability is a must. Write comments to explain your code.
- Follow a clean code structure.
- Apply code reuse. Avoid duplicating code (DRY clean code concept).

## Task Submission
- Publish your solution to a public repository on GitHub and share the link with us.
- The repository should have two folders, one for the server-side app and one for the client-side app.
- Include a detailed `README.md` file in the repository explaining how to run, use, and test the app.
