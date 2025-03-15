let x:number = 5;
let sentence:string = "Hi I'm Talha";
let isStudent:boolean = true;
let numbers:number[] = [1,2,3,4,5];
let friends: [string, number, string];

friends = ["Karim", 21, "in France"];
friends.push("Alperen", 19, "in Turkey");
friends = ["Entela", 20, "in Greece"];

enum Food {
    First = "TACOS",
    Second = "CROISSANT", 
    Third = "MACCARON"
};

let myFood: any;

myFood = "KEBAB";
console.log(myFood);
myFood = 3;
console.log(myFood);

let myFood2: void = undefined;

interface Fighter {
    name: string;
    age: number;
    dicipline: string;
    weakness: string;
    strength: string;
    fight(): void;
}

const fighter: Fighter = {
    name: "Talha",
    age: 21,
    dicipline: "Boxing",
    weakness: "Jiu Jitsu",
    strength: "Striking",
    fight: function() {
        console.log("Takedown Defense, knee up the middle, and finish with a hook");
    }
}

console.log(fighter);
fighter.fight();