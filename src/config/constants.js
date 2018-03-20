// Ordinary constants
export const ADD_QUESTION = 'Add Question'
export const APP_HEADLINE = 'Choose a deck to start the Quiz!'
export const DEFAULT_IMAGE = 'http://www.tv.appm.pt/wp-content/themes/invictus_3.3.2/images/dummy-image.jpg'
export const START_QUIZ = 'Start Quiz'
export const EXIT_QUIZ = 'Leave Quiz'
export const CAROUSEL_HEIGHT = 420
export const RIGHT_ANSWER = 'Yupi! You are right! Excelent job!'
/**
 * WRONG_ANSWER
 * Represents the message to say the user what is the expected answer
 * @return {String} - The message with right and wrong answer
 **/
export const WRONG_ANSWER = (userAnswer, systemAnswer) =>
  `Ops! You're wrong :(, You've answered ${userAnswer} and the correct answer is: ${systemAnswer}`
/**
 * FINISH_QUIZ
 * Calculates the percentage of score and send the user a message
 * @return {String} - The formated score with a message.
 **/
export const FINISH_QUIZ = (score, quizSize) => {
  const formatedScore = score > 0 ? ((score / (quizSize + 1) * 100)).toFixed(2) : 0
  return `You've finished the quiz and have an accuracy around ${formatedScore}% !!`
}
/**
 * SEED_CARS
 * The seed to initialize the app
 * @return {Array} - Seed cards.
 **/
export const SEED_CARDS = [
    {
      UID: 0,
      name: "Sea Animals",
      image: 'http://www.oceancare.org/wp-content/uploads/2017/07/GreenTurtle_SteveBloomImages-_AlamyStockPhoto.jpg',
      questions: [
        {
          question: 'What is the largest fish in the world?',
          rightAnswer: 'Whale Shark',
          answers: [
            'Whale Shark',
            'Jesus',
            'Judas'
          ]
        },
      ],
    },
    {
      UID: 1,
      name: "Safari Animals",
      image: 'https://oryza.com/sites/default/files/field/image/150519tanzania.jpg',
      questions: [
        {
          question: 'How much weight an elephant can reach?',
          rightAnswer: '2.00kg',
          answers: [
            '2.000 kg',
            '2.000 kg',
            '2.000 kg',
          ]
        },
      ],
    },
    {
      UID: 2,
      name: "Cute Animals",
      image: 'http://cuteoverload.wordpress.com/files/18289249_610ad8f362-3655-1.jpg',
      questions: [
        {
          question: 'Do you like cats?',
          rightAnswer: 'yes',
          answers: [
            'yes',
            'yes',
            'yes',
          ]
        },
        {
          question: 'Do you like dogs?',
          rightAnswer: 'yes',
          answers: [
            'yes',
            'yes',
            'yes',
          ]
        },
        {
          question: 'Do you like puppies?',
          rightAnswer: 'yes',
          answers: [
            'yes',
            'yes',
            'yes',
          ]
        },
      ]
    }
  ]
