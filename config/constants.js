export const APP_HEADLINE = 'Choose a deck to start the Quiz!'
export const START_QUIZ = 'Start Quiz'
export const EXIT_QUIZ = 'Leave Quiz'
export const ADD_QUESTION = 'Add Question'
export const CAROUSEL_HEIGHT = 420
export const RIGHT_ANSWER = 'Yupi! You are right! Excelent job!'
export const WRONG_ANSWER = (userAnswer, systemAnswer) => 
  `Ops! You're wrong :(, You've answered ${userAnswer} and the correct answer is: ${systemAnswer}`
export const FINISH_QUIZ = (score, quizSize) => {
  const formatedScore = score > 0 ? ((score / (quizSize + 1) * 100)).toFixed(2) : 0
  return `You've finished the quiz and have an accuracy around ${formatedScore}% !!`
}
export const SEED_CARDS = [
    {
      UID: 0,
      name: "Sea Animals",
      image: 'http://www.oceancare.org/wp-content/uploads/2017/07/GreenTurtle_SteveBloomImages-_AlamyStockPhoto.jpg',
      questions: [
        {
          question: 'What is the largest fish in the world?',
          answer: 'Whale Shark'
        },
        {
          question: 'Why I was wrong?',
          answer: 'Blue Whale is not a fish'
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
          answer: '2.000 kg'
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
          answer: 'yes'
        },
        {
          question: 'Do you like dogs?',
          answer: 'yes'
        },
        {
          question: 'Do you like puppies?',
          answer: 'yes'
        },
      ]
    }
  ]
