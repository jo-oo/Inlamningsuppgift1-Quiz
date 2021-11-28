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
//---------------------------------//
console.log("shufflade studenter :", randomStudents);//visar hela "nya" arrayen med shufflade studenter

//----SHUFFLE--4--OBJECTS/STUDENTS-ARRAY----
//skapar ny array av 4 studenter(från index 0,1,2,3). Visas bara 1a gången på sidan, innan click-eventet
let alternatives = randomStudents.slice(0, 4);
console.log(alternatives); //skriver ut 4 SHUFFLADE studenter i ordningen 0-4, dvs 0 är rätt och ligger först i knapparna
shuffleArrayOfStudents(alternatives); //-shufflar 4 namnen / knapparna i hur de VISAR så de visas på olika platser första gången. 


//----REDIGERAR INNER_HTML för ALRTERNATIVES (4 BUTTONS)----
//Loppar över min alternative-array med 4 studenter: för varje loop skapas en knapp med varje alternatives/students namn på. = 4 knappar skapas
function displayButtons(alt) {
    alternativesEl.innerHTML=""; //empty before loop
    alt.forEach(element => {
        alternativesEl.innerHTML += `
        <button name="${element.name}">${element.name}</button>
        `
    });
  }
  displayButtons(alternatives); //visar 4 knappar i random ordning

//------REDIGERAR INNER-HTML för IMAGES--------//
imageContainerEl.innerHTML = `
<img src='${randomStudents[0].image}' class="img-fluid"></img>	
`//shows random image currently at index 0 from randomStudents-array


//creates new question with new image and adds 4 new buttons through the displayButtons-function
const newQuestion = () =>{
    shuffleArrayOfStudents(randomStudents);//shuffles students
    
    while(randomStudents[0].hasOccured){
        shuffleArrayOfStudents(randomStudents);
    }
    

    imageContainerEl.innerHTML = `
    <img src='${randomStudents[0].image}' class="img-fluid"></img>	
    `
    randomStudents[0].hasOccured=true;
    console.log(randomStudents);
    //creates list of 4 alternatives to equal randomStudent att index 0-3. Button [0] is same as image [0] and so on
    alternatives = randomStudents.slice(0, 4);
    //shuffle the alternatives-array so the placement is random
    shuffleArrayOfStudents(alternatives);
    //calls the function that creates 4 new buttons
    displayButtons(alternatives);
}


//-----COUNTER -----
let correctAnswers = 0; //amount of correct answers user has
let totalScore = 0; //max amount of questions
let highScore = 0; //highscore is 0 at first
let continueGame = true;
//------------------------------------------------


//Highscore-function
const newHighscore = () =>{
    //new high score?
      if (correctAnswers > highScore) {
          highScore = correctAnswers;
          console.log("YAY new High SCORE! High score is now " + highScore);
      } else {
          console.log("Sorry, no new highscore. Your current highscore is " + highScore);
      }
  }
    /*  else {
      highScore = totalScore;
  }*/


//List showed att end with users results
let results = [] 

function displayResult(results) {
    //filters not corrct answers
    let notCorrectAnswers = results.filter(result => !result.correctAnswers );

    let correctAnswers = results.filter(result => result.correctAnswers);
    //Show wrong results with image and name
        if (notCorrectAnswers.length != 0){
            resultsEl.innerHTML += '<h2>You need to practice these:</h2><br/>'
        }
   
            notCorrectAnswers.forEach(element => {
                resultsEl.innerHTML += `
                <img src='${element.image}' class="img-fluid"></img> <p> You guessed : ${element.youGuessed} <br/> Correct answer was: ${element.correct}</p>
               `
            });

        //shows right result in text
    if (correctAnswers.length != 0){
        correctResultsEl.innerHTML += '<h2>You know these ones:</h2><br/>'
    }
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
           
            //if user clicks "Play again-button"-> 
           if(e.target.getAttribute("type") === "playagain"){
                totalScore = 0; 
                results.length = 0; // resets results-array.
                //empties div´s
                scoreEl.innerHTML = ""; 
                messageEl.innerHTML = ""; 
                correctResultsEl.innerHTML = "";
                resultsEl.innerHTML = "";
                //sets random students propertu "hasOccured" to be false again
                const randomStudents = students.map(student => {
                    student.hasOccured=false; 
                    return student;
                });
            }

            //if clicked name equals RandomStudents[0] name, name is correct. I& innehållet i diven som håller img ändras till att visa ny bild på random student image)
            if (clickedButton == randomStudents[0].name) { 
                correctAnswers++;
                totalScore++;
                scoreEl.innerHTML = `
                <p>Score: ${correctAnswers} / ${totalScore}</p>	
                `
                messageEl.innerHTML = `
                <p>Right name! You guessed: ${clickedButton}</p>
                `
                let thisResult = {youGuessed: clickedButton, correct: randomStudents[0].name, image:randomStudents[0].image, correctAnswers: true}
                results.push(thisResult);
                console.log(results);
            }   
            
            else if (clickedButton == randomStudents[1].name ||       clickedButton == randomStudents[2].name || clickedButton == randomStudents[3].name){
                totalScore++;
               // totalScore = totalScore + correctAnswers;
                console.log("Total score is: ", totalScore);
                scoreEl.innerHTML = `
                <p>Score: ${correctAnswers} / ${totalScore}</p>	
                `
                //UPPDTAERAR VAD MAN GISSAT PÅ
                messageEl.innerHTML = `
                <p>Wrong name! <br/> You guessed: ${clickedButton}. <br/>  Right name was: ${randomStudents[0].name}  </p>
                `      
                let thisResult = {youGuessed: clickedButton, correct: randomStudents[0].name, image:randomStudents[0].image, correctAnswers: false}
                results.push(thisResult);
                console.log(results);
            }  
            
            //prevents new image and buttons to appear after last round is played
            if(totalScore <= 3){
                newQuestion();
            }
         
            //sets game to equal 3 rounds
            if(totalScore === 3){
                newHighscore(); //checks if new Highscore
                messageEl.innerHTML = `<p>You got ${correctAnswers} right out of ${totalScore} </br>Your HIGHSCORE is ${highScore}</p> 
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