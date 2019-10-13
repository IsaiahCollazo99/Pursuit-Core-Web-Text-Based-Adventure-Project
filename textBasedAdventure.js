const readline = require("readline-sync");
// Example
// let nameInput = userInput("Enter your name: ")
// console.log(`Hello ${nameInput}!  Welcome to my game.`)

// Creating arrays that will display the questions and answers given for the user at the end.
let arrQuestions = [];
let arrAnswers = [];
let health = 100;
let playerAlive = true;

//Creating functions for cleaner code
function healthDamage(damage) {
    //Logs out how much damage taken for the argument "damage" and the users new HP
    console.log(`You take ${damage} points of damage! You have ${health}HP.`);
}

function newLine() {
    //Creates a line spacing
    console.log("");
}

function answersPush(arg) {
    //Pushes the argument to arrAnswers array
    arrAnswers.push(arg);
}

function questionsPush(arg) {
    //pushes the argument to arrQuestions array
    arrQuestions.push(arg);
}

function randomInt(max, min) {
    return Math.floor(Math.random() * max) + min;
}

function userInput(question) {
    return readline.question(question);
}

gameRunning:
while(health > 0) {
    // 1# Introduction
    let nameInput = userInput("Enter your first name: ");

    //Array
    questionsPush("Enter your first name");
    answersPush(nameInput);

    console.log(`Good morning ${nameInput}!`);
    newLine();
    console.log("You wake up after a good nights rest and walk to the bathroom.");
    console.log("Oh no! Bad breath attacks!");

    let breathDamage = randomInt(15, 1); // Takes a random integer for damage
    health -= breathDamage; // Subtracts the damage above from the users health total
    healthDamage(breathDamage);
    if(health <= 0) {
        console.log("You have died.");
        break gameRunning;
    }

    // 2# Bathroom
    let firstStep = userInput("What's the first step of your bathroom routine? ");

    //Arrays
    questionsPush("What's the first step of your bathroom routine? ");
    answersPush(firstStep);

    newLine();
    console.log(`${firstStep} heals you.`);
    let bathroomHeal = userInput("How many health points do you recover? ");

    //Array
    questionsPush("How many health points do you recover? ");

    //Checking for valid user inputs, loops until the input is valid
    let healComplete = false;
    healComplete: 
    while (healComplete === false) {
        if (Number(bathroomHeal) > breathDamage) {
            //If the heal is greater than the damage taken requires a redo of the heal input
            console.log("So you're trying to cheat? I've caught you.");
            bathroomHeal = userInput("How many health points do you recover? ");

        } else if (Number(bathroomHeal) === breathDamage) {
            //If the heal is equal to the damage taken then user is fully healed
            health += Number(bathroomHeal);
            console.log("Fully healed!");

            //Array
            answersPush(bathroomHeal);

            //End loop
            healComplete = true;
            break healComplete;

        } else if (Number(bathroomHeal) === 0) {
            //If the heal is equal to 0 the user heals nothing
            console.log("You heal nothing!");

            //Array
            answersPush(bathroomHeal);

            //End loop
            healComplete = true;
            break healComplete;

        } else if (Number(bathroomHeal) < 0) {
            //If the user enters a negative number requires a redo of the heal input
            console.log(`You can't heal ${bathroomHeal} points!`);
            bathroomHeal = userInput("How many health points do you recover? ");

        } else if (Number(bathroomHeal) > 0 && Number(bathroomHeal) < breathDamage) {
            //If the number is between 0 and the damage the user is healed
            health += Number(bathroomHeal);
            console.log("Ah, refreshing.");

            //Array
            answersPush(bathroomHeal);

            //End loop
            healComplete = true;
            break healComplete;

        } else {
            //If any of the above are not true then a redo is required
            console.log("I do not understand.");
            bathroomHeal = userInput("How many health points do you recover? ");

        } // End of bathroomHeal validity check
    }// End of bathroomHeal loop

    // 3# Breakfast
    newLine();
    console.log("You finish your bathroom routine and continue about your day.");
    let breakfast = userInput("Do you eat breakfast?(Y/N) ");

    //Array
    questionsPush("Do you eat breakfast?(Y/N) ");

    //Checking for valid user inputs, loops until the input is valid
    breakfast = breakfast.toUpperCase();
    let breakfastComplete = false;
    let favoriteBreakfast; // Initializing favoriteBreakfast so it can be called outside of the while loop if necessary

    breakfastComplete: 
    while (breakfastComplete === false) {
        switch (breakfast) {
            case "Y":
            // If the user eats breakfast then this branch is followed
            console.log(`The most important meal of the day! Serving it up ${nameInput}'s way!`);
            newLine();

            // Add in another battle here with hungry stomach
            // It uses growl as an attack
            // Choices for a counter attack are choices for breakfast
            console.log("While walking into the kitchen you feel a movement.");
            console.log("A loud growl is felt deep within your stomach!");
            let stomachGrowl = randomInt(10, 1);
            health -= stomachGrowl;
            healthDamage(stomachGrowl);
            console.log("Which action do you take?");
            console.log("1. Eat a bowl of cereal.");
            console.log("2. Make pancakes.");
            console.log("3. Have a coffee.");
            let stomachCounter = userInput("(Input a number between 1 and 3) ");

            //Array
            questionsPush("Which action do you take against the hungry stomach?");


            //Checking for valid user inputs, loops until the input is valid
            let hungryStomachComplete = false;

            hungryStomach:
            while(hungryStomachComplete === false) {
                switch(stomachCounter) {
                    case "1":
                        newLine();
                        console.log("You prepare a bowl of cereal.");
                        console.log("As you're eating you remember that you're lactose intolerant!");
                        console.log("The milk hurts your stomach but you sate your appetite.");
                        health -= 5;
                        healthDamage(5);

                        //Array
                        answersPush("Eat a bowl of cereal.");

                        //End loop
                        hungryStomachComplete = true;
                        break hungryStomach;

                    case "2":
                        newLine();
                        console.log("The waft of the pancakes as they cook on the pan alert your stomach.");
                        console.log("Out of impatience your stomach growls again, hurting you.");
                        health -= stomachGrowl;
                        healthDamage(stomachGrowl);

                        console.log("The pancakes fill your stomach, and make you feel refreshed.");
                        health += 10;
                        console.log(`You heal 10 health! You have ${health}HP.`)

                        //Array
                        answersPush("Make pancakes.");

                        //End loop
                        hungryStomachComplete = true;
                        break hungryStomach;

                    case "3":
                        newLine();
                        console.log("The coffee energizes you.");
                        console.log("However your hunger isn't sated. Your stomach is upset.");
                        stomachGrowl *= 2;
                        health -= stomachGrowl;
                        healthDamage(stomachGrowl);

                        //Array
                        answersPush("Have a coffee");

                        //End loop
                        hungryStomachComplete = true;
                        break hungryStomach;

                    default:
                        newLine();
                        console.log("I do not understand.");
                        console.log("Which action do you take?");
                        console.log("1. Eat a bowl of cereal.");
                        console.log("2. Make pancakes.");
                        console.log("3. Have a coffee.");
                        stomachCounter = userInput("(Input a number between 1 and 3) ");

                } //End of hungry stomach validity check
            } //End of hungry stomach fight

            //Array
            answersPush(breakfast);

            //End Loop
            breakfastComplete = true;
            break breakfastComplete;
            case "N":
                // If the user does not eat breakfast then this branch is followed
                //Array
                answersPush(breakfast);

                newLine();
                console.log("This angered your waffle iron. It attacks!");
                console.log("The waffle iron uses 'face press'!");

                let waffleAttack = randomInt(25, 1); // Random Integer between 1 and 25
                health -= waffleAttack; // Subtracting the damage done from total health
                healthDamage(waffleAttack);
                if(health <= 0) {
                    console.log("You have died.");
                    break gameRunning;
                }

                //User attack choice
                newLine();
                console.log("Which action do you take?");
                console.log("1. Unplug the waffle iron.");
                console.log("2. Splash water.");
                console.log("3. Jump on it.");
                console.log("4. Just walk away.");
                let waffleCounter = userInput("(Input a number between 1 and 4) ");

                //Array
                questionsPush("Which action do you take against the waffle iron?");

                //Checking for valid user inputs, loops until the input is valid
                let waffleBattleComplete = false;

                waffleBattle: 
                while (waffleBattleComplete === false) {
                    if (waffleCounter === "1") {
                        //If the user chooses choice 1 the move is super effective and defeats the waffle iron
                        newLine();
                        console.log("You reach for the plug and yank it out of the socket!");
                        console.log("The waffle iron is defeated.");

                        //Array
                        answersPush("Unplug the waffle iron");

                        //End loop
                        waffleBattleComplete = true;
                        break waffleBattle;

                    } else if (waffleCounter === "2") {
                        //If the user chooses choice 2 the move kills both the player and the waffle iron creating a game over
                        newLine();
                        console.log("You turn on the sink and throw a load of water at the Waffle Iron.");
                        console.log("The water creates a fire and explodes.");
                        console.log("The explosion reaches to you and defeats you.");

                        //Kills the user
                        health = 0;
                        console.log("You have died.");

                        //Array
                        answersPush("Splash water");

                        //End loop & program
                        waffleBattleComplete = true;
                        if(health <= 0) {
                            console.log("You have died.");
                            break gameRunning;
                        }
                        break waffleBattle;

                    } else if (waffleCounter === "3") {
                        //If the user chooses choice 3 the move kills the waffle iron and hurts the user
                        newLine();
                        console.log("The move is effective!");
                        console.log("The heat from the waffle iron burns your legs.");
                        
                        health -= 15;
                        healthDamage(15);
                        if(health <= 0) {
                            console.log("You have died.");
                            break gameRunning;
                        }

                        //Array
                        answersPush("Jump on it");

                        //End Loop
                        waffleBattleComplete = true;
                        break waffleBattle;

                    } else if (waffleCounter === "4") {
                        //If the user chooses choice 4 the waffle iron lives, but kills the player and creates a game over
                        newLine();
                        console.log("You turn your back to the waffle iron to escape.");
                        console.log("The waffle iron's anger grows.");
                        console.log("The waffle iron uses 'waffle throw!'");
                        console.log(`You take ${health} points of damage!`);

                        //Kills the user
                        health = 0;
                        console.log("You have died.");

                        //Array
                        answersPush("Just walk away.");

                        //End loop and program
                        waffleBattleComplete = true;
                        if(health <= 0) {
                            console.log("You have died.");
                            break gameRunning;
                        }
                        break waffleBattle;

                    } else {
                        //If the user doesn't do a correct input then it asks for a repeat
                        newLine();
                        console.log("I do not understand");
                        console.log("Which action do you take?");
                        console.log("1. Unplug the waffle iron.");
                        console.log("2. Splash water.");
                        console.log("3. Jump on it.");
                        console.log("4. Just walk away.");
                        waffleCounter = userInput("(Input a number between 1 and 4) ");

                    }//End of Waffle Fight Validity check
                }//End of Waffle Fight

            //End loop
            breakfastComplete = true;
            break breakfastComplete;

            default:
            //If any of the above are not true then a redo is required
            newLine();
            console.log("I do not understand.");
            breakfast = useIuserInput("Do you eat breakfast?(Y/N) ");

        }//End of Breakfast Validity Check
    }//End of Breakfast Loop

    // 4# Pet Care
    newLine();
    console.log("You return to your room.");
    console.log("You get dressed, and ready for your day.");
    let pets = userInput("Do you have any pets?(Y/N) ");

    //Array
    questionsPush("Do you have any pets?(Y/N) ");
    pets = pets.toUpperCase();

    //Checking for valid user inputs, loops until the input is valid
    let petsComplete = false;
    let petsAmount;
    let arrPets = [];//Initializing the array that well store the pet data

    petsComplete: 
    while (petsComplete === false) {
        //Contains questions 7
        switch (pets) {
            case "Y":
                //Array
                answersPush(pets);

                //Checking for valid user inputs, loops until the input is valid
                let petsAmountComplete = false;
                petsAmount: 
                while (petsAmountComplete === false) {
                    petsAmount = userInput("How many pets do you have? ");
                    questionsPush("How many pets do you have? ");

                    let petNumber = Number(petsAmount); //Setting the inputted amount to a number
                    if (petNumber > 1) {
                        for (let i = 1; i < petNumber + 1; i += 1) {
                            let currentPet = userInput(`What is pet #${i}? `);
                            arrPets.push(currentPet.toLowerCase());

                        }
                        for (let i = 0; i < arrPets.length; i += 1) {
                            console.log(`You take care of your ${arrPets[i]}`);
                        }

                        //Array
                        answersPush(petsAmount);

                        //End loop
                        petsAmountComplete = true;
                        break petsAmount;

                    } else if (petNumber === 1) {
                        newLine();
                        console.log("You take care of your pet.");

                        //Array
                        answersPush(petsAmount);

                        //End loop
                        petsAmountComplete = true;
                        break petsAmount;
                    } else {
                        newLine();
                        console.log("I do not understand.");
                        petsAmount = userInput("How many pets do you have? ");

                    }//End of petAmount validity check
                }//End of petAmount loop

                //End loop
                petsComplete = true;
                break petsComplete;

            case "N":
                newLine();
                console.log("Taking care of an animal is so much responsibility");

                //Array
                answersPush(pets);

                //End loop
                petsComplete = true;
                break petsComplete;

            default:
                newLine();
                console.log("I do not understand.");
                pets = userInput("Do you have any pets?(Y/N) ");

        }//End of pets validity check
    }//End of pets loop

    newLine();
    console.log("Finally your morning routine is complete.");
    console.log("You leave your house.");

    newLine();
    console.log("Traffic looks crazy today. And your train is also having delays. Do you: ");
    console.log("1. Still decide to drive.");
    console.log("2. Still take the train.");
    let transportation = userInput("(Input either 1 or 2) ");

    //Array
    questionsPush("Do you drive or take the train?");

    //Checking for valid user inputs, loops until the input is valid
    let transportationComplete = false;

    transportationComplete: 
    while (transportationComplete === false) {
        switch (transportation) {
            case "1":
            //Battle with a road rager
            
            //Array
            answersPush("Take your car.");

            newLine();
            console.log("You decide to drive.");
            console.log("On your drive you get cut off by a reckless driver.");
            console.log("In response you honk your horn.");
            console.log("The reckless driver didn't like this, and when a red light was reached he exited his car.");
            console.log("The road rager attacks.");
            console.log("The road rager uses 'insult'.");

            let roadRageInsultDamage = randomInt(25, 1);
            health -= roadRageInsultDamage;
            healthDamage(roadRageInsultDamage);
            if(health <= 0) {
                console.log("You have died.");
                break gameRunning;
            }
            
            newLine();
            console.log("Which action do you take?");
            console.log("1. Insult back");
            console.log("2. Honk your horn");
            console.log("3. Ignore the road rager");
            let roadRageCounter = userInput("(Input a number between 1 and 3) ");

            //Array
            questionsPush("Which action do you take against the Road Rager?");

            //Checking for valid user inputs, loops until the input is valid
            let roadRageComplete = false;
            roadRageComplete: 
            while (roadRageComplete === false) {
                switch (roadRageCounter) {
                case "1":
                    newLine();
                    console.log("Your insult does nothing!");
                    console.log("Road Rager uses 'Mom insult'");
                    console.log(`You take ${health} points of damage!`);

                    //Array
                    answersPush("Insult back");

                    //End loop & program
                    roadRageComplete = true;
                    health = 0;
                    if(health <= 0) {
                        console.log("You have died.");
                        break gameRunning;
                    }
                    break roadRageComplete;

                case "2":
                    newLine();
                    console.log("Your horn shocks the road rager.");
                    console.log("He picks up a rock and throws it at your car.");
                    console.log("The rock misses your car completely.");
                    console.log("The road rager returns to his car in shame.");

                    //Array
                    answersPush("Honk your horn");

                    //End loop
                    roadRageComplete = true;
                    break roadRageComplete;

                case "3":
                    newLine();
                    console.log("The road rager uses 'Middle Finger'");
                    console.log("It has no effect on you!");
                    console.log("The road rager angrily returns to his car after no response.");

                    //Array
                    answersPush("Ignore the road rager");

                    //End loop
                    roadRageComplete = true;
                    break roadRageComplete;

                default:
                    newLine();
                    console.log("Which action do you take?");
                    console.log("1. Insult back");
                    console.log("2. Honk your horn");
                    console.log("3. Ignore the road rager");
                    roadRageCounter = userInput("(Input a number between 1 and 3) ");

                }//End of car validity check
            }//End of car loop

            console.log("You continue driving to your job.");

            //End loop
            transportationComplete = true;
            break transportationComplete;

            case "2":
            //Battle with a subway rat

            //Array
            answersPush("Take the train");

            newLine();
            console.log("You decide to take the train.");
            console.log("You arrive at the station.");
            console.log("You notice an entirely empty bench, except for a lone slice of pizza, and take a seat.");
            console.log("After a few minutes of sitting you feel a brush against your leg.");
            console.log("Out of fear you jump up and catch the attention of a subway rat!");
            console.log("The rat leaps at you and uses 'Bite'");

            let ratAttack = randomInt(10, 1);
            health -= ratAttack;
            healthDamage(ratAttack);
            if(health <= 0) {
                console.log("You have died.");
                break gameRunning;
            }

            newLine();
            console.log("Which action do you take?");
            console.log("1. Kick the rat.");
            console.log("2. Pick the rat up and throw it at the train.");
            console.log("3. Walk to the other side of the platform.");
            console.log("4. Give the rat the pizza left on the bench.");
            let ratCounter = userInput("(Input a number between 1 and 4) ");

            //Array
            questionsPush("Which action do you take against the rat?");

            //Checking for valid user inputs, loops until the input is valid
            let ratComplete = false;
            ratComplete: 
            while (ratComplete === false) {
                switch (ratCounter) {
                case "1":
                    newLine();
                    console.log("You begin to kick.");
                    console.log("Mid swing the rat jumps and latches onto your leg with it's claws.");
                    console.log("While attempting to get the rat off you stumble and hit your head on the bench.");
                    console.log(`You take ${health} points of damage!`);

                    //Array
                    answersPush("Kick the rat.");

                    //End loop & program
                    ratComplete = true;
                    health = 0;
                    if(health <= 0) {
                        console.log("You have died.");
                        break gameRunning;
                    }
                    break ratComplete;

                case "2":
                    newLine();
                    console.log("Your inner neanderthal shows itself.");
                    console.log("You grab the rat by it's tail and throw it at the incoming train.");
                    console.log("The rat explodes on impact and it's remains splatter you.");

                    health -= 5;
                    healthDamage(5);
                    if(health <= 0) {
                        console.log("You have died.");
                        break gameRunning;
                    }

                    //Array
                    answersPush("Pick the rat up and throw it at the train.");

                    //End loop
                    ratComplete = true;
                    break ratComplete;
                    
                case "3":
                    newLine();
                    console.log("After the rat lands you immediately sprint to the other side of the platform.");
                    console.log("Upon reaching it you turn to see the rat is nowhere to be found.");
                    console.log("You are safe for the time being.");

                    //Array
                    answersPush("Walk to the other side of the platform.");

                    //End loop
                    ratComplete = true;
                    break ratComplete;

                case "4":
                    newLine();
                    console.log("You grab the slice of pizza and throw it next to the rat.");
                    console.log("The rat looks at you, then the pizza, then back at you.");
                    console.log("It stands on it's hind legs, and bows.");
                    console.log("Four turtles emerge from under the bench and help the rat carry the slice away.");
                    console.log("You can't help but feel like you've made new friends.");

                    //Array
                    answersPush("Give the rat the pizza left on the bench.");

                    //End loop
                    ratComplete = true;
                    break ratComplete;

                default:
                    newLine();
                    console.log("I do not understand.");
                    console.log("Which action do you take?");
                    console.log("1. Kick the rat.");
                    console.log("2. Pick the rat up and throw it at the train.");
                    console.log("3. Walk to the other side of the platform.");
                    console.log("4. Give the rat the pizza left on the bench.");

                }//End of train validity check
            }//End of train loop
                console.log("Your train arrives and you continue on your adventure to work.");

                //End loop
                transportationComplete = true;
                break transportationComplete;
            default:
            console.log("I do not understand.");
            console.log("Traffic looks crazy today. And your train is also having delays. Do you: ");
            console.log("1. Still decide to drive.");
            console.log("2. Still take the train.");
            transportation = userInput("(Input either 1 or 2) ");

        }//End of transportation validity check
    }//End of transportation loop

    newLine();
    console.log("After what seems like forever you finally arrive outside of your office building");
    console.log("You step inside the building.");
    console.log("The security guard makes eye contact with you and you smile back.");
    console.log("She says your boss had been trying to get into contact with you.");
    console.log("You became worried as to what it was about.");
    console.log("When you enter the your space in the office you see it had been mostly emptied.");
    console.log("You feel a presence behind you and turn around.");
    console.log("Your boss was standing there, looking very intimadting.");
    console.log("'YOU'RE FIRED' she screams to you.");

    youreFired = randomInt(30, 1);
    health -= youreFired;
    healthDamage(youreFired);
    if(health <= 0) {
        console.log("You have died.");
        break gameRunning;
    }

    console.log("Which action do you take?");
    console.log("1. 'No u'");
    console.log("2. Ask why.");
    console.log("3. Accept your fate");
    let responseToBoss = userInput("(Input a number between 1 and 3) ");

    //Array
    questionsPush("Which action do you take against your intimidating boss?");

    //Checking for valid user inputs, loops until the input is valid
    let intimadtingBossComplete = false;
    intimadtingBossComplete:
    while(intimadtingBossComplete === false) {
        switch(responseToBoss) {
            case "1":

                newLine();
                console.log("Your boss is shocked.");
                console.log("Never did she expect such a reversal!");
                console.log("She apologizes, turns around to her office and begins packing her bags.");
                console.log("Surprised that it works you take it upon yourself to be the new boss of the office!");
                noUHeal = randomInt(10, 5);
                health += noUHeal;
                console.log(`You heal ${noUHeal} health! You have ${health}HP.`)

                //Array
                answersPush("'No u'");

                //End loop
                intimadtingBossComplete = true;
                break intimadtingBossComplete;

            case "2":

                newLine();
                console.log("Your boss is astonished that you would ask such a question.");
                console.log("'Because I am all powerful!' she answers as her eyes roll into the back of her head and she levitates.");
                console.log("The last thing you see is a flash of light.");
                console.log("You are unable to comprehend what had just happened.");

                health = 0;
                console.log(`You take ${health} points of damage!`);

                //Array
                answersPush("Ask why.");

                //End loop & Program            
                intimadtingBossComplete = true;
                if(health <= 0) {
                    console.log("You have died.");
                    break gameRunning;
                }
                break intimadtingBossComplete;

            case "3":

                newLine();
                console.log("Impressed by your acceptance your boss decides to let you go freely.");
                console.log("You pack the rest of your bags and leave the office.")

                //Array
                answersPush("Accept your fate.");

                //End loop
                intimadtingBossComplete = true;
                break intimadtingBossComplete;

            default:
                newLine();
                console.log("I do not understand.");
                console.log("Which action do you take?");
                console.log("1. 'No u'");
                console.log("2. Ask why.");
                console.log("3. Accept your fate");
                responseToBoss = userInput("(Input a number between 1 and 3) ");

        } //End of Intimidating Boss Validity Check
    } //End of Intimidating Boss Loop

    newLine();
    //Go home and your plant gets angry for not being watered and attacks

    // console.log("You're confused as to why she would ask that...");
    // console.log("You take out your phone and realize it's Sunday.");
    break gameRunning;

} //End of the game

//End program review
newLine();
console.log("Thank you for playing my game!");
let review = userInput("Would you like to see review the answers you gave?(Y/N) ");
review = review.toUpperCase();

//Checking for valid user inputs, loops until the input is valid
let reviewComplete = false;
reviewComplete: 
while (reviewComplete === false) {
    switch (review) {
        case "Y":
            newLine();
            for (let i = 0; i < arrAnswers.length; i++) {
                console.log(`Question ${i + 1}: ${arrQuestions[i]}`);
                console.log(`Answer ${i + 1}: ${arrAnswers[i]}`);
            } 

            //End loop
            reviewComplete = true;
            break reviewComplete;

        case "N":
            console.log("I hope you enjoyed the game!");

            //End loop
            reviewComplete = true;
            break reviewComplete;

        default:
            console.log("I do not understand.");
            review = userInput("Would you like to see review the answers you gave?(Y/N) ");
    }
}