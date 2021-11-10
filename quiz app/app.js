function Question(text,choice,answer){
    this.text = text;
    this.choice = choice;
    this.answer = answer;
}
// Question prototype
Question.prototype.checkAnswer = function(answer){
        return this.answer === answer;
}

// Quiz constructor
function Quiz(questions){
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0;
}
// Quiz prototypes
Quiz.prototype.getQuestion = function(){
    return this.questions[this.questionIndex];
}

// Check if quiz is finished
Quiz.prototype.isFinish = function(){
    return this.questions.length === this.questionIndex; 
}

// Guessing the answer
Quiz.prototype.guess = function(answer){
    var question = this.getQuestion();

    if(question.checkAnswer(answer)){
        this.score++;
    }
    this.questionIndex++;
}

//Showing the score
function showScore(){
    var html = `<h2>Score</h2><h4>${quiz.score}</h4>`;

    document.querySelector('.card-body').innerHTML = html;
}

function guess(id,guess){
    var btn = document.getElementById(id);
    btn.onclick = function(){
        quiz.guess(guess);
        loadQuestion();
    }
}

// Showing the progress
function showProgress(){
    var totalQuestion = quiz.questions.length;
    var questionNumber = quiz.questionIndex+1;
    var html = 'Question '+ questionNumber + ' of ' + totalQuestion;

    if(totalQuestion === questionNumber){
        document.querySelector('#progress').innerHTML = "Quiz is Ended";
    }else{
        document.querySelector('#progress').innerHTML = html;
    }
}

var q1 = new Question("Which is the best?", ["Javascript","Python"], "Python");
var q2 = new Question("Which is the best now?", ["Javascript","Python"], "Python");
var q3 = new Question("Which is the best now, huh?", ["Javascript","Python"], "Python");
var questions = [q1,q2,q3];

// Starting the quiz
var quiz = new Quiz(questions);
loadQuestion();

function loadQuestion(){
    if(quiz.isFinish()){
        showScore();
    }else{
        var question = quiz.getQuestion();
        var choices = question.choice;

        document.querySelector('#question').textContent = question.text;

        for(var i=0; i<choices.length; i++){
            var element = document.querySelector('#choice'+i);
            element.innerHTML = choices[i];
            guess('btn'+i, choices[i]);
        }
        showProgress();
    }
}