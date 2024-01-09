// WORD SCRAMBLE GAME //
/*  1. Make the code to scramble words
    2. Words should not scramble to be the same, and should be at least some number of letters innacurate
    3. Player should be prompted to solve the puzzle, iterate if the player is incorrect, and move on to the next word if they are correct 
    4. Player should not receive the same word twice per game (5 words per game)
    5. Words should avoid having other applicable solutions such that they can be unscrambled to make other words */

function scrambleWords(unshuffled) {
    //Digesting each word into an array of its letters and scrambling the words
    let shuffled = unshuffled.slice();
    for (let i = 0; i < shuffled.length; i++) {
        shuffled[i] = shuffled[i]
            .split("")
            .map(value => ({value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({value}) => value)
            .join("");
            if (shuffled[i] === unshuffled[i]) { i-- };
    }
    console.log(shuffled);
    console.log(unshuffled);
};

//Function called to select five words at indicated difficulty
function wordScrambleEasy() {
    //Easy four letter words
    let words = ['able', 'acid', 'cage', 'cake', 'calf', 'calm', 'came', 'camp', 'earl', 'easy'];
    let fiveWords = [];

    //Function returns a random word from the indicated list and removes it such that the word is not selected twice
    function randomWord(wordList) {
        let random = Math.floor(Math.random() * words.length);
        let word = words[random];
        words = words.slice(0, random).concat(words.slice(random + 1));
        return word;
    };

    //Code selects five words to be returned to the scrambleWords() function
    for (let i = 0; i <= 4; i++) {
        fiveWords.push(randomWord(words));
    }
    scrambleWords(fiveWords);
};

wordScrambleEasy();