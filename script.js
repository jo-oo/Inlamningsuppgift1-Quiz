// hämtat diven #image-container. sparar den html-diven i en variabel i Js som heter imageContainerEl.
let imageContainerEl = document.getElementById('image-container');
let alternativesEl = document.getElementById('alternatives');


//----SHUFFLE OBJECTS - GETS LIST OF RANDOM STUDENTS---
//Skapar en kopia på students-array: döper till randomStudents.ger den värdet av students-arrayen. skapar ny array av bara studenterna.  visas som varje person inuti den ursprungliga arrayen. Borde jag ha MAP här som innan?
const randomStudents = students;
console.log(randomStudents); //visar lista med studenterna i random ordning, precis som nedan, raden lite under. Hm...

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

//----SHUFFLE--4--OBJECTS/STUDENTS-ARRAY----
//skapar ny array av 4 studenter(från index 0,1,2,3): sparar i "Alternatives". Visas bara 1a gången på sidan, innan click-eventet
let alternatives = randomStudents.slice(0, 4);
console.log(alternatives); //skriver ut 4 SHUFFLADE studenter i ordningen 0-4, dvs 0 är rätt och ligger först i knapparna
shuffleArrayOfStudents(alternatives); //"Q". -shufflar 4 namnen / knapparna i hur de VISAR så de visas på olika platser första gången. (alltså att 0/rätt student imte är default på första knappen) 


//----REDIGERAR INNER_HTML för ALRTERNATIVES (4 BUTTONS)----
//Loppar över min alternative-array och sätter den till att för varje loop skapa en knapp med varje alternatives/students namn på. Kommer skapa 4 knappar pga alternative-arrayen är 4 students/elements lång

//för att slippa kopiera detta och lägga det i min click-funtion så gör jag en funktion av det:
function displayButtons(alt) {
    alternativesEl.innerHTML=""; //sätter den till att vara tom innan loopen börjar. Sen läggs innehåll till 4 gånger och skapar på så sätt 4 knappar
    alt.forEach(element => {
        alternativesEl.innerHTML += `
        <button name="${element.name}">${element.name}</button>
        `
    });
  }
  displayButtons(alternatives); //visar 4 knappar i den random ordning jag skapade ovan i "Q"


  //------REDIGERAR INNER-HTML för IMAGES--------//
imageContainerEl.innerHTML = `
<img src='${randomStudents[0].image}' class="img-fluid"></img>	
`//visar den slumpade bilden currently at index 0 from images-array


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
            
            shuffleArrayOfStudents(randomStudents);//XY shufflar students objects
            //-->sätter i image-containern ny bild 0
            imageContainerEl.innerHTML = `
            <img src='${randomStudents[0].image}' class="img-fluid"></img>	
            `
            
            //XY uppdaterar alternatives-knapparna efter att de shufflats på nytt ovan så de inte är samma som första eller förra gången. nu kommer 0 i knapp/namn-arrayen att vara samma som 0 i images-arrayen ovan på XY-raden
            alternatives = randomStudents.slice(0, 4);
            
            //nu vill jag också SHUFFLA KNAPPARNAS PLACERINGSORDNING
            shuffleArrayOfStudents(alternatives); //shufflar 4 namnen-knapparna i hur de VISAR så de visas på olika platser första gången.
            
            //visar knapparna med funktionen som lägger in 4 nya namn
            displayButtons(alternatives);
        }
        else {
            alert("Wrong name");
        }
	} else {
        alert("You clicked on something wierd");
    }
});











/*

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

*/












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


