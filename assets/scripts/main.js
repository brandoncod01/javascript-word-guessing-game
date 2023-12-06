const boxContainer = document.querySelector('.main__form-word');
const form = document.querySelector('.main__form');
const check = document.querySelector('.main__form-check');

const wordsList = ["time", "year", "people", "water", "sound",
    "place", "thing", "sentence", "animal", "house", "point", "world",
    "plant", "school", "story", "paper", "group", "children", "night", "state", 
    "idea", "example", "family", "number", "every", "other", "right",
    "large", "small", "change", "light", "early", "later", "mother",
    "father", "friend", "often", "always", "never", "happy"];


// generate a random word from the list
function getRandomWord(list){
    return list[Math.floor(Math.random() * list.length)];
}

let currWord = getRandomWord(wordsList);


// Generate every box for each character in the currWord
for(let i = 0; i < currWord.length; i++){
    let boxWord = document.createElement('input');
    boxWord.type = "text";
    boxWord.setAttribute('maxLength', 1);
    boxWord.setAttribute('autocomplete', "off");
    boxWord.classList.add('boxWord');
    boxWord.id = i;
    boxContainer.appendChild(boxWord);
}

// prevent to reload when press check
form.addEventListener('submit', (event) => {
    event.preventDefault();
})

// add focus and input boxes behavior keyboard

const wordBoxes = document.querySelectorAll('.boxWord');


wordBoxes.forEach((boxWord) =>{
    boxWord.addEventListener('input', (event) =>{ // when the state of input changes move cursor ex: from lengh to 0 to 1 then move cursor
 
        let length = event.target.value.length;
        let maxLength = event.target.maxLength;
        let index = Array.from(wordBoxes).indexOf(event.target);
        wordBoxes[index].value = wordBoxes[index].value.toLowerCase();

        if(length === maxLength){ // user input a value then change focus next input
            if(index !== wordBoxes.length - 1){ // if is not the last input move next
                wordBoxes[index+1].focus();
                wordBoxes[index+1].select();
            }
        }else if(length === 0 && event.target.value === ""){ // when delete move backwards if is not the first element
            if(index !== 0){
                wordBoxes[index-1].focus();
                wordBoxes[index-1].select();
            }
        }
    })

    boxWord.addEventListener('click', (event) =>{
        event.target.select();
    })
})



// Check when user submits
check.addEventListener('click', (click) =>{
    let succed = true;
    wordBoxes.forEach((box, index) =>{
        let value = box.value;
        if(currWord[index] != value){
            box.classList.remove('right');
            box.classList.add('wrong');
            succed = false;
        }else{
            box.classList.remove('wrong');
            box.classList.add('right');
        }
    });
    
    if(succed){

        setTimeout(window.location.reload(), 20000);

    }

});

//Generate two random helper words
let w1 = Math.floor(Math.random() * currWord.length);
let w2 = Math.floor(Math.random() * currWord.length);
wordBoxes[w1].value = currWord[w1];
wordBoxes[w2].value = currWord[w2];






