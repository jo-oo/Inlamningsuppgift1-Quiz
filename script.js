// hämtat diven #image-container. sparar den html-diven i en variabel i Js som heter imageContainerEl.
//samma med correct name-button & false-name-button som båda ligger i varsin div i html:en. 
let imageContainerEl = document.getElementById('image-container');
let correctNameEl = document.getElementById('correct-name');
let falseNameEl = document.getElementById('false-name');


//redigerar vad som ska vara i diven och visas på hemsidan/som att redigera diven i index.html fast jag gör det här istället i Js. HÅRDKODAT

//diven som håller bild. redigerar den här:
imageContainerEl.innerHTML = `
<img src='${students[0].image}' class="img-fluid"></img>	
`
//diven som håller knapp med rätt namn. redigerar den här:
    //lägger till button med attribut som heter name och ger det värdet av studentens namn
    //+sätter knappens text till studentens namn också (Adi)
correctNameEl.innerHTML = `
<button name="${students[0].name}">${students[0].name}</button>
`
//skapar variabel med studentens rätta namn (Adi)
let correctName = students[0].name;

//redigerar "fel-namn-knappen". Sätter det namnet till student 1 (Alexander)
falseNameEl.innerHTML = `
<button name="${students[1].name}">${students[1].name}</button>
`

//"lyssnar" efter att anv. klickar på hemsidan
addEventListener('click', e => {
    //förhindrar att sidan laddas om (vilket är default-action för click-event)
	e.preventDefault();
	
    //kollar så anv. klickar på en knapp
    //om så: hämta attributet name & spara i "clickedButton"
	if (e.target.tagName === "BUTTON") {
        let clickedButton = e.target.getAttribute('name');
        //om attributet name (sparat i "clickedButton") är samma som namnet Adi= namnet är rätt & innehållet i diven som håller img ändras till att visa bild på student på index 3= Benjamin)
        if (clickedButton == correctName) {
            alert("Right name!")
            imageContainerEl.innerHTML = `
            <img src='${students[3].image}' class="img-fluid"></img>	
            `
            //även button med texten namn ändras till texten Benjamin
            correctNameEl.innerHTML = `
            <button name="${students[3].name}">${students[3].name}</button>
            ` 
        }
        else {
            alert("Wrong name");
        }
	} else {
        alert("You clicked on something wierd");
    }
});

//-------New stuff------
//MAP. skapar ny array av bara namnen. visas som varje persons namn inuti den ursprungliga arrayen
const names = students.map(student => {
    return student.name;
});
console.log(names);

//----SHUFFLE-----Fisher-Yates algorith
//Loopar genom arrayen: tar ett random item och byter det till ett annat 
const shuffleArray = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}
shuffleArray(names);
console.log("Shuffled names: ", names.join("\n"));





//-----TEST FILTER OCH REDUCE-------

//TEST: FILTER: filtrerar ut namn längre än 18 tecken (mellansla ej inkluderat) ur den arrayen
const longNames = students.filter(student => {
    return student.name.length >18;
}).map(student => {
    return student.name;
});

console.log(longNames); //visar namnen över 18 tevken som hela objekt. 
//när vi lägger till MAP i funtionen visas istället bara namnen på dom öber 8 tecken. 

//TEST: REDUCE. reduce down the array to a singular value. Tex: lägga ihop längden a alla namn 
//kommer köra igenom vraje item i min array (varje person) och
const totalLongNames = students.reduce((total, student) => {
    return total + student.name.length;
}, 0); //börjar räkna på 0
///student=objektet student
//total=respresenterar nuvarande värde när vi loppar genom varje person. placeholder för värdet som sen blir vårt slutgiltiga resultat.
console.log(totalLongNames); //590
