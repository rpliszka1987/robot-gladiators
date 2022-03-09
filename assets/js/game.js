// Game States
// "WIN" - Player robot has defeated all enemy-robots
//      * Fight all enemy-robots
//      * Defeat each enemy-robot
// "LOOSE" - Player robot's health is zero or less

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;


var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

// Fight Function
var fight = function(enemyName) {
    // repeat and execcute as long as the enemy-robot is alive
    while(playerHealth > 0 && enemyHealth > 0){
        // Ask player if they like to fight or run
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to chose.");

        // if player picks "skip" confirm and stop the loop
        if (promptFight === "skip" || promptFight === "SKIP"){
            // Confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye");
                // Subtract money
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }
        }

        //  remove enemy's heath by subtractiong the amount set in the playerAttack variable
        enemyHealth = enemyHealth - playerAttack;
        console.log(playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health reamining.');

        // Check enemy health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " had died!");

            // award player money for winning
            playerMoney = playerMoney + 20;
            // leave while() loop since enemy dead
            break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

         // Subtract the value of 'enemyAttact' from the value of 'playerHealth'
         playerHealth = playerHealth - enemyAttack;

         // Log a resulting message to the console so we know that it worked.
         console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");

         // check players health
         if (playerHealth <= 0) {
            window.alert(playerName + " has died.");
            break;
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        } 
    } // end of while loop   
}; // end of function

// Function to starta new game
var startGame = function() {
    // reset player stats
    playerHealth= 100;
    playerAttack = 10;
    playerMoney = 10;

    // For loop for enemy names
    for(var i =0; i < enemyNames.length; i++){
        if(playerHealth > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            // pick new enemey to fight based on the index of the enemyNames array
            var pickedEnemyName = enemyNames[i];

            // reset enemyHealth before starting new fight
            enemyHealth = 50;

            // use debugger to pause script
            // debugger;

            // pass the pickEnemyName variable's value into the fight function
            fight(pickedEnemyName)

            // if we're not at the last enemy in the array
            if (playerHealth > 0 && i < enemyNames.length -1) {
                // ask if player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before next round?");

                // if yes take them to the store() function
                if (storeConfirm) {
                    shop();
                }
                
            }
        } else {
            windoes.alert("YOu have lost your robot in battle! Game Over!");
            break;
        }
    }

    // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();

};

// function to end the entire game
var endGame = function() {
    // if player is still alive, player wins!
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
    } else {
        window.alert("You've loast your robot in battle.");
    }
    
    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like the play again?");

    if (playAgainConfirm) {
        // restart game
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function() {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt("Would you like to REFILL  your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', 'LEAVE' to make a chpice. ");

    // use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL": // nre case
        case "refill":
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");

                // increase health and decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney -7;
            } else {
                window.alert("You don't have enough money!");
            }
            break;
        case "UPGRADE": // new case
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollar.");

                // increase attack and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            } else {
                window.alert("You don't have enough money!");
            }
            break;
        case "LEAVE":
        case "leave":
            window.alert("Leaving store.");

            // do nothing, so function will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");

            // call shop() again to force player to pick a valid option
            shop()
            break;
    }
};



// Start the game
startGame();
