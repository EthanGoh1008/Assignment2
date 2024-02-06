/*//creating an array and passing the number, questions, options and answers
let questions = [
  {
    numb: 1,
    question: "What does HTML stand for?",
    answer: "Hyper Text Markup Language",
    options: [
      "Hyper Text PreProcessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language",
    ],
  },
  {
    numb: 2,
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheet",
    options: [
      "Common Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet",
    ],
  },
  {
    numb: 3,
    question: "What does PHP stand for?",
    answer: "Hypertext Preprocessor",
    options: [
      "Hypertext Preprocessor",
      "Hypertext Programming",
      "Hypertext Preprogramming",
      "Hometext Preprocessor",
    ],
  },
  {
    numb: 4,
    question: "What does SQL stand for?",
    answer: "Structured Query Language",
    options: [
      "Stylish Question Language",
      "Stylesheet Query Language",
      "Statement Question Language",
      "Structured Query Language",
    ],
  },
  {
    numb: 5,
    question: "What does XML stand for?",
    answer: "eXtensible Markup Language",
    options: [
      "eXtensible Markup Language",
      "eXecutable Multiple Language",
      "eXTra Multi-Program Language",
      "eXamine Multiple Language",
    ],
  },
];*/

function Quizfetch() {
  const clickedQuestion = localStorage.getItem("clickedQuestion");

  const apiEndpoint =
    'https://airriflequiz-c324.restdb.io/rest/thequiz?q={"quizname":"' +
    clickedQuestion +
    '"}&sort=questionnumber';
  const apiKey = "65bf879d7627eca1ac31a764";

  // Using fetch to get data from the API with headers
  fetch(apiEndpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": apiKey,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Iterate through each record in the API response
      data.forEach((questionRecord) => {
        // Assuming the API response structure is an object with fields numb, question, answer, and options
        let questionData = {
          numb: questionRecord.questionnumber,
          question: questionRecord.question,
          answer: questionRecord.answer,
          options: questionRecord.options.split(";"),
        };

        // Push the question data to the array
        questions.push(questionData);
      });

      // Now 'questions' array is populated with data from the API
      console.log(questions);

      // Store questions into local storage
      const questionsJson = JSON.stringify(questions);
      localStorage.setItem("quizQuestions", questionsJson);

      console.log("Questions stored in local storage.");
    })
    .catch((error) => console.error("Error fetching data from API:", error));
}
