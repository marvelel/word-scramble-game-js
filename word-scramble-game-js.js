// WORD SCRAMBLE GAME //
/*  1. Make the code to scramble words V
    2. Words should not scramble to be the same, and should be at least some number of letters innacurate 
    3. Player should be prompted to solve the puzzle, iterate if the player is incorrect, and move on to the next word if they are correct 
    4. Player should not receive the same word twice per game (5 words per game) V
    5. Words should avoid having other applicable solutions such that they can be unscrambled to make other words */

//Function called to select five words at indicated difficulty, shuffle them, and return them to play with
const prompt = require("prompt-sync")({sigint: true});

function wordScramble(difficulty) {
    let fiveWords = [];

    //Lists of words for each level of difficulty to unscramble
    let easyWords = 
        ['acid', 'cage', 'cake', 'calf', 'calm', 'came', 'camp', 'earl', 'easy', 'echo', 'edge', 'gain', 'gala', 'gale', 'gate', 
        'gave', 'idea', 'idle', 'idol', 'info', 'kegs', 'kelp', 'keys', 'kick', 'kite', 'knew', 'knit', 'lack', 'lady', 'land',
        'lard', 'lava', 'lawn', 'laws', 'lazy', 'leaf', 'lend', 'liar', 'like', 'limb', 'limo', 'lute', 'many', 'mayo', 'meld', 
        'mice', 'mild', 'mind', 'minx', 'miso', 'mold', 'most', 'myth'];
    
    let medWords =
        ['about', 'above', 'actor', 'admit', 'again', 'bound', 'brain', 'bread', 'broke', 'build', 'catch', 'clean', 'chain', 
        'clock', 'crown', 'debut', 'delay', 'depth', 'doubt', 'dozen', 'early', 'eight', 'elite', 'empty', 'enjoy', 'forth',
        'forum', 'found', 'frame', 'fresh', 'grace', 'great', 'gross', 'globe', 'going', 'judge', 'juice', 'joint', 'known', 
        'noise', 'north', 'noted', 'nurse', 'ocean', 'occur', 'often', 'order', 'other', 'mouse', 'mouse', 'mayor', 'music',
        'meant', 'needs', 'never', 'power', 'peace', 'party', 'pride', 'prime', 'scale', 'scene', 'scope', 'taxes', 'teach'];

    let hardWords =
        [];

    let insWords = 
        [];
    
    //Function pushes five random words from the indicated list and removes it such that the same word is not selected twice
    //Function pushes the five words to scrambleWords() for scrambling
    function randomWords(wordList) {
        for (let i = 0; i <= 4; i++) {
            let random = Math.floor(Math.random() * wordList.length);
            let word = wordList[random];
            wordList = wordList.slice(0, random).concat(wordList.slice(random + 1));
            fiveWords.push(word);
        }
        return [fiveWords, scrambleWords(fiveWords)];
    };

    //Function shuffles the letters of each word. Words are recast if still found in order.
    function scrambleWords(unshuffled) {
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
        return shuffled;
    };
    
    let playerWords = [];
    //Passing randomWords() a list based upon indicated difficulty, and returning the list to play with
    switch (difficulty) {
        case 'easy':
            playerWords = randomWords(easyWords);
            break;
        case 'medium':
            playerWords = randomWords(medWords);
            break;
        case 'hard':
            playerWords = randomWords(hardWords);
            break;
        case 'insane':
            playerWords = randomWords(insWords);
            break;
    }
    return playerWords;
};

//Function handles player's interaction with unscrambling the words and returns a score based on the player's success
function unscramble(playerWords) {
    let solvedWords = playerWords[0];
    let unsolvedWords = playerWords[1];
    let totalPoints = 0;

    //Parses through each word for player to unscramble
    for (let i = 0; i < solvedWords.length; i++) {
        let points = 900;
        let attempts = 3;

        console.log("Word " + (i + 1) + "/" + solvedWords.length);
        let answer = prompt("--- " + unsolvedWords[i] + " ---   ").toLowerCase();
        console.log("\n");
        
        //Points are deducted until player guesses word, or until there are no points left to earn
        while (answer !== solvedWords[i] && points !== 0) {
            points -= 300;
            attempts--;
            console.log("Incorrect. " + attempts + " more attempts. try again...\n");
            answer = prompt("--- " + unsolvedWords[i] + " ---   ").toLowerCase();
            console.log("\n");
        }
        totalPoints += points;
    }
    console.log("You've solved all of the words!\nTotal points earned: " + totalPoints + "\n");
    return totalPoints;
}

//Function runs the game
function game() {
    stillPlaying = true;
    let easy = 0;
    let med = 0;
    let hard = 0;
    let insane = 0;

    console.log("------Welcome to SCRAMBL------\n");
    while (stillPlaying) {
        console.log("HIGH SCORES TODAY\nEASY: "+easy+"\nMEDIUM: "+med+"\nHARD: "+hard+"\nINSANE: "+insane+"\n");

        //Player is asked to input the difficulty of the game
        let difficulty = prompt("Please indicate the level of difficulty for your next game (easy, medium, hard, or insane): ").toLowerCase();
        console.log("\n");
        while (difficulty !== "easy" && difficulty !== "medium" && difficulty !== "hard" && difficulty !== "insane") {
            difficulty = prompt(difficulty + " is not valid. Please enter easy, medium, hard, or insane: ").toLowerCase();
            console.log("\n");
        }
        console.log("You have selected " + difficulty + " mode. Starting game...\n\n");

        //Functions run the player's game, switch case to assign points to the correct scoreboard
        switch (difficulty) {
            case 'easy':
                easy = unscramble(wordScramble(difficulty));
                break;
            case 'medium':
                med = unscramble(wordScramble(difficulty));
                break;
            case 'hard':
                hard = unscramble(wordScramble(difficulty));
                break;
            case 'insane':
                insane = unscramble(wordScramble(difficulty));
                break;
        }

        //Player is asked if they would like to play again
        let playPrompt = prompt("Would you like to play again? (Yes or no)   ").toLowerCase();
        console.log("\n");
        while (playPrompt !== "yes" && playPrompt !== "no") {
            playPrompt = prompt("Invalid submission. Would you like to play again? (Yes or no)   ").toLowerCase();
            console.log("\n");
        }
        if (playPrompt === "no") {stillPlaying = false;}
    }
    console.log("FINAL SCORES\nEASY: "+easy+"\nMEDIUM: "+med+"\nHARD: "+hard+"\nINSANE: "+insane+"\n");
}

game();