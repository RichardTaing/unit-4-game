//Option Two: RPG Game (Challenge)

function Character(
  name,
  id,
  healthPoints,
  attackPower,
  counterAttackPower,
  imgPath
) {
  this.name = name;
  9;
  this.id = id;
  this.healthPoints = healthPoints;
  this.baseHealthPoints = healthPoints;
  this.attackPower = attackPower;
  this.baseAttackPower = attackPower;
  this.counterAttackPower = counterAttackPower;
  this.imgPath = "assets/images/" + imgPath + ".png";
  this.element = null;
}

var leonardo = new Character("Leonardo", "leonardo", 120, 8, 12, "leonardo");
var michelangelo = new Character(
  "Michelangelo",
  "michelangelo",
  100,
  15,
  8,
  "michelangelo"
);
var donatello = new Character(
  "Donatello",
  "donatello",
  150,
  6,
  15,
  "donatello"
);
var raphael = new Character("Raphael", "raphael", 180, 3, 25, "raphael");

var characters = [leonardo, michelangelo, donatello, raphael];

var $leonardo = $("<div>");
var $michelangelo = $("<div>");
var $donatello = $("<div>");
var $raphael = $("<div>");

var charElements = [$leonardo, $michelangelo, $donatello, $raphael];

//dynamically create jquery elements for each character
for (var i = 0; i < characters.length; i++) {
  charElements[i].addClass("char-container");

  charElements[i].attr("id", characters[i].id);

  //add a header displaying the character's name
  var $head = $("<h3>");
  $head.text(characters[i].name);
  charElements[i].append($head);

  //add an image of the character
  var $img = $("<img>");
  $img.attr("src", characters[i].imgPath);
  $img.attr("alt", characters[i].name);
  charElements[i].append($img);

  //add character's health points to element
  var $hp = $("<p>");
  $hp.text(characters[i].healthPoints);
  charElements[i].append($hp);

  characters[i].element = charElements[i];

  $("#characters").append(charElements[i]);
}

//game object holds the state of the game
function Game() {
  this.state = "selection";
  this.player = null;
  this.defenders = [];
  this.currentDefender = null;
}

var game = new Game();

$("#your_character").hide();
$("#enemies_available").hide();
$("#fight_section").hide();
$("#defender_section").hide();
$("#message").hide();
$("#restart").hide();

$(".char-container").on("click", function(event) {
  if (game.state === "selection") {
    //whichever character is picked, assign game.player to that character
    switch ($(this).attr("id")) {
      case "leonardo":
        game.player = leonardo;
        break;
      case "michelangelo":
        game.player = michelangelo;
        break;
      case "donatello":
        game.player = donatello;
        break;
      case "raphael":
        game.player = raphael;
        break;
    }

    game.state = "defender selection";

    for (var i = 0; i < characters.length; i++) {
      if (characters[i] !== game.player) {
        game.defenders.push(characters[i]);
      }
    }

    $("#you").append(game.player.element);

    for (var i = 0; i < game.defenders.length; i++) {
      game.defenders[i].element.addClass("enemy");
      $("#enemies").append(game.defenders[i].element);
    }

    //show the your_character and enemies_available divs
    $("#your_character").show();
    $("#enemies_available").show();
    $("#character_select").hide();
  }
});

$("#enemies").on("click", ".enemy", function(event) {
  if (game.state === "defender selection") {
    $("#message p").text("");
    $("#message").show();
    $("#fight_section").show();

    //assign game.currentDefender to the chosen character
    switch ($(this).attr("id")) {
      case "leonardo":
        game.currentDefender = leonardo;
        break;
      case "michelangelo":
        game.currentDefender = michelangelo;
        break;
      case "donatello":
        game.currentDefender = donatello;
        break;
      case "raphael":
        game.currentDefender = raphael;
        break;
    }

    game.state = "battle";

    $("#defender").append(game.currentDefender.element);
    game.currentDefender.element.removeClass("enemy");
    game.currentDefender.element.addClass("defender");

    $("#defender_section").show();
  }
});

// todo: attack area

// todo: buttons : attack & restart
// todo: character damage display
// todo: character attack display

// todo: restart
