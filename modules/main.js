import {
  PROVOCATIONS,
  ENDINGS
 } from "./config.js";

    
function createCode() {
  let code = [];
  for (let i = 0; i < 4; i++) {
    code.push(Math.floor(Math.random() * 10));
  }
  return code;
}

function compareCode(userCode, code) {
  let correctCount = 0;
  let result = "";

  for (let i = 0; i < 4; i++) {
    if (userCode[i] === code[i]) {
      correctCount++;
    }
  }

  result += "🟢".repeat(correctCount);
  result += "🔴".repeat(4 - correctCount);

  alert(result);
  return correctCount === 4;
}

function jeu() {
  let code = createCode();
  let essai = 0
  while (essai < 25) {
  let solution = prompt("Quel est le code secret à 4 chiffres?");
  let userCode = solution.split("").map(Number);

  if (userCode.length === 4 && userCode.every(num => !isNaN(num))) {
    essai++;
    if (compareCode(userCode, code)) {
      ENDINGS.victory.sound.play();
       setTimeout(() => {
        document.body.offsetHeight;
      }, 300);
      alert(ENDINGS.victory.text);
      essai = 0;
      break;
    } else {
      if (essai === 5) {
    PROVOCATIONS.chick.sound.play();
    setTimeout(() => {
        document.body.offsetHeight;
    }, 300);
    alert(PROVOCATIONS.chick.text);
} else if (essai === 10) {
    PROVOCATIONS.hen.sound.play();
    setTimeout(() => {
      document.body.offsetHeight
    }, 300);
    alert(PROVOCATIONS.hen.text);
} else if (essai === 15) {
    PROVOCATIONS.duck.sound.play();
    setTimeout(() => {
      document.body.offsetHeight
    }, 300);
    alert(PROVOCATIONS.duck.text);
} else if (essai === 20) {
    PROVOCATIONS.rooster.sound.play();
    setTimeout(() => {
      document.body.offsetHeight
    }, 300);
    alert(PROVOCATIONS.rooster.text);
} else if (essai === 25) {
    ENDINGS.defeat.sound.play();
    setTimeout(() => {
      document.body.offsetHeight
    }, 300);
        alert(ENDINGS.defeat.text);
        alert(ENDINGS.endGame.text);
    break;
}
}
}
}
compareCode(userCode,code);
}
document.getElementById("challenge-button").addEventListener("click", jeu);