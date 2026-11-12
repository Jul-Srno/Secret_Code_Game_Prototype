const LEVELS = {
  chick: {
    title: "Le cadet junior du Parti",
    allowedAttempts: 12
  },
  hen: {
    title: "La glorieuse Commissaire du Peuple",
    allowedAttempts: 15
  },
  duck: {
    title: "L'honorable Superviseur régional",
    allowedAttempts: 15
  },
  rooster: {
    title: "Le Premier Secrétaire suprême et Protecteur de la Basse-Cour",
    allowedAttempts: 20
  },
  pig: {
    title: "Le Glorieux, Éternel et Suprême Grand Timonier, Éternel Protecteur suprême des Œufs du Peuple",
    allowedAttempts: 15
  }
}

const STATES = {
  INIT: "init",
  PLAYING: "playing",
  VICTORY: "victory",
  DEFEAT: "defeat",
  RESTART: "restart",
  STOPPED: "stopped",
  COMPLETED: "completed"
}

// Centralizes the current game state, player data, statistics, round data, timers, and door states.
const gameData = {
  state: STATES.INIT,

  round: {
    level: "chick",
    allowedAttempts: 12,
    attempts: 0,
    computerCode: []
  },

  stats: {
    wins: 0,
    defeats: 0
  }
}

const stateHandlers = {
  [STATES.INIT]: {
    onEnter() {
      // Initialize the game
    }
  },

  [STATES.PLAYING]: {
    onEnter() {
      // Start a new round
    }
  },

  [STATES.VICTORY]: {
    onEnter() {
      // Handle victory
    }
  },

  [STATES.DEFEAT]: {
    onEnter() {
      // Handle defeat
    }
  },

  [STATES.RESTART]: {
    onEnter() {
      // Prepare a new history run
    }
  },

  [STATES.STOPPED]: {
    onEnter() {
      // Stop the game
    }
  },

  [STATES.COMPLETED]: {
    onEnter() {
      // Handle final victory
    }
  }
}

const PROVOCATIONS = {
  chick : {
    text : `Cadet Chickolaï Peepolini says : 
    
    🐣 PIOU PIOU ! Tu crois pouvoir me battre ? Même mes œufs sont plus malins que toi !🐣`,
    sound: new Audio("./resources/sounds/Peep.mp3")
  },

  hen : {
    text: `Herr Brunhilde Henocescu says :
    
    🐔 COT COT COT ! La victoire est garantie par le Parti ! Ta défaite aussi ! 🐔`,
    sound: new Audio("./resources/sounds/Chuckle.mp3")
  },

  duck : {
    text: `Comissar Duckimir von Quackquack says :
    
    🦆 COIN COIN ! Ici, c'est moi qui donne les ordres ! Et toi, tu ferais mieux d'apprendre à obéir ! 🦆`,
    sound: new Audio("./resources/sounds/Quack(magiaZ-pixabay).mp3")
  },

  rooster : {
    text: `First Secretary Roostislav says :
    
    🐓 COCORICO ! Prépare-toi à courber l'échine, camarade ! La basse-cour ne connaît qu'un seul maître !🐓`,
    sound: new Audio("./resources/sounds/Cockcrow.mp3")
  },

  pig : {
    text: `Le gGrand tTmonier Friedrich Francisco Bacon Ribsonovitch says :
    
    🐷 GROIN GROIN ! Misérable vermisseau ! Tu oses défier Friedrich Francisco Bacon Ribsonovitch, 
    Glorieux, Éternel et Suprême Grand Timonier, Éternel Grand Protecteur des Œufs du Peuple et 
    Lumière immortelle de la République ?! 
    
    Souviens-toi, camarade : le Grand Timonier ne se trompe jamais, le Parti ne connaît pas l'échec 
    et la victoire appartient toujours à celui qui sert fidèlement la République !`,
    sound: new Audio("./resources/sounds/Oink(magiaz-porco-326303).mp3")
  }
}

const ENDINGS = {

  nextLevel: {
    text: () => `${LEVELS[gameData.round.level].title} est vaincu${gameData.round.level === "hen" ? "e" : ''}. Félicitations !`,
    sound: new Audio("./resources/sounds/Applause.mp3")
  },

  victory :  {
    text: `LA RÉVOLUTION A TRIOMPHÉ !

Camarade, vous l'avez fait !

Friedrich Francisco Bacon Ribsonovitch, Glorieux, Éternel et Suprême Grand Timonier, 
Éternel Grand Protecteur des Œufs du Peuple, a été renversé !

Son règne de terreur, ses discours interminables et ses confiscations d'œufs appartiennent 
désormais au passé.

Les coffres sont ouverts, les œufs sont libérés et la basse-cour retrouve enfin sa liberté !

Quant à notre ancien Grand Dirigeant, il a été déchu de tous ses titres et nommé :

SUPRÊME GRAND MAÎTRE IMPÉRIAL DE L'ASSAINISSEMENT PORCIN ET NETTOYEUR OFFICIEL DE LA PORCHERIE DU PEUPLE !

Une nouvelle ère commence !

GLOIRE À LA RÉVOLUTION ! VIVE LA LIBERTÉ DES ŒUFS !`,

    sound: new Audio("./resources/sounds/Cheering(u_xg7ssi08yr-crowd-cheering-379666).mp3")
  },

  defeat: { 
    text: (computerCode) => `Vous avez échoué

    Veuillez vous présenter à la basse-cour la plus proche pour y suivre un programme de rééducation.
    
    
    Le code secret était ${computerCode.join("")}`,
    sound: new Audio("./resources/sounds/Mockery.mp3")
  },

  gameOver: {
    text: `Tant que personne ne se dressera contre le pouvoir, la tyrannie continuera de régner sur la basse-cour.
         Mais rien n'est perdu, camarade ! Tu peux toujours revenir et reprendre le combat!`
  }
}

export {
  PROVOCATIONS,
  ENDINGS,
  LEVELS,
  STATES,
  gameData,
  stateHandlers
}