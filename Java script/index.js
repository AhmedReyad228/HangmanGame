/*       1- رسم المشنقة والرجل
         2-  من خلال الجافا اسكريبت spans ادارج الحروف في
         3- الكلمات اللي هنبحث عنها 
         4- Get random properity

*/

// * >>>>>>>>>>>>>> Variables >>>>>>>>>>>>>

let category = document.getElementById("category");
let charNum = document.getElementById("charNum");

let closePop = document.getElementById("close");
let closePop2 = document.getElementById("close2");

let letters = "abcdefghijklmnopqrstuvwxyz"; // alphapet letters

let lettersArray = Array.from(letters); // Get Array from letters

let lettersContainer = document.querySelector(".letters"); // select latters container

lettersArray.forEach((letter) => {
  let span = document.createElement("span"); // create span

  let theLetter = document.createTextNode(letter); // create letter text node

  span.appendChild(theLetter); // Append thr letter to the span

  span.className = "letter-box"; // Add class on span

  lettersContainer.appendChild(span); // Append span to letters container
});

/* let data = [];

async function getCountry() {
  let api = await fetch("https://restcountries.com/v3.1/region/africa");
  let responce = await api.json();
  for (let i = 0; i < responce.length; i++) {
    data.push(responce[i].name.common);
  }
  console.log(data);
}
getCountry();  ======>>>> [countries] */

const words = {
  // object of words + categories
  Programming: [
    "PHP",
    "Javascript",
    "SQL",
    "Python",
    "Java",
    "Kotlin",
    "Ruby",
    "Perl",
    "Scala",
    "Go",
    "Swift",
    "HTML",
    "CSS",
    "Rust",
  ],
  Movies: [
    "The Godfather",
    "Escape Room",
    "skyfull",
    "cast away",
    "Rush hour",
    "saving Private Rayan",
    "saw",
    "Captain America",
    "The Transporter",
  ],
  Actor: [
    "Johnny Depp",
    "Jim Carrey",
    "Emma Watson",
    "Tom Cruise",
    "Brad Pitt",
    "Tom Hanks",
    "Leonardo DiCaprio",
    "Morgan Freeman",
    "Sylvester Stallone",
    "Will Smith",
    "George Clooney",
    "Al Pacino",
    "Jackie Chan",
    "Angelina Jolie",
    "Nicolas Cage",
    "Daniel Craig",
  ],
  Country: [
    "Sudan",
    "Nigeria",
    "Mozambique",
    "Liberia",
    "Mali",
    "Tunisia",
    "Botswana",
    "Ghana",
    "Comoros",
    "Niger",
    "Cameroon",
    "Senegal",
    "Guinea",
    "Djibouti",
    "Tanzania",
    "Egypt",
    "Rwanda",
    "Morocco",
    "Madagascar",
    "Libya",
    "Gambia",
    "Uganda",
    "Zambia",
    "Algeria",
    "Gabon",
    "Kenya",
    "Benin",
    "Somalia",
    "Ethiopia",
    "Eritrea",
    "Angola",
    "Chad",
    "Zimbabwe",
    "Mauritania",
    "Burkina Faso",
  ],
};

// Get random properity ====>>> ونجيب من جواها قيمة عشوائية برضو (properity)نجيب كي عشوائي

// properities of object ====>>> [programming,movies,people,countries]
let allKeys = Object.keys(words);

// random number 0,1,2,3 بعدد ال properities
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// properity name اللي اخترانها عشوائي programming or movies or .....
let randomPropName = allKeys[randomPropNumber];

// set randomPropName to span ====>> category
category.innerHTML = randomPropName + ":";

// value of random properity ====>> properity قيم اللي ال
let randomPropValue = words[randomPropName];

// رقم الكلمة فالبروبيرتي العشوائيية اللي اخترناها
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// اسم الكلمة العشوائية اللي فالبروبيرتي العشوائي
let randomValueName = randomPropValue[randomValueNumber];

// set category
document.querySelector(".category span").innerHTML = randomPropName;

// select letters guess element
let lettersGuessContainer = document.querySelector(".letters-guess");

// convert span to array
let lettersAndSpaces = Array.from(randomValueName);

let lettersWithoutSpaces = lettersAndSpaces.filter(function (entry) {
  return entry.trim() != "";
});

charNum.innerHTML = lettersWithoutSpaces.length + " characters";

// create spans depend on array of letters and spaces

lettersAndSpaces.forEach((letter) => {
  // create empty span
  let emptySpan = document.createElement("span");

  // if letter is space
  if (letter === " ") {
    // add class to span
    emptySpan.className = "with-space";
  } else {
    emptySpan.className = "valid";
  }

  // append span to letters-guess

  lettersGuessContainer.appendChild(emptySpan);
});

// select Guess spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// set wrong Attemps
let wrongAttemps = 0;

// set good Attemps
let goodAttemps = 0;

let rightAttemps = 0;

// select the draw element

let theDraw = document.querySelector(".hangman-draw");

// handle clicking on letters
document.addEventListener("click", (e) => {
  // the status of chosen word
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    // get the clicked letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    // the chosen word
    let theChosenWord = Array.from(randomValueName.toLowerCase());

    // the chosen word without empty string
    let newArr = theChosenWord.filter(function (entry) {
      return entry.trim() != "";
    });

    theChosenWord.forEach((wordLetter, wordIndex) => {
      // if the clicked letter equal to one of the chosen word letter
      if (theClickedLetter == wordLetter) {
        theStatus = true;

        // loop on All Guess spans
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;

            // increase the good Attemps
            goodAttemps++;

            // add class good on the draw element
            theDraw.classList.add(`good-${goodAttemps}`);

            // increase the right Attemps
            rightAttemps++;
          }
        });
      }
    });

    // outside lood

    // if letter is wrong

    if (theStatus !== true) {
      // increase the wrong Attemps
      wrongAttemps++;

      // add class wrong on the draw element
      theDraw.classList.add(`wrong-${wrongAttemps}`);

      // play fail sound
      document.getElementById("fail").play();

      if (wrongAttemps === 8) {
        document.querySelector(".in-fail").classList.remove("d-none");
        document.querySelector(".faild").classList.remove("d-none");
        document.querySelector(".theCorrect").innerHTML = randomValueName;
        document.getElementById("finalFail").play();
        lettersContainer.classList.add("finished");
      }
    } else {
      // play success sound
      document.getElementById("success").play();

      if (goodAttemps === newArr.length) {
        document.querySelector(".in-fail").classList.remove("d-none");
        document.querySelector(".success").classList.remove("d-none");
        document.getElementById("finalSuccess").play();
      }
    }
  }
});

closePop.addEventListener("click", function () {
  document.querySelector(".in-fail").classList.add("d-none");
  document.querySelector(".faild").classList.add("d-none");
  window.location.reload();
});

closePop2.addEventListener("click", function () {
  document.querySelector(".in-fail").classList.add("d-none");
  document.querySelector(".success").classList.add("d-none");
  window.location.reload();
});
