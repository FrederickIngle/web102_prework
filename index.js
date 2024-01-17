/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for(let i =0; i < games.length ;i++){

        let game = games[i];
        console.log(game);
    

        // create a new div element, which will become the game card
       var game_card = document.createElement('div');
       game_card.classList.add('game-card');


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        game_card.innerHTML = `
        <img src="${game.img}" alt="${game.name}" class="game-img">
        <h2>${game.name}</h2>
        <p>Description: ${game.description}</p>
        <p>Pledged: $${game.pledged}</p>
        <p>Goal: $${game.goal}</p>
        <p>Backers: ${game.backers}</p>
        `;

        // append the game to the games-container
        gamesContainer.appendChild(game_card);
    }

}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);
// later, we'll call this function using a different list of games



/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((accumulator, game)=>{
    return accumulator + game.backers;
},0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `Total Contributions: ${totalContributions.toLocaleString()}`;


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalPledged = GAMES_JSON.reduce((accumulator, game)=>{
    return accumulator + game.pledged;
},0);

// set inner HTML using template literal
raisedCard.innerHTML = `Total Pledged: $ ${totalPledged.toLocaleString()}`;


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length;
gamesCard.textContent = `Total Number of Games: ${totalGames}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let lessThanGoal = GAMES_JSON.filter((game)=>{
        return game.pledged < game.goal;
    });
   

    addGamesToPage(lessThanGoal);

    // use the function we previously created to add the unfunded games to the DOM
    console.log(lessThanGoal.length);
    
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() 
    let metGoal = GAMES_JSON.filter((game)=>{
        return game.pledged >= game.goal;
    });
   

    addGamesToPage(metGoal);
    
    // use the function we previously created to add the unfunded games to the DOM
    console.log(metGoal.length);

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    addGamesToPage(GAMES_JSON);

    // add all games from the JSON data to the DOM

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click',function(){
    filterUnfundedOnly();

});
fundedBtn.addEventListener('click',function(){

    filterFundedOnly();
});
allBtn.addEventListener('click',function(){

    showAllGames();
});



/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
 // use filter() to get a list of games that have not yet met their goal
 let lessThanGoal = GAMES_JSON.filter((game)=>{
    return game.pledged < game.goal;
});
let numUnfundedgames = lessThanGoal.length;


let string1 = `There is 1 game that needs funding. A total of $ ${totalContributions} has been raised.`;
let string2 = `There are ${numUnfundedgames} games that need funding. A total of $ ${totalPledged} has been raised. `;

// create a string that explains the number of unfunded games using the ternary operator
let descStr = `${numUnfundedgames > 1 ? string2 : string1}`


// create a new DOM element containing the template string and append it to the description container

let descElement = document.createElement("p");
descElement.innerHTML = descStr;
descriptionContainer.appendChild(descElement);



/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element

// Append information of the top pledged game directly to the firstGameContainer
let firstGameInfo = document.createElement("div");
firstGameInfo.innerHTML = `
    <p><strong>Game:</strong> ${firstGame.name}</p>
    <p><strong>Pledged:</strong> $${firstGame.pledged.toLocaleString()}</p>
`;
firstGameContainer.appendChild(firstGameInfo);


// do the same for the runner up item
let secondGameInfo = document.createElement("div");
secondGameInfo.innerHTML = `
    <p><strong>Game:</strong> ${secondGame.name}</p>
    <p><strong>Pledged:</strong> $${secondGame.pledged.toLocaleString()}</p>
`;
secondGameContainer.appendChild(secondGameInfo);