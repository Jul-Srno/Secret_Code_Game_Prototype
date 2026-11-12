import {
  ENDINGS,
  STATES,
  gameData
} from "./config.js"

function createComputerCode() {
  const computerCode = []

  for (let i = 0; i < 4; i++) {
    computerCode.push(Math.floor(Math.random() * 10))
  }

  return computerCode
}

function enterPlayerCode() {
  let playerCode
  do {
    playerCode = prompt("Trouvez les 4 chiffres du code secret !")
    if (!playerCode || !playerCode.trim()) {
      alert("Sabotage détécté! Fuyez ou le camp de rééducation vous attends !")
      return
    } else if (!/^\d{4}$/.test(playerCode)) {
      alert("Code invalide! Entrez 4 chiffres uniquement")
      continue
    } else {
      return playerCode
    }
  } while (!/^\d{4}$/.test(playerCode))
}

function compareCode(level, computerCode, playerCode) {

  let board = []
  let object = {}
  let greenCount, yellowCount, redCount

  const answer = playerCode.split("")

  let array = answer.map(num => Number(num))

  const remainingComputer = computerCode.slice()
  const remainingPlayer = array.slice();

  switch(level) {
    case "chick" :
      for (let i = 0; i < remainingComputer.length; i++) {
        if (remainingPlayer[i] === remainingComputer[i]) {
          board[i] = "🟢"
          remainingPlayer[i] = ""
          remainingComputer[i] = ""
        }
      }
            
      for (let i = 0; i < remainingComputer.length; i++) {
        if (remainingPlayer[i] !== "" && remainingComputer.includes(remainingPlayer[i])) {
          board[i] = "🟡"
          remainingComputer[remainingComputer.indexOf(remainingPlayer[i])] = ""
          remainingPlayer[i] = ""
        } else if (remainingPlayer[i] !== "") {
          board[i] = "🔴"
        }
      }
    break

    case "hen":
      greenCount = 0;
      for (let i = 0; i < computerCode.length; i++) {
        if (array[i] === computerCode[i]) {
          greenCount++
          remainingPlayer[i] = ""
          remainingComputer[i] = ""
        }
      } 
    
      yellowCount = 0;
      redCount = 0;
      for (let i = 0; i < computerCode.length; i++) {
        if (remainingPlayer[i] !== "" && remainingComputer.includes(remainingPlayer[i])) {
          yellowCount++
            remainingComputer[remainingComputer.indexOf(remainingPlayer[i])] = ""
            remainingPlayer[i] = ""
        } else if (remainingPlayer[i] !== "") {
          redCount++
        }
      }

      board.push(...Array(greenCount).fill("🟢"));
      board.push(...Array(yellowCount).fill("🟡"));
      board.push(...Array(redCount).fill("🔴"));
      break

    case "duck":
      for (let i = 0; i < computerCode.length; i++) {
      if (array[i] === computerCode[i]) board[i] = "🟢"
      else board[i] = "🔴"
    }
break

    case "rooster":
    case "pig":
      greenCount = 0;
      redCount = 0;
      for (let i = 0; i < computerCode.length; i++) {
        if (array[i] === computerCode[i]) greenCount++
        else redCount++
      }

  board.push(...Array(greenCount).fill("🟢"));
  board.push(...Array(redCount).fill("🔴"));
  break
}
alert(board.join(""))
object.computerCode = computerCode
object.board = board
return object
}

function evaluateCode(counter, result) {
  const { board } = result

  if (board.join("") === "🟢🟢🟢🟢") {
    return STATES.VICTORY
  } else if (counter >= gameData.round.allowedAttempts) {
    return STATES.DEFEAT
  }
}

function launchRound() {
  gameData.round.attempts = 0
  gameData.round.computerCode = createComputerCode()

  while (gameData.round.attempts < gameData.round.allowedAttempts) {
    let playerCode = enterPlayerCode()
    if (!playerCode) {
      return STATES.STOPPED
   }
    gameData.round.attempts++
    let match = compareCode(
      gameData.round.level,
      gameData.round.computerCode,
      playerCode)
    let verdict = evaluateCode(gameData.round.attempts, match)
    if (verdict === STATES.VICTORY || verdict === STATES.DEFEAT) return verdict
  }
}

export { 
  launchRound 
}