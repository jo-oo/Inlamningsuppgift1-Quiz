//get elements from DOM
let mainDivEl = document.getElementById('main-div');
let imageContainerEl = document.getElementById('image-container');
let alternativesEl = document.getElementById('alternatives');
let messageEl = document.getElementById('message');
let scoreEl = document.getElementById('score');
let resultsEl = document.getElementById('results');
let correctResultsEl = document.getElementById('correctResults');

//map new array with one added property named "hasOccured"
const randomStudents = students.map(student => {
    student.hasOccured=false; 
    return student;
});

//Shuffle-function: Fisher-Yates algorith
const shuffleArrayOfStudents = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}
shuffleArrayOfStudents(randomStudents); //shuffles randomStudents array
console.log("Shuffled student is: ", randomStudents[0]);//visar bara en student. en slumpad student
randomStudents[0].hasOccured=true;

//Creates new array of 4 students (from index 0-3) of the shuffled students array
let alternatives = randomStudents.slice(0, 4);
//shuffles the 4 students in the new short array of 4 students
shuffleArrayOfStudents(alternatives);

/*function: print content to 4 buttons by iterating through the array of shuffled 4 students. Prints 4 names: 1 name on each button*/
function displayButtons(alt) {
    alternativesEl.innerHTML=""; //empty before loop
    alt.forEach(element => {
        alternativesEl.innerHTML += `
        <button name="${element.name}">${element.name}</button>
        `
    });
  }
//calls the function and 4 buttons are created
displayButtons(alternatives);

//sets the imageContainer in html to contain image of random student currently at index 0 at randomStudents-array
imageContainerEl.innerHTML = `
<img src='${randomStudents[0].image}' class="img-fluid"></img>	
`

//function that creates new question with new image and adds 4 new buttons through the displayButtons-function
const newQuestion = () =>{
    shuffleArrayOfStudents(randomStudents);
    //while random student at position 0 has already occured in the game: a new shuffle is made of the list
    while(randomStudents[0].hasOccured){
        shuffleArrayOfStudents(randomStudents);
    }
    //sets the image-container to contain image of random student at index 0
    imageContainerEl.innerHTML = `
    <img src='${randomStudents[0].image}' class="img-fluid"></img>	
    `
    //sets that student to now have occured in the game
    randomStudents[0].hasOccured=true; 
    //creates new list of 4 shuffled students from index position 0-3 of randomStudents-array
    alternatives = randomStudents.slice(0, 4);
    //shuffle the alternatives-array so the placement will be random when creating the buttons
    shuffleArrayOfStudents(alternatives);
    //calls the function that creates 4 new buttons
    displayButtons(alternatives);
}

//sets variables for score
let correctAnswers = 0; //amount of correct answers user has
let totalScore = 0; //max amount of questions
let highScore = 0; //highscore is 0 at first
let continueGame = true;

//High Score-function
const newHighscore = () => {
    if (correctAnswers > highScore) {
          highScore = correctAnswers;
    } 
}

//List showed att end with users results
let results = [] 

//function to display result list when game is finished
function displayResult(results) {
    //filters out users answers that are not correct
    let notCorrectAnswers = results.filter(result => !result.correctAnswers);
    //filters out users answers that are correct
    let correctAnswers = results.filter(result => result.correctAnswers);
    //sets headline to list of students user guessed wrong, if there is any.
    if (notCorrectAnswers.length != 0){
        resultsEl.innerHTML += '<h2>You need to practice these:</h2><br/>'
    }
        //Shows list of students user guessed wrong (img and name)Also showing the name of the student user guessed on for each question
        notCorrectAnswers.forEach(element => {
        resultsEl.innerHTML += `
        <img src='${element.image}' class="img-fluid"></img> <p> You guessed : ${element.youGuessed} <br/> Correct answer was: ${element.correct}</p>
        `
    });
    //sets headline to list of students user guessed right, if there is any.
    if (correctAnswers.length != 0){
        correctResultsEl.innerHTML += '<h2>You know these ones:</h2><br/>'
    }
        //Shows list of students user guessed right, by name   
        correctAnswers.forEach(element => {
            correctResultsEl.innerHTML += `
            <p>${element.youGuessed}</p>
            `
        });
}   

//adds EventListener for click-events
addEventListener('click', e => {
    //prevents default page reload
	e.preventDefault();
        //if user clicked a button - get attribute "name" and save in "clickedButton"    
	    if (e.target.tagName === "BUTTON") {
            let clickedButton = e.target.getAttribute('name');
            //if user clicks "Play again-button"
           if(e.target.getAttribute("type") === "playagain"){
                totalScore = 0; 
                results.length = 0;
                scoreEl.innerHTML = ""; 
                messageEl.innerHTML = ""; 
                correctResultsEl.innerHTML = "";
                resultsEl.innerHTML = "";
                //sets random students property "hasOccured" to be false
                const randomStudents = students.map(student => {
                    student.hasOccured=false; 
                    return student;
                });
            }
            //if clicked name equals RandomStudents[0] name, name is correct.
            if (clickedButton == randomStudents[0].name) { 
                correctAnswers++; //users score is updated
                totalScore++; //updates rounds played
                scoreEl.innerHTML = `
                <p>Score: ${correctAnswers} / ${totalScore}</p>	
                `
                messageEl.innerHTML = `
                <p>Right name! You guessed: ${clickedButton}</p>
                `
                //creates object with properties youGuessed, correct, image and correctAnswers
                let thisResult = {youGuessed: clickedButton, correct: randomStudents[0].name, image:randomStudents[0].image, correctAnswers: true}
                results.push(thisResult);
            }   
            //if user clickss on button with any of the other 3 students name:
            else if (clickedButton == randomStudents[1].name ||       clickedButton == randomStudents[2].name || clickedButton == randomStudents[3].name){
                totalScore++; //updates rounds played
                scoreEl.innerHTML = `
                <p>Score: ${correctAnswers} / ${totalScore}</p>	
                `
                messageEl.innerHTML = `
                <p>Wrong name!<br/>You guessed: ${clickedButton}.<br/>  Right name was: ${randomStudents[0].name}</p>
                `
                //creates object with properties youGuessed, correct, image and correctAnswers      
                let thisResult = {youGuessed: clickedButton, correct: randomStudents[0].name, image:randomStudents[0].image, correctAnswers: false}
                results.push(thisResult);
                console.log(results);
            }  
            //prevents new image and buttons to appear after last round is played
            if(totalScore <= 10){
                newQuestion();
            }
            //sets game to equal 10 rounds
            if(totalScore === 10){
                //checks if new high score
                newHighscore(); 
                messageEl.innerHTML = `<p>You got ${correctAnswers} right out of ${totalScore}</br>Your highscore is ${highScore}</p> 
                <button type="playagain">Play again</button>
                ` 
                correctAnswers = 0;
                imageContainerEl.innerHTML = "";
                alternativesEl.innerHTML = "";
                displayResult(results);
            }
        } else {
            alert("You can´t win if you don´t try");
        } 
}); 