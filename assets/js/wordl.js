let current_guess = [];
let guesses = [];
const MAX_GUESSES = 6;
let guess_count = 0;
let answer = [];
let game_over = false;

document.addEventListener("DOMContentLoaded",function(){
    answer = WORDS[Math.floor(Math.random() * WORDS.length)].toLowerCase().split('');
    for (let i = 0; i < answer.length; i++) {
        answer[i] = modernizeLetter(answer[i]);
    }
        
    drawBoard();
});

document.getElementById("keyboard-cont").addEventListener("click", function(event) {
    const target = event.target
    
    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent

    if (key === "Del") {
        key = "Backspace"
    } 

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})

document.addEventListener('keyup', function(event) {
    const key = event.key.toLowerCase();
    
    if (game_over) {
        return
    }

    switch(key){
        case 'delete': // If backspace key is pressed
        case 'backspace': // If backspace key is pressed
            current_guess.pop();
            break;
        case 'enter': // If backspace key is pressed
            if (current_guess.length == answer.length) {
                if (!isWordInList(current_guess)) {
                    alert("þæt nis word");
                    return
                }

                guess_count++;
                guesses.push(current_guess);

                if (current_guess.join("") === answer.join("")) {
                    alert("þu dydest hit!");
                    game_over = true;
                }
                if (guess_count === MAX_GUESSES) {
                    alert("þæt rihte word is: " + answer.join(""));
                    game_over = true;
                }

                current_guess = [];
            }   
            break;
        default:
            const isValid = /^[a-zæþ]$/i.test(modernizeLetter(key))
            if (key.length !== 1 || current_guess.length >= answer.length || !isValid) {
                break;
            }
            
            current_guess.push(key);
    }

    drawBoard();
});

function isWordInList(word){
    return WORDS.some(function(element, i) {
        element = element.toLowerCase().split('')
        for (var i = 0; i< element.length; i++) {
            element[i] = modernizeLetter(element[i]);
        }

        if (word.join('') === element.join('')) {
            index = i;
            return true;
        }
    });
}

function drawBoard() {
    let words = [];
    words.push(...guesses);
    words.push(current_guess);

    let board = document.getElementById('board');
    board.innerHTML = '';

    for (let i = 0; i < MAX_GUESSES; i++) {
        let word = ''
        if (words.length > i) {
            word = words[i];
        }

        let wordDiv = document.createElement("div");
        wordDiv.className = 'letter-row'

        var potentialYellows = [];

        let temp_answer = [...answer];
        for (let x = 0; x < answer.length; x++) {
            let letterSpan = document.createElement("span");
            letterSpan.className = 'letter-box';
    
            let letter = '';
            if (word.length > x) {
                letter = word[x];
                letterSpan.classList.add('filled-box');
            }

            if (guess_count > i) {
                
                // if letter matches 
                let letterPosition = temp_answer.indexOf(letter)

                if (letterPosition === -1) {
                    letterSpan.style.backgroundColor = 'gray';
                    shadeKeyBoard(letter, 'gray')

                } else if (temp_answer[x] === letter) {
                    letterSpan.style.backgroundColor = 'green';
                    shadeKeyBoard(letter, 'green')
                    temp_answer[letterPosition] = '%';
                } else {
                    // We need to check the potential yellows after the greens
                    potentialYellows.push(x);
                }
            }
            
            let letterText = document.createTextNode(letter);
            letterSpan.appendChild(letterText);
            wordDiv.appendChild(letterSpan);
        }

        // Now that
        if (guess_count > i) {
            for (const index of potentialYellows) {
                let letterPosition = temp_answer.indexOf(word[index])
                let letterSpan = wordDiv.getElementsByTagName('span')[index];
                if (letterPosition !== -1) {                    
                    letterSpan.style.backgroundColor = 'yellow'
                    shadeKeyBoard(word[index], 'yellow')
                    temp_answer[letterPosition] = '%'
                } else {
                    letterSpan.style.backgroundColor = 'gray'
                    shadeKeyBoard(word[index], 'gray')
                }
            }
        }
        board.appendChild(wordDiv);
    }
}

function modernizeLetter(letter) {
    switch (letter) {
        case 'ċ':
            letter = 'c';
            break;
        case 'ġ':
        case 'ᵹ':
            letter = 'g';
            break;
        case 'ā':
            letter = 'a';
            break;
        case 'ē':
            letter = 'e';
            break;
        case 'ī':
            letter = 'i';
            break;
        case 'ō':
            letter = 'o';
            break;
        case 'ū':
            letter = 'u';
            break;
        case 'ǣ':
            letter = 'æ';
            break;
        case 'ȳ':
            letter = 'y';
            break;
        case 'ð':
            letter = 'þ';
            break;
        default:
    }
    
    return letter;
}

// Select keyboard button
function getButtonByText(str) {
    return Array.prototype.slice.call(document.getElementsByTagName('button')).filter(el => el.textContent.trim() === str.trim());
}

function shadeKeyBoard(letter, color) {
    let elems = getButtonByText(letter);
    if (elems.length == 0) {
        return
    }

    let elem = elems[0];
    let oldColor = elem.style.backgroundColor
    if (oldColor === 'green') {
        return
    } 

    if (oldColor === 'yellow' && color !== 'green') {
        return
    }

    elem.style.backgroundColor = color
}
