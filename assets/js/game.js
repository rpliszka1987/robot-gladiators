// Game States
// "WIN" - Player robot has defeated all enemy-robots
//      * Fight all enemy-robots
//      * Defeat each enemy-robot
// "LOOSE" - Player robot's health is zero or less




// Fight Function
var fight = function(enemy) {
    // repeat and execcute as long as the enemy-robot is alive
    while(playerInfo.health > 0 && enemy.health > 0){
        // Ask player if they like to fight or run
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to chose.");

        // if player picks "skip" confirm and stop the loop
        if (promptFight === "skip" || promptFight === "SKIP"){
            // Confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerInfo.name + " has decided to skip this fight. Goodbye");
                // Subtract money
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("playerMoney", playerInfo.money);
                break;
            }
        }

        //  remove enemy's heath by subtractiong the amount set in the playerAttack variable
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        enemy.health = Math.max(0, enemy.health - damage);
        console.log(playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health reamining.');

        // Check enemy health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " had died!");

            // award player money for winning
            playerInfo.money = playerInfo.money + 20;
            // leave while() loop since enemy dead
            break;
        } else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

         // Subtract the value of 'enemyAttact' from the value of 'playerHealth'
         playerInfo.health = Math.max(0, playerInfo.health - enemy.attack);

         // Log a resulting message to the console so we know that it worked.
         console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

         // check players health
         if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died.");
            break;
        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        } 
    } // end of while loop   
}; // end of function

// function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        this.health += 20;
        this.money -= 7;
    },
    upgradeAttack: function() {
        this.attack +=6;
        this.money -= 7;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -+ 7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -+ 7;
        } else {
            window.alert("You don't have enough money!");
        }
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10,14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10,14)
    }
];

// Function to starta new game
var startGame = function() {
    // reset player stats
    playerInfo.reset();

    // For loop for enemy names
    for(var i =0; i < enemyInfo.length; i++){
        if(playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            // pick new enemey to fight based on the index of the enemyNames array
            var pickedEnemyObj = enemyInfo[i];

            // reset enemyHealth before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);

            // use debugger to pause script
            // debugger;

            // pass the pickEnemyName variable's value into the fight function
            fight(pickedEnemyObj)

            // if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length -1) {
                // ask if player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before next round?");

                // if yes take them to the store() function
                if (storeConfirm) {
                    shop();
                }
                
            }
        } else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }

    // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();

};

// function to end the entire game
var endGame = function() {
    // if player is still alive, player wins!
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
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
            playerInfo.refillHealth();
            break;
        case "UPGRADE": // new case
        case "upgrade":
            playerInfo.upgradeAttack();
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
