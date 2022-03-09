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
            fight(pickedEnemyName);
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
}

// Start the game
startGame();


// fight();