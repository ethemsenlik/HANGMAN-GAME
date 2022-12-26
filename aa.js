const word_element = document.getElementById("word");
const popup = document.getElementById("popup-container");
const message_element = document.getElementById("success-message")
const wrongLetters_element = document.getElementById("wrong-leters")
const items = document.querySelectorAll(".item")
const message = document.querySelector("#message")
const playAgainBtn = document.querySelector("#play-again")

const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWords();

function getRandomWords() {
    const words = ["java", "javascript", "phyton", "css", "html", "bootstrap", "nodejs"];
    return words[Math.floor(Math.random() * words.length)]
}

function displayWord() {
    word_element.innerHTML = `
        ${selectedWord.split("").map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter: ""}
            </div>
        `).join("")}
    `;

    const w = word_element.innerText.replace(/\n/g,'');
        if(w === selectedWord) {
            popup.style.display = "flex";
            message_element.innerText = "Tebrikler kazandınız.";
        }
}

function updateWrongLetter () {
    wrongLetters_element.innerHTML = `
        ${wrongLetters.length > 0 ? `<h3>Hatalı Kelimeler</h3>`:''}
        ${wrongLetters.map(letter => `<span>${letter}<span>`)}
    `;

    items.forEach((item,index) => {
        const errorCount = wrongLetters.length;

        if (index<errorCount) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    })

    if(wrongLetters.length === items.length) {
        popup.style.display = "flex";
        message_element.innerText = "Maalesef kaybettiniz";
    }
}

playAgainBtn.addEventListener("click", function() {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    
    selectedWord = getRandomWords();

    displayWord();
    updateWrongLetter();
    popup.style.display = "none";
})

function displayMessage () {
    message.classList.add("show");

    setTimeout(function() {
        message.classList.remove("show");
    },2000);
}

window.addEventListener("keydown", function(e){
    if(e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if(selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                displayMessage();
            }
        } else {
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter)
                updateWrongLetter();
            } else {
                displayMessage();
            }
        }
    }

});

displayWord();