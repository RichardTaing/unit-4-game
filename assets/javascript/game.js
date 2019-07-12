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

// console.log(leonardo, michelangelo, donatello, raphael);

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

  // ToDo: Try and resize all images to 300?
  // $(document).ready(function() {
  //   $("img").each(function() {
  //     var maxWidth = 300;
  //     var ratio = 0;
  //     var img = $(this);

  //     if (img.width() > maxWidth) {
  //       ratio = img.height() / img.width();
  //       img.attr("width", maxWidth);
  //       img.attr("height", maxWidth * ratio);
  //     }
  //   });
  // });

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

$("#attack").on("click", function(event) {
  if (game.state === "defender selection") {
    $("#message p").text("No enemy here.");
  }

  if (game.state === "battle") {
    game.currentDefender.healthPoints -= game.player.attackPower;

    game.player.attackPower += game.player.baseAttackPower;

    if (game.currentDefender.healthPoints <= 0) {
      game.currentDefender.element.detach();

      //remove this character from game.defenders array
      var defenderIndex = game.defenders.indexOf(game.currentDefender);
      game.defenders.splice(defenderIndex, 1);

      //if there are no remaining defenders...
      if (game.defenders.length === 0) {
        game.state = "over";

        $("#message p").text("You won! GAME OVER!!!");
        $("#enemies_available").hide();
        $("#defender_section").hide();
        $("#fight_section").hide();
      } else {
        game.state = "defender selection";

        $("#defender_section").hide();
        // $("#message").hide();

        $("#message p").text(
          "You have defeated " +
            game.currentDefender.name +
            "! Choose another enemy."
        );
      }
    } else {
      game.player.healthPoints -= game.currentDefender.counterAttackPower;

      game.player.element.find("p").text(game.player.healthPoints);
      game.currentDefender.element
        .find("p")
        .text(game.currentDefender.healthPoints);

      //if player is dead...
      if (game.player.healthPoints <= 0) {
        game.state = "over";

        $("#message p").text("You have been defeated...GAME OVER!!!");
        $("#enemies_available").hide();
        $("#your_character").hide();
        $("#fight_section").hide();
      } else {
        //display the damage each character inflicts upon the other
        var lastAttack = game.player.attackPower - game.player.baseAttackPower;
        $("#message p").text(
          "You attacked " +
            game.currentDefender.name +
            " for " +
            lastAttack +
            " damage. " +
            game.currentDefender.name +
            " attacked for " +
            game.currentDefender.counterAttackPower +
            " damage."
        );
      }
    }

    if (game.state === "over") {
      $("#restart").show();
    }
  }
});

$("#restart").on("click", function(event) {
  game.player.attackPower = game.player.baseAttackPower;

  for (var i = 0; i < characters.length; i++) {
    characters[i].healthPoints = characters[i].baseHealthPoints;
  }

  game = new Game();

  for (var i = 0; i < charElements.length; i++) {
    $("#characters").append(charElements[i]);

    charElements[i].removeClass("enemy").removeClass("defender");

    charElements[i].find("p").text(characters[i].healthPoints);
  }

  $("#message p").text("");
  $("#defender_section").hide();
  $("#message").hide();
  $("#your_character").hide();
  $("#character_select").show();
  $("#restart").hide();
});
