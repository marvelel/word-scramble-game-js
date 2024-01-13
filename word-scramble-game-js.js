//TO DO - Allow player to rescramble word once per word, player's answer timed and points effected

// WORD SCRAMBLE GAME //

//Function called to select five words at indicated difficulty, shuffle them, and return them to play with
const prompt = require("prompt-sync")({sigint: true});

function wordScramble(difficulty) {
    //Lists of words for each level of difficulty to unscramble
    let easyWords = 
        ['acid', 'cage', 'cake', 'calf', 'calm', 'came', 'camp', 'even', 'easy', 'echo', 'edge', 'gain', 'gala', 'gale', 'gate', 
        'gave', 'idea', 'idle', 'idol', 'info', 'kegs', 'kelp', 'keys', 'kick', 'kite', 'knew', 'knit', 'lack', 'lady', 'land',
        'lard', 'lava', 'lawn', 'laws', 'lazy', 'leaf', 'lend', 'like', 'limb', 'limo', 'lute', 'many', 'mayo', 'meld', 'mice', 
        'mild', 'mind', 'minx', 'miso', 'mold', 'most', 'myth'];
    
    let medWords =
        ['about', 'above', 'actor', 'admit', 'again', 'bound', 'brain', 'bread', 'broke', 'build', 'catch', 'clean', 'chain', 
        'clock', 'crown', 'debut', 'delay', 'depth', 'doubt', 'dozen', 'early', 'eight', 'elite', 'empty', 'enjoy', 'forth',
        'forum', 'found', 'frame', 'fresh', 'grace', 'great', 'gross', 'globe', 'going', 'judge', 'juice', 'joint', 'known', 
        'noise', 'north', 'noted', 'nurse', 'ocean', 'occur', 'often', 'order', 'other', 'mouse', 'mouse', 'mayor', 'music',
        'meant', 'needs', 'never', 'power', 'peace', 'party', 'pride', 'prime', 'scale', 'scene', 'scope', 'taxes', 'teach'];

    let hardWords =
        ['abroad', 'across', 'acting', 'active', 'advice', 'beyond', 'bishop', 'border', 'bottle', 'bought', 'cancer', 'cactus',
        'chance', 'church', 'circle', 'damage', 'debate', 'decade', 'define', 'deputy', 'editor', 'effort', 'either', 'emerge',
        'ending', 'fabric', 'forest', 'finger', 'friend', 'female', 'garden', 'girdle', 'gravel', 'grudge', 'glitch', 'hacker', 
        'hazard', 'horrid', 'humble', 'heated', 'invest', 'infant', 'island', 'infamy', 'insane', 'jigsaw', 'jungle', 'knight', 
        'kettle', 'manual', 'market', 'mirror', 'master', 'myself', 'narrow', 'normal', 'native', 'nectar', 'nature', 'output',
        'obtuse', 'option', 'orchid', 'orphan', 'parent', 'patent', 'please', 'public', 'prison'];

    let insWords = 
        ['ability', 'advance', 'alleged', 'attract', 'auction', 'battery', 'bedroom', 'brother', 'balance', 'believe', 'cabinet',
        'calling', 'capable', 'capital', 'chronic', 'century', 'dealing', 'decline', 'deposit', 'diverse', 'diamond', 'divided', 
        'eastern', 'economy', 'elderly', 'element', 'expense', 'factory', 'fashion', 'fishing', 'freedom', 'fortune', 'greater',
        'genuine', 'genetic', 'granite', 'gourmet', 'geology', 'however', 'history', 'hundred', 'hopeful', 'habitat', 'include',
        'involve', 'initial', 'inverse', 'implant', 'journal', 'justice', 'jeweler', 'jumping', 'ketchup', 'kindred', 'karaoke', 
        'limited', 'library', 'lawsuit', 'livable', 'lunatic', 'machine', 'massive', 'maximum', 'measure', 'mystery', 'natural', 
        'network', 'nursing', 'nothing', 'neutron', 'officer', 'outside', 'orbital', 'oceanic', 'octagon', 'package', 'portion', 
        'problem', 'premium', 'publish'];
    
    //Function pushes five random words from the indicated list and removes it such that the same word is not selected twice
    //Function pushes the five words to scrambleWords() for scrambling
    function randomWords(wordList) {
        let fiveWords = [];
        for (let i = 0; i <= 4; i++) {
            let random = Math.floor(Math.random() * wordList.length);
            let word = wordList[random];
            wordList = wordList.slice(0, random).concat(wordList.slice(random + 1));
            fiveWords.push(word);
        }
        return [fiveWords, scrambleWords(fiveWords)];
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

//Function handles player's interaction with unscrambling the words and returns a score based on the player's success
function unscramble(playerWords) {
    let solvedWords = playerWords[0];
    let unsolvedWords = playerWords[1];
    let totalPoints = 0;

    console.log("Once per word, you may enter 'shuffle' to rearrange the word- costing 100 points.");
    //Parses through each word for player to unscramble
    for (let i = 0; i < solvedWords.length; i++) {
        let points = 1000;
        let attempts = 3;
        let shuffled = false;

        console.log("Word " + (i + 1) + "/" + solvedWords.length);
        let answer = prompt("~*-*~ " + unsolvedWords[i] + " ~*-*~   ").toLowerCase();
        console.log("\n");

        //If player inputs "shuffle", the word will be returned in a new order- possibly the correct order- at the cost of points
        if (answer === "shuffle") {
            points -= 100;
            shuffled = true;
            unsolvedWords[i] = scrambleWords([unsolvedWords[i]])[0];
            answer = prompt("~*-*~ " + unsolvedWords[i] + " ~*-*~   ").toLowerCase();
            console.log("\n");
        }
        
        //Points are deducted until player guesses word, or until there are no points left to earn
        while (answer !== solvedWords[i] && attempts !== 0) {
            points -= 300;
            attempts--;
            console.log("Incorrect. " + attempts + " more attempts. try again...\n");
            answer = prompt("--- " + unsolvedWords[i] + " ---   ").toLowerCase();
            console.log("\n");
            if (answer === "shuffle" && !shuffled) {
                points -= 100;
                shuffled = true;
                unsolvedWords[i] = scrambleWords([unsolvedWords[i]])[0];
                answer = prompt("~*-*~ " + unsolvedWords[i] + " ~*-*~   ").toLowerCase();
                console.log("\n");
            }
        }
        if (attempts === 0) {points = 0;};
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
    console.log("FINAL SCORES\nEASY: "+easy+"\nMEDIUM: "+med+"\nHARD: "+hard+"\nINSANE: "+insane+"\n\nThanks for playing!");
}

game();