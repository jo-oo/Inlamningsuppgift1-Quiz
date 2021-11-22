// hämtat diven #image-container. sparar den html-diven i en variabel i Js som heter imageContainerEl.
//samma med correct name-button & false-name-button som båda ligger i varsin div i html:en. 
let imageContainerEl = document.getElementById('image-container');
let correctNameButtonEl = document.getElementById('correct-name');
let falseName1ButtonEl = document.getElementById('false-name-1');


//EVENTLISTENER: "lyssnar" efter att anv. klickar på hemsidan
addEventListener('click', e => {
    //förhindrar att sidan laddas om (vilket är default-action för click-event)
	e.preventDefault();
	
    //kollar så anv. klickar på en knapp
    //om så: hämta attributet name & spara i "clickedButton"
	if (e.target.tagName === "BUTTON") {
        let clickedButton = e.target.getAttribute('name');
        //om attributet name (sparat i "clickedButton") är samma som random student namn= namnet är rätt & innehållet i diven som håller img ändras till att visa ny bild på random student image)
        if (clickedButton == randomStudents[0].name) {
            alert("Right name!")
            shuffleArrayOfStudents(randomStudents);
            imageContainerEl.innerHTML = `
            <img src='${randomStudents[0].image}' class="img-fluid"></img>	
            `
            //även button med texten namn ändras till texten rätt namn
            correctNameButtonEl.innerHTML = `
            <button name="${randomStudents[0].name}">${randomStudents[0].name}</button>
            `
        }
        else {
            alert("Wrong name");
        }
	} else {
        alert("You clicked on something wierd");
    }
});


//-------New stuff 3 SHUFFLE OBJECTS------
//MAP. skapar ny array av bara studenterna. visas som varje person inuti den ursprungliga arrayen
const randomStudents = students.map(student => {
    return student;
});
console.log(randomStudents); //visar lista med studenterna i random ordning, precis som nedan, rad 57. Hm...

//----SHUFFLE-----Fisher-Yates algorith
const shuffleArrayOfStudents = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}
shuffleArrayOfStudents(randomStudents);
console.log("Shuffled student is: ", randomStudents[0]);//visar bara en student. en slumpad student
//---------------------------------//
console.log("shufflade studenter :", randomStudents);//visar hela "nya" arrayen med shufflade studenter


//------REDIGERAR INNER-HTML för IMAGES--------//
//redigerar vad som ska vara i diven och visas på hemsidan/som att redigera diven i index.html fast jag gör det här istället i Js. HÅRDKODA

//diven som håller bild. redigerar den här:
imageContainerEl.innerHTML = `
<img src='${randomStudents[0].image}' class="img-fluid"></img>	
`//visar den slumpade bilden currently at index 0 from images-array

//diven som håller knapp med rätt namn. redigerar den här:
//lägger till button med attribut som heter name och ger det värdet av studentens namn
//+sätter knappens text till studentens namn också 
correctNameButtonEl.innerHTML = `
<button name="${randomStudents[0].name}">${randomStudents[0].name}</button>
`
//redigerar "fel-namn-knappen". Sätter det namnet till random student 1:s namn
falseName1ButtonEl.innerHTML = `
<button name="${randomStudents[1].name}">${randomStudents[1].name}</button>
`


//-------New stuff SHUFFLE NAMES------
//MAP. skapar ny array av bara namnen. visas som varje persons namn inuti den ursprungliga arrayen
const names = students.map(student => {
    return student.name;
});
console.log(names);//visar lista med bara namnen

//----SHUFFLE-----Fisher-Yates algorith
//Loopar genom arrayen: tar ett random item och byter det till ett annat 
const shuffleArrayOfNames = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}
shuffleArrayOfNames(names);
    //console.log("Shuffled names: ", names.join("\n"));//visar hela "nya" arrayen med alla namm
    //console.log("Shuffled name is: ", names[0]);//visar bara ett namn. slumpat namn.








/*

//-----TEST FILTER OCH REDUCE-------

//TEST: FILTER: filtrerar ut namn längre än 18 tecken (mellansla ej inkluderat) ur den arrayen
const longNames = students.filter(student => {
    return student.name.length >18;
}).map(student => {
    return student.name;
});

console.log(longNames); //visar namnen över 18 tecken som hela objekt. 
//när vi lägger till MAP i funtionen visas istället bara namnen på dom över 8 tecken. 

//TEST: REDUCE. reduce down the array to a singular value. Tex: lägga ihop längden av alla namn 
//kommer köra igenom varje item i min array (varje person) och
const totalLongNames = students.reduce((total, student) => {
    return total + student.name.length;
}, 0); //börjar räkna på 0
///student=objektet student
//total=respresenterar nuvarande värde när vi loppar genom varje person. placeholder för värdet som sen blir vårt slutgiltiga resultat.
console.log(totalLongNames); //590
*/


