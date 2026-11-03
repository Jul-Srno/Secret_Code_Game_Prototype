const PROVOCATIONS = {
  chick : {
    text : `🐣 PIOU PIOU, TU TROUVERAS PAS ! 🐣`,
    sound: new Audio("./resources/sounds/Peep.mp3")
  },

  hen : {
    text: `🐔 TU TROUVERAS JAMAIS, COT COT COT! 🐔`,
    sound: new Audio("./resources/sounds/Chuckle.mp3")
  },

  duck : {
    text: `🦆 COIN COIN, ABANDONNES ! 🦆`,
    sound: new Audio("./resources/sounds/Quack(magiaZ-pixabay).mp3")
  },

  rooster : {
    text: `🐓 COCORICO, TU ES AU BORD DU GOUFFRE ! PLUS QUE 5 ESSAIS 🐓`,
    sound: new Audio("./resources/sounds/Cockcrow.mp3")
  }
}

const ENDINGS = {
  victory :  {
    text: `🥳 VICTOIRE ! 👏 Tout rentre dans l’ordre, et Cocotine retourne pondre en silence 🥚☺️`,
    sound: new Audio("./resources/sounds/Applause.mp3")
  },

  defeat: { 
    text: `🐔🐓 Tu as perdu... Quelle honte, toute la basse-cour se moque de toi ! 🐣🦆`,
    sound: new Audio("./resources/sounds/Mockery.mp3")
  },

  endGame: {
    text: `🦧 Ne t’inquiètes pas, le ridicule n’a jamais tué personne. Tu feras (peut-être) mieux la prochaine fois ! 🦧`
  }
}

export {
  PROVOCATIONS,
  ENDINGS
}