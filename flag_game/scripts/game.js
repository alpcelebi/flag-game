let questions_flag = ["turkey", "canada", "brazil", "ukraine", "argentina", "austria", "denmark", "england", "france", "germany", "india", "iran", "mexico"];
let choice_flag = ["turkey", "canada", "brazil", "ukraine", "argentina", "austria", "denmark", "england", "france", "germany", "india", "iran", "mexico"];
let flag_img = document.getElementById("flag");
let c_buttons = [
    document.getElementById("choise1"),
    document.getElementById("choise2"),
    document.getElementById("choise3"),
    document.getElementById("choise4")
];
let current_question_index = -1;
let choices_disabled = false;
let point = 0;
let questions_answered = 0;

const flagPoints = {
    "turkey": 1,
    "canada": 3,
    "brazil": 2,
    "ukraine": 2,
    "argentina": 3,
    "austria": 4,
    "denmark": 3,
    "england": 2,
    "france": 2,
    "germany": 2,
    "india": 3,
    "iran": 3,
    "mexico": 4,
};

function initializeGame() {
    current_question_index = -1;
    choices_disabled = false;
    point = 0;
    questions_answered = 0;
    document.getElementById("point").innerHTML = "Score: " + point;
    nextQuestion();
}

function nextQuestion() {
    if (questions_answered >= questions_flag.length) {
        endGame();
        return;
    }

    current_question_index++;
    if (current_question_index >= questions_flag.length) {
        current_question_index = 0;
    }

    let choiceIndexes = [];

    while (choiceIndexes.length < 4) {
        let randomIndex = Math.trunc(Math.random() * choice_flag.length);
        if (!choiceIndexes.includes(randomIndex)) {
            choiceIndexes.push(randomIndex);
        }
    }

    let rightAnswerIndex = Math.trunc(Math.random() * 4);
    let rightAnswer = choice_flag[choiceIndexes[rightAnswerIndex]];
    flag_img.src = "/images/" + rightAnswer + ".png";

    let choices = [rightAnswer];
    for (let i = 0; i < 4; i++) {
        if (i !== rightAnswerIndex) {
            choices.push(choice_flag[choiceIndexes[i]]);
        }
    }
    choices = shuffle(choices);

    for (let i = 0; i < c_buttons.length; i++) {
        c_buttons[i].innerHTML = choices[i];
        c_buttons[i].style.backgroundColor = "";
    }

    document.getElementById("next_button").style.display = "none";
    enableChoices();
    questions_answered++;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

document.getElementById("next_button").addEventListener("click", function() {
    nextQuestion();
});

for (let i = 0; i < c_buttons.length; i++) {
    c_buttons[i].addEventListener("click", function() {
        if (!choices_disabled) {
            selectChoice(c_buttons[i]);
        }
    });
}

function selectChoice(button) {
    let choiceText = button.innerHTML;
    let imgLink = flag_img.src;
    let choiceLink = "http://127.0.0.1:5500/images/" + choiceText + ".png";

    if (choiceLink === imgLink) {
        window.alert("Correct answer");
        button.style.backgroundColor = "green";
        document.getElementById("next_button").style.display = "block";
        disableChoices();
        point += flagPoints[choiceText];
        document.getElementById("point").innerHTML = "Score: " + point;
    } else {
        window.alert("Wrong answer");
        endGame();
    }
}

function disableChoices() {
    choices_disabled = true;
}

function enableChoices() {
    choices_disabled = false;
}

function endGame() {
    document.body.innerHTML = "<h1 style='color: white;'> Game Over </h1><p style='color: white;'>Your Score: " + point + "</p>";
}

function initializeElements() {
    flag_img = document.getElementById("flag");
    c_buttons = [
        document.getElementById("choise1"),
        document.getElementById("choise2"),
        document.getElementById("choise3"),
        document.getElementById("choise4")
    ];
    document.getElementById("next_button").addEventListener("click", function() {
        nextQuestion();
    });
    for (let i = 0; i < c_buttons.length; i++) {
        c_buttons[i].addEventListener("click", function() {
            if (!choices_disabled) {
                selectChoice(c_buttons[i]);
            }
        }); 
    } 
    
}

initializeGame();
