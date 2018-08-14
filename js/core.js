//CONFIG

var version = "v1.32";
var sitename = "SpaceL";
var announces = "Welcome to SpaceL " + version;
var Game = {
    DateStarted: getDate(),
    rank: 0,
    system: 0,
    explored: [],
    inventory: [],
    cash: 100,
    cashps: 0,
    shipname: "Unusable spaceship",
};

//LOADING BASE CODE & DEBUG IF NEEDED

$(document).ready(function () {
    if (localStorage.getItem("SpaceL1") != null) { load(); }
    setInterval(function () { UpdateGame(); }, 1000);
    UpdateTexts();
    ClickEvents();
    $(".pusher").css("background-image", "url(images/bg.jpg)");
    $('.ui.sidebar').sidebar('hide');
    $("#system-select").val(texts.systemname[Game.system]);
});

function UpdateGame() {
    for (var inv in texts.items) { if (Game.inventory[inv] == null) { Game.inventory[inv] = 0; } }
    for (var m in Missions) { if (Game.explored[m] == null) { Game.explored[m] = 0; } }
    UpdateUI();
    save();
}

function explore(id) {
    if (Game.cash >= Missions[id].price) {
        if (Game.explored[id] != 1) {
            Game.cash -= Missions[id].price / 2;
            Game.cash += Missions[id].money / 2;
            Game.inventory[Missions[id].type] += Missions[id].nbr * 2;
            Game.explored[id] = 1;
            Game.rank++;
        } else {
            Game.cash -= Missions[id].price;
            Game.cash += Missions[id].money;
            Game.inventory[Missions[id].type] += Missions[id].nbr;
            Game.rank++;
        }
    } else {
        console.log("Not enough cash");
    }
    UpdateUI();
    save();
}

function sellitem(id, qty) {
    if (Game.inventory[id] >= qty) {
        Game.cash += Station[id].value * SystemMult[Game.system][id] * qty;
        Game.inventory[id]-= qty;
    }
    UpdateUI();
    save();
}