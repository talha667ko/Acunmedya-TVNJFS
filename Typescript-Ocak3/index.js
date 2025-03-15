var x = 5;
var sentence = "Hi I'm Talha";
var isStudent = true;
var numbers = [1, 2, 3, 4, 5];
var friends;
friends = ["Karim", 21, "in France"];
friends.push("Alperen", 19, "in Turkey");
friends = ["Entela", 20, "in Greece"];
var Food;
(function (Food) {
    Food["First"] = "TACOS";
    Food["Second"] = "CROISSANT";
    Food["Third"] = "MACCARON";
})(Food || (Food = {}));
;
var myFood;
myFood = "KEBAB";
console.log(myFood);
myFood = 3;
console.log(myFood);
var myFood2 = undefined;
var fighter = {
    name: "Talha",
    age: 21,
    dicipline: "Boxing",
    weakness: "Jiu Jitsu",
    strength: "Striking",
    fight: function () {
        console.log("Takedown Defense, knee up the middle, and finish with a hook");
    }
};
console.log(fighter);
fighter.fight();
