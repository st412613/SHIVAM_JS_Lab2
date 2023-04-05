function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;

}
Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;

}
let questions = [
    new Question("Javascript support", ["Function", "HTML", "XHML", "CSS"], "Function"),
    new Question("Which Language is used for styling web pages", ["JQuery", "HTML", "XHML", "CSS"], "CSS"),
    new Question("Which is not Javascript Framework ?", ["python script", "Django", "JQuery", "NodeJs"], "Django"),
    new Question("Which is used to connect DB", ["PHP", "HTML", "JS", "ALL"], "PHP"),
    new Question("Javascript is a", ["Scripting Language", "Programming Language", "DEvelopment", "All"], "Scripting Language")
];

function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;


}

Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
}
Quiz.prototype.getQuestionByIndex = function () {
    return this.questions[this.questionIndex];
}
Quiz.prototype.checkOptionWithAnswer = function(answer){
    if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
};

let quiz = new Quiz(questions);
function loadQuestion() {
    if (quiz.isEnded()) {
        showscores();
    } else {
        let element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionByIndex().text;
        var choices = quiz.getQuestionByIndex().choices;
        for (i = 0; i < choices.length; i++) {
            var elem = document.getElementById("choice" + i);
            elem.innerHTML = choices[i];

            //Add Listner to the button
            handleOptionButton("btn"+i, choices[i])
        }
        showProgress();
    }
}
function showscores() {
    var quizOverHtml = "<h1>Result</h1>";
    quizOverHtml += "<h2 id='scores'>Your Scores: " + quiz.score + ",and Mark Percentage is : " + (quiz.score/quiz.questions.length*100) +" %" + "</h2>"
    var ele=document.getElementById("quiz");
        ele.innerHTML=quizOverHtml;
}

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var elemen = document.getElementById("progress");
    elemen.innerHTML = "Question " + currentQuestionNumber + "of " + quiz.questions.length

}
function handleOptionButton(id,choice) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.checkOptionWithAnswer(choice);
        loadQuestion();
    }

}

loadQuestion();