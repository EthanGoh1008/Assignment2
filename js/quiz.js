
//getting all required elements 
const start_btn = document.querySelector(".start_btn button"); 
const info_box = document.querySelector(".info_box"); 
const exit_btn = info_box.querySelector(".buttons .quit"); 
const continue_btn = info_box.querySelector(".buttons .restart"); 
const quiz_box = document.querySelector(".quiz_box"); 
const timeCount = document.querySelector(".timer .timer_sec"); 
const timeLine = quiz_box.querySelector("header .time_line"); 
const timeOff = quiz_box.querySelector("header .time_text"); 
 
const option_list = document.querySelector(".option_list"); 
 
let questions = []; // Define questions globally 
 
// When an Image is clicked 
function showStartButton(clickedImage) { 
  var startBtnDiv = document.querySelector(".start_btn button"); 
  var images = document.querySelectorAll(".questionoptions img"); 
  var captions = document.querySelectorAll(".quiz-caption"); 
 
  // Hide footer section elements 
  var footerSection = document.querySelector(".footer"); 
  if (footerSection) { 
    footerSection.style.display = "none"; 
  } 
 
  // Hide .icon elements with the class .fa 
  var iconFaElements = document.querySelectorAll(".icons .fa"); 
  iconFaElements.forEach(function (icon) { 
    icon.style.display = "none"; 
  }); 
 
  // Hide quiz-header section 
  var quizHeaderSection = document.querySelector(".quiz-header"); 
  if (quizHeaderSection) { 
    quizHeaderSection.style.display = "none"; 
  } 
 
  // Hide all images and captions 
  images.forEach(function (image) { 
    image.style.display = "none"; 
  }); 
 
  captions.forEach(function (caption) { 
    caption.style.display = "none"; 
  }); 
 
  startBtnDiv.style.display = "block"; 
 
  // Log the question that was clicked 
  var clickedQuestion = clickedImage.getAttribute("alt"); 
  console.log("Clicked Question: " + clickedQuestion); 
 
  // Store clicked question in local storage 
  localStorage.setItem("clickedQuestion", clickedQuestion); 
 
  Quizfetch(); 
} 
 
//If start Quiz Button Clicked 
start_btn.onclick = () => { 
  info_box.classList.add("activeInfo"); //show the info box 
}; 
 
//If Exit Button Clicked 
exit_btn.onclick = () => { 
  info_box.classList.remove("activeInfo"); //hide the info box 
}; 
 
//If Continue Button Clicked 
continue_btn.onclick = () => { 
  info_box.classList.remove("activeInfo"); //hide the info box 
  quiz_box.classList.add("activeQuiz"); //Show the quiz box 
  showQuestions(0); 
  queCounter(1); 
  startTimer(15); 
  startTimerLine(0); 
}; 
 
let que_count = 0; 
let que_numb = 1; 
let counter; 
let counterLine; 
let timeValue = 15; 
let widthValue = 0; 
let userScore = 0; 
 
const next_btn = quiz_box.querySelector(".next_btn"); 
const result_box = document.querySelector(".result_box"); 
const restart_quiz = result_box.querySelector(".buttons .restart"); 
const quit_quiz = result_box.querySelector(".buttons .quit"); 
 
restart_quiz.onclick = () => { 
  quiz_box.classList.add("activeQuiz"); 
  result_box.classList.remove("activeResult"); 
  que_count = 0; 
  que_numb = 1; 
  timeValue = 15; 
  widthValue = 0; 
  userScore = 0; 
  showQuestions(que_count); 
  queCounter(que_numb); 
  clearInterval(counter); 
  clearInterval(counterLine); 
  startTimer(timeValue); 
  startTimerLine(widthValue); 
  next_btn.style.display = "none"; 
  timeOff.textContent = "Time Left"; 
}; 
 
quit_quiz.onclick = () => { 
  showLoading(); // Call the function to show loading 
  setTimeout(() => { 
    redirectToLeaderboard(); 
    hideLoading(); // Call the function to hide loading after 3 seconds 
  }, 3000); // 3000 milliseconds = 3 seconds 
}; 
 
function showLoading() { 
  const loading = document.getElementById("loading"); 
  loading.style.display = "block"; 
} 
 
function hideLoading() { 
  const loading = document.getElementById("loading"); 
  loading.style.display = "none"; 
} 
 
// Function to redirect to the leaderboard page 
function redirectToLeaderboard() { 
  window.location.href = "leaderboard.html"; 
} 
 
//If Next Button is Clicked 
next_btn.onclick = () => { 
  if (que_count < questions.length - 1) {


que_count++; 
    que_numb++; 
    showQuestions(que_count); 
    queCounter(que_numb); 
    clearInterval(counter); 
    clearInterval(counterLine); 
    startTimer(timeValue); 
    startTimerLine(widthValue); 
    next_btn.style.display = "none"; 
    timeOff.textContent = "Time Left"; 
  } else { 
    clearInterval(counter); 
    console.log("Questions completed"); 
    showResultBox(); 
  } 
}; 
 
//getting questions and options for array 
function showQuestions(index) { 
  const que_text = document.querySelector(".que_text"); 
  let que_tag = 
    "<span>" + 
    questions[index].numb + 
    ". " + 
    questions[index].question + 
    "</span>"; 
  let option_tag = 
    '<div class="option">' + 
    questions[index].options[0] + 
    "<span></span></div>" + 
    '<div class="option">' + 
    questions[index].options[1] + 
    "<span></span></div>" + 
    '<div class="option">' + 
    questions[index].options[2] + 
    "<span></span></div>" + 
    '<div class="option">' + 
    questions[index].options[3] + 
    "<span></span></div>"; 
  que_text.innerHTML = que_tag; 
  option_list.innerHTML = option_tag; 
  const option = option_list.querySelectorAll(".option"); 
  for (let i = 0; i < option.length; i++) { 
    option[i].setAttribute("onclick", "optionSelected(this)"); 
  } 
} 
 
let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>'; 
let crossIcon = '<div class="icon tick"><i class="fas fa-times"></i></div>'; 
 
function optionSelected(answer) { 
  clearInterval(counter); 
  clearInterval(counterLine); 
  let userAns = answer.textContent; 
  let correctAns = questions[que_count].answer; 
  let allOptions = option_list.children.length; 
  if (userAns == correctAns) { 
    userScore += 1; 
    console.log(userScore); 
    answer.classList.add("correct"); 
    console.log("Answer is Correct"); 
    answer.insertAdjacentHTML("beforeend", tickIcon); 
  } else { 
    answer.classList.add("incorrect"); 
    console.log("Answer is Wrong"); 
    answer.insertAdjacentHTML("beforeend", crossIcon); 
 
    //if answers is incorrect the automatically select the correct answer 
    for (let i = 0; i < allOptions; i++) { 
      if (option_list.children[i].textContent == correctAns) { 
        option_list.children[i].setAttribute("class", "option correct"); 
        option_list.children[i].insertAdjacentHTML("beforeend", tickIcon); 
      } 
    } 
  } 
 
  //once user selectes option, disable all options 
  for (let i = 0; i < allOptions; i++) { 
    option_list.children[i].classList.add("disabled"); 
  } 
  next_btn.style.display = "block"; 
} 
 
function showResultBox() { 
  info_box.classList.remove("activeInfo"); //hide the info box 
  quiz_box.classList.remove("activeQuiz"); //hide the quiz box 
  result_box.classList.add("activeResult"); //Show the result box 
  const scoreText = result_box.querySelector(".score_text"); 
  if (userScore > 3) { 
    let scoreTag = 
      "<span>and congrats! You got <p>" + 
      userScore + 
      "</p> out of <p>" + 
      questions.length + 
      "</p></span>"; 
    scoreText.innerHTML = scoreTag; 
  } else if (userScore > 1) { 
    let scoreTag = 
      "<span>and nice, You got <p>" + 
      userScore + 
      "</p> out of <p>" + 
      questions.length + 
      "</p></span>"; 
    scoreText.innerHTML = scoreTag; 
  } else { 
    let scoreTag = 
      "<span>and sorry, You got only <p>" + 
      userScore + 
      "</p> out of <p>" + 
      questions.length + 
      "</p></span>"; 
    scoreText.innerHTML = scoreTag; 
  } 
} 
 
function startTimer(time) { 
  counter = setInterval(timer, 1000); 
  function timer() { 
    timeCount.textContent = time; 
    time--; 
    if (time < 9) { 
      let addZero = timeCount.textContent; 
      timeCount.textContent = "0" + addZero; 
    } 
    if (time < 0) { 
      clearInterval(counter); 
      timeCount.textContent = "00"; 
      timeOff.textContent = "Time Off"; 
 
      let correctAns = questions[que_count].answer; 
      let allOptions = option_list.children.length; 
 
      for (let i = 0; i < allOptions; i++) {

if (option_list.children[i].textContent == correctAns) { 
          option_list.children[i].setAttribute("class", "option correct"); 
          option_list.children[i].insertAdjacentHTML("beforeend", tickIcon); 
        } 
      } 
 
      for (let i = 0; i < allOptions; i++) { 
        option_list.children[i].classList.add("disabled"); 
      } 
      next_btn.style.display = "block"; 
    } 
  } 
} 
 
function startTimerLine(time) { 
  counterLine = setInterval(timer, 29); 
  function timer() { 
    time += 1; 
    timeLine.style.width = time + "px"; 
    if (time > 549) { 
      clearInterval(counterLine); 
    } 
  } 
} 
 
function queCounter(index) { 
  const bottom_ques_counter = quiz_box.querySelector(".total_que"); 
  let totalQuesCountTag = 
    "<span><p>" + 
    index + 
    "</p>of<p>" + 
    questions.length + 
    "</p>Questions</span>"; 
  bottom_ques_counter.innerHTML = totalQuesCountTag; 
}