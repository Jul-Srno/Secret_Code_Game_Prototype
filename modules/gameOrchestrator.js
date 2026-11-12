import {
  PROVOCATIONS,
  ENDINGS,
  LEVELS,
  STATES,
  gameData,
  stateHandlers
} from "./config.js"

import { 
  launchRound 
} from "./gameplay.js"

function setState(newState) {
  gameData.state = newState;

  if (typeof stateHandlers[newState] === "function") {
    stateHandlers[newState]();
  } else {
    stateHandlers[newState]?.onEnter?.()
  }
}


function getStateConfig() {
  return stateHandlers[gameData.state]
}

function handleGameResult(result) {
  switch (result) {
    case STATES.VICTORY:
      setState(STATES.VICTORY);
      break;

    case STATES.RESTART:
      setState(STATES.RESTART);
      break;

    case STATES.STOPPED:
      setState(STATES.STOPPED);
      break;
  }
}

function provocation(opponent) {
  ENDINGS.nextLevel.sound.pause();
  ENDINGS.nextLevel.sound.currentTime = 0;
  PROVOCATIONS[opponent].sound.play();
  setTimeout(() => {
    document.body.offsetHeight;
  }, 300);
  alert(PROVOCATIONS[opponent].text);
}

function launchGame() {
  let result;
  do {
    result = launchRound();
    if (result === STATES.STOPPED || result === STATES.VICTORY) {
      return result
    }
    if (result === STATES.DEFEAT) {
      ENDINGS.defeat.sound.play();
      setTimeout(() => {
        document.body.offsetHeight;
      }, 300);
      alert(ENDINGS.defeat.text(gameData.round.computerCode))
      const playAgain = confirm(`Souhaitez-vous reprendre la lutte ?`);
      if (!playAgain) {
        alert(ENDINGS.gameOver.text)
        return STATES.STOPPED;
      }
      return STATES.RESTART;
    }
  } while (true)
}

function chickLevel() {
  gameData.round.level = "chick"
  gameData.round.allowedAttempts = LEVELS[gameData.round.level].allowedAttempts
  provocation("chick")
  return launchGame()
}

function henLevel() {
  gameData.round.level = "hen"
  gameData.round.allowedAttempts = LEVELS[gameData.round.level].allowedAttempts
  provocation("hen")
  return launchGame()
}

function duckLevel() {
  gameData.round.level = "duck"
  gameData.round.allowedAttempts = LEVELS[gameData.round.level].allowedAttempts
  provocation("duck")
  return launchGame()
}

function roosterLevel() {
  gameData.round.level = "rooster"
  gameData.round.allowedAttempts = LEVELS[gameData.round.level].allowedAttempts
  provocation("rooster")
  return launchGame()
}

function pigLevel() {
  gameData.round.level = "pig"
  gameData.round.allowedAttempts = LEVELS[gameData.round.level].allowedAttempts
  provocation("pig")
  return launchGame()
}

function historyMode() {
  const opponents = [ chickLevel, henLevel, duckLevel, roosterLevel, pigLevel ]
  let opponentIndex = 0
  while (opponentIndex < opponents.length) {
    if (gameData.state === STATES.INIT || gameData.state === STATES.RESTART) {
      setState(STATES.PLAYING)
    }
    const result = opponents[opponentIndex]()
    handleGameResult(result)
  switch (result) {
    case STATES.RESTART:
      opponentIndex = 0
      ENDINGS.nextLevel.sound.pause()
      ENDINGS.nextLevel.sound.currentTime = 0
      ENDINGS.defeat.sound.pause()
      ENDINGS.defeat.sound.currentTime = 0
      ENDINGS.victory.sound.pause();
      ENDINGS.victory.sound.currentTime = 0
      break
    case STATES.STOPPED:
      break;
    case STATES.VICTORY:
      opponentIndex++;
      if (opponentIndex < opponents.length) {
        ENDINGS.nextLevel.sound.play()
         setTimeout(() => {
          document.body.offsetHeight
        }, 300);
        alert(ENDINGS.nextLevel.text())
        setState(STATES.PLAYING)
      } else {
        setState(STATES.COMPLETED)
        ENDINGS.victory.sound.play()
        setTimeout(() => {
          document.body.offsetHeight
        }, 300);
        alert(ENDINGS.victory.text)
      }
      break
  }
    if (result === STATES.STOPPED) 
     { break;}
  }
}

export { historyMode }