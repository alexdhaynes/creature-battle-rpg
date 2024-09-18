{
  "states": {
    "StatusMessage": {
      "name": "StatusMessage",
      "isInitial": true,
      "isFinal": false
    },
    "MainMenu": {
      "name": "MainMenu",
      "isInitial": false,
      "isFinal": false
    },
    "AttacksScreen": {
      "name": "AttacksScreen",
      "isInitial": false,
      "isFinal": false
    },
    "CreaturesScreen": {
      "name": "CreaturesScreen",
      "isInitial": false,
      "isFinal": false
    },
    "InventoryScreen": {
      "name": "InventoryScreen",
      "isInitial": false,
      "isFinal": false
    },
    "MenuClosed": {
      "name": "MenuClosed",
      "isInitial": false,
      "isFinal": true
    }
  },
  "transitions": [
    {
      "from": "StatusMessage", // "a wild EnemyCat appeared!
      "to": "StatusMessage", // "I choose... OrangeCat!"
      "trigger": "ok",
      "payload": ["message1", "message2"]
    },
    {
      "from": "StatusMessage", // "I choose... OrangeCat!"
      "to": "MainMenu",
      "trigger": "timer"
    },
    {
      "from": "MainMenu",
      "to": "AttacksScreen",
      "trigger": "ok",
      "payload": "navItem: fight"
    },
    {
      "from": "AttacksScreen",
      "to": "StatusMessage", //EnemyCat used hiss!
      "trigger": "ok",
      "payload": {
        "playerAttack": "slash",
        "enemyAttack": "hiss"
      }
    },
    {
      "from": "StatusMessage", //EnemyCat used hiss!
      "to": "StatusMessage", // OrangeCat used scratch!
      "trigger": "timer"
    },
    {
      "from": "StatusMessage",
      "to": "MainMenu",
      "trigger": "timer"
    },
    {
      "from": "MainMenu",
      "to": "CreaturesScreen",
      "trigger": "ok",
      "payload": "navItem: creatures"
    },
    {
      "from": "CreaturesScreen",
      "to": "StatusMessage", // You have chosen TabbyCat!
      "trigger": "ok",
      "payload": "navItem: creatures"
    },
    {
      "from": "MainMenu",
      "to": "InventoryScreen",
      "trigger": "ok",
      "payload": "navItem: item"
    },
    {
      "from": "InventoryScreen",
      "to": "StatusMessage", // You have chosen A Potion!
      "trigger": "ok",
      "payload": "navItem: creatures"
    },
    {
      "from": "MainMenu",
      "to": "StatusMessage", // You can't flee!
      "trigger": "ok",
      "payload": "navItem: flee"
    },
    {
      "from": "MainMenu",
      "to": "MenuClosed",
      "trigger": "ok",
      "payload": "navItem: flee"
    }
  ]
}
