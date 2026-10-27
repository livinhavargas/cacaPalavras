"use strict";

const MAX_ATTEMPTS = 6;
const WORD_LENGTH = 5;
const STORAGE_PREFIX = "palavra-do-dia";
const ANSWERS = [
  "SIGMA", "TROLL", "MEMES", "AURAS", "MOGAR", "LARPA", "GYATT", "RATIO",
  "VIRAL", "PRINT", "TREND", "HATER", "POSTA", "TWEET", "RISOS", "HUMOR",
  "PIXEL", "BLOGS", "LOGIN", "VIRUS", "DANKS", "FLOPS", "FAMOS", "GRUPO",
  "TEXTO", "VIDEO", "MURAL", "PODRE", "MALHA", "HYPEA", "BIRUTA"
];
const ALLOWED_GUESSES = new Set(`
ABALO ABATE ABETO ABRIL ACASO ACENO ACESA ACESO ACIDO ACIMA ACODE ACOES ACOUG
ADAGA ADEUS ADORA AFETO AGORA AGUAS AJUDA AJUDE ALADO ALBUM ALDEA ALEGR ALICE
ALMAS ALTAS ALTOS AMADA AMADO AMAGO AMIGA AMIGO AMPLA AMPLO ANAIS ANDAR ANEIS
ANIMA ANIMO ANTES APICE APITO APOIO APORA APTAS APTOS AQUEM AROMA ARROZ ARTES
ASSIM ASTRO ATACA ATEST ATLAS ATOMO ATRAS ATUAL AUDaz AULAS AUREA AUTOR AVIAO
AVISO AZEDO BAIXA BAIXO BANCO BANHO BARCO BARRA BASTA BATOM BEIJO BELAS BELOS
BERRO BICHO BOLAS BOLSO BOLSA BOLHA BONDE BONSA BORDA BORRA BOSSA BRASA BRAVO
BREVE BRISA BROTO BRUTO CABEM CABOS CABRA CACAU CACOS CADER CAIXA CALMA CALOR
CAMPO CANAL CANCA CANTO CARGA CARNE CARRO CARTA CASAL CASAS CASCO CASOS CAUSA
CELTA CENAS CENTO CERTO CHAMA CHAVE CHEFE CHORO CHUVA CICLO CIENT CINCO CINTA
CIRCO CLARA CLARO CLIMA CLUBE COBRA COISA COLAR COLHE COLOU COMER COMUM CONTA
CONTO COPIA CORAL CORDA CORES CORPO CORRE COURO CRAVO CRIME CRISE CRIVO CROMO
CRUZA CUBOS CULPA CUMPR CURSO DADOS DANCA DEDOS DELTA DENTE DEUSA DEVER DEZEM
DIETA DIGNA DIGNO DISCO DIVAS DOIDA DOIDO DOMAR DONOS DORAO DORME DOUTO DRAMA
DUPLA DUPLO DURAS DUROS ECOAR EDICA EFEIT ELEVA ELITE EMAIL EMPRE ENTRA ENVIO
ERROS ESCOL ESPAO ESTAR ETICA EVITA EXATO EXAME EXTRA FALHA FALSO FALTA FAMOS
FARDA FAROL FASES FATAL FATOS FAUNA FELIZ FERAS FERRO FIBRA FICAR FICHA FILME
FINAL FINGE FIRME FLORA FLUXO FOCOU FOLHA FONES FORCA FORMA FORTE FOSSE FOTOS
FRASE FREIO FRENTE FRUTA FUNDO FURIA FUTURO GATOS GERAL GESTO GIGAS GLOBO
GOLPE GOSTO GRACA GRAUS GRAVE GRUPO GUETO GUISA HABIL HASTE HOBBY HOMEM HONRA
HORAS HOTEL IDEAL IDEIA IDIOM IGUAL ILHAS IMAGEM IMUNE INDIO INOVA INSTA JANEL
JOGAR JOGOS JOVEM JUROS JUSTO LADOS LAGOA LANCE LARGA LARGO LARVA LAVAR LEITE
LETRA LIGAR LIGUE LIMAO LIMPA LIMPO LINDA LINDO LINHA LIRIO LIVRE LIVRO LUGAR
LUNAR LUZES MACIA MACIO MACRO MADRE MAGIA MAIOR MALES MALHA MANIA MAPAS MARCA
MARES MARTE MASSA MENTE MESAS METAS METRO MIMOS MINHA MINHO MINOR MISSA MODAS
MODER MOEDA MOLHO MONTA MORAL MORAR MORRO MOTEL MUNDO MUROS MUSAS NATAL NAVES
NEGRO NERDS NINHO NIVEL NORTE NUVEM OBRAS OCEAN OCUPA OESTE OITAO OITAS OLHAR
OLHOS ONTEM OPERA OPINA OPTAR ORDEM OUVIR PADRA PADRE PAGAR PAGUE PAIRS PALCO
PALHA PALMA PALMO PANDA PAPEL PARAR PARES PARTE PASSA PASTA PATOS PAUTA PEDRA
PEDRO PEGAR PEIXE PENSA PERDA PERTO PESCA PESEI PESOS PETRA PICOS PILHA PINTA
PINTU PIORA PIPAS PISTA PLANO PLATA PLEBE PLENA PLENO PNEUS POBRE PODER POEMA
POESI POETA POLAR POLVO POMBO PONTE PONTO PORCA PORCO PORTA PORTO POSSE POSTO
POUCO PRATA PRATO PRAZO PRECO PREGA PRETA PRETO PRIME PRIMO PRINH PRISA PROSA
PROVA PULGA PULSO PUNHO QUASE QUEDA QUERO QUOTA RADIO RAIVA RAMOS RANCO RAPAZ
RAPTO RAROS RASTO RAVIA RAZAO REAIS REINO RELOG REMAR REMIX RENDA RENOV RESPE
RESTO RETRO RITMO ROBOS ROCHA RODAS ROLHA ROMBO ROSAS ROTAS RUIDO SABER SABIA
SABOR SACOS SAIDA SALAS SALDO SALVA SANTA SANTO SAUDE SECOS SEGUE SEIOS SELVA
SENHA SENHO SERES SERIA SERIO SERRA SORTE SUBIR SUCOS SUAVE SUCIA SUPER TAMPA
TANGA TANTO TARDI TATOO TECLA TELAS TEMAS TEMPO TENDA TENIS TERMO TERNO TERRA
TESTE TEXTO TIGRE TINTA TIRAR TITIA TOLDO TOMAR TONEL TOPOS TORRE TOTAL TOURO
TRAMA TRATO TRECO TREVO TRIGO TRONO TROCA TROCO TUBOS TUMBA TUNEL TURMA UNICO
URANO URINA USADO USINA VAGAS VAGOS VALES VALOR VAMOS VAPOR VARIA VASOS VASTO
VELHO VENDA VERDE VERME VERSO VESTE VETOR VIOLA VIRAR VISTA VIVER VOCAL VOGAL
VOLTA VOTOS ZEBRA ZELAR ZONAS
`.trim().split(/\s+/).map(normalizeWord));
ANSWERS.forEach((word) => ALLOWED_GUESSES.add(word));

const today = getUtcDateKey();
const answer = ANSWERS[dayNumber(today) % ANSWERS.length];

const elements = {
  home: document.querySelector("#home-screen"),
  game: document.querySelector("#game-screen"),
  start: document.querySelector("#start-game"),
  startLabel: document.querySelector("#start-label"),
  board: document.querySelector("#board"),
  keyboard: document.querySelector("#keyboard"),
  message: document.querySelector("#game-message"),
  result: document.querySelector("#result-panel"),
  resultEyebrow: document.querySelector("#result-eyebrow"),
  resultTitle: document.querySelector("#result-title"),
  resultDescription: document.querySelector("#result-description"),
  howModal: document.querySelector("#how-modal"),
  statsModal: document.querySelector("#stats-modal"),
  toast: document.querySelector("#toast")
};

let game = loadDailyGame();
let stats = loadStats();
let toastTimer;

function normalizeWord(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}

function getUtcDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function dayNumber(dateKey) {
  return Math.floor(Date.parse(`${dateKey}T00:00:00Z`) / 86400000);
}

function dateLabel(dateKey) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    timeZone: "UTC"
  }).format(new Date(`${dateKey}T00:00:00Z`));
}

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.error(`Não foi possível carregar "${key}" do armazenamento local.`, error);
    announce("Não foi possível carregar seu progresso salvo.");
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Não foi possível salvar "${key}" no armazenamento local.`, error);
    announce("Não foi possível salvar seu progresso neste aparelho.");
    return false;
  }
}

function loadDailyGame() {
  const saved = readStorage(`${STORAGE_PREFIX}:daily:${today}`, null);
  if (
    saved &&
    Array.isArray(saved.guesses) &&
    saved.guesses.every((guess) => typeof guess === "string" && guess.length === WORD_LENGTH) &&
    saved.guesses.length <= MAX_ATTEMPTS &&
    (saved.finished === undefined || typeof saved.finished === "boolean")
  ) {
    return { guesses: saved.guesses, finished: Boolean(saved.finished), won: Boolean(saved.won) };
  }
  return { guesses: [], finished: false, won: false };
}

function loadStats() {
  const saved = readStorage(`${STORAGE_PREFIX}:stats`, {});
  return {
    currentStreak: Number.isInteger(saved.currentStreak) ? saved.currentStreak : 0,
    bestStreak: Number.isInteger(saved.bestStreak) ? saved.bestStreak : 0,
    totalGames: Number.isInteger(saved.totalGames) ? saved.totalGames : 0,
    totalWins: Number.isInteger(saved.totalWins) ? saved.totalWins : 0,
    lastPlayedDate: typeof saved.lastPlayedDate === "string" ? saved.lastPlayedDate : "",
    lastWord: typeof saved.lastWord === "string" ? saved.lastWord : ""
  };
}

function saveGame() {
  writeStorage(`${STORAGE_PREFIX}:daily:${today}`, game);
}

function saveStats() {
  writeStorage(`${STORAGE_PREFIX}:stats`, stats);
}

function evaluateGuess(guess) {
  const result = Array(WORD_LENGTH).fill("tile-absent");
  const remaining = answer.split("");

  for (let index = 0; index < WORD_LENGTH; index += 1) {
    if (guess[index] === answer[index]) {
      result[index] = "tile-correct";
      remaining[index] = "";
    }
  }

  for (let index = 0; index < WORD_LENGTH; index += 1) {
    if (result[index] === "tile-correct") continue;
    const matchIndex = remaining.indexOf(guess[index]);
    if (matchIndex !== -1) {
      result[index] = "tile-present";
      remaining[matchIndex] = "";
    }
  }

  return result;
}

function buildBoard() {
  elements.board.replaceChildren();
  for (let rowIndex = 0; rowIndex < MAX_ATTEMPTS; rowIndex += 1) {
    const row = document.createElement("div");
    row.className = "board-row";
    row.setAttribute("role", "row");
    row.setAttribute("aria-label", `Tentativa ${rowIndex + 1}`);

    for (let columnIndex = 0; columnIndex < WORD_LENGTH; columnIndex += 1) {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.setAttribute("role", "gridcell");
      const guess = game.guesses[rowIndex];
      if (guess) {
        tile.textContent = guess[columnIndex];
        tile.classList.add(evaluateGuess(guess)[columnIndex]);
        tile.setAttribute("aria-label", `${guess[columnIndex]}, ${colorLabel(evaluateGuess(guess)[columnIndex])}`);
      } else if (rowIndex === game.guesses.length && !game.finished) {
        const letter = currentGuess[columnIndex] || "";
        tile.textContent = letter;
        if (letter) tile.classList.add("filled");
      }
      row.append(tile);
    }
    elements.board.append(row);
  }
}

function colorLabel(color) {
  if (color === "tile-correct") return "correta e na posição";
  if (color === "tile-present") return "na palavra, em outra posição";
  return "não está na palavra";
}

const KEY_ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
const keyStatus = new Map();
let currentGuess = "";

function buildKeyboard() {
  elements.keyboard.replaceChildren();
  KEY_ROWS.forEach((letters, rowIndex) => {
    const row = document.createElement("div");
    row.className = "keyboard-row";
    if (rowIndex === 2) addKey(row, "ENTER", "key-wide");
    for (const letter of letters) addKey(row, letter, "");
    if (rowIndex === 2) addKey(row, "⌫", "key-wide", "Apagar");
    elements.keyboard.append(row);
  });
}

function addKey(row, value, extraClass, ariaLabel = value) {
  const key = document.createElement("button");
  key.type = "button";
  key.className = `key ${extraClass}`;
  key.textContent = value;
  key.setAttribute("aria-label", ariaLabel);
  const status = keyStatus.get(value);
  if (status) key.classList.add(status);
  key.addEventListener("click", () => handleKey(value));
  row.append(key);
}

function updateKeyStatuses() {
  keyStatus.clear();
  game.guesses.forEach((guess) => {
    const feedback = evaluateGuess(guess);
    [...guess].forEach((letter, index) => {
      const next = feedback[index];
      const previous = keyStatus.get(letter);
      if (!previous || (previous !== "tile-correct" && next === "tile-correct") ||
          (previous === "tile-absent" && next === "tile-present")) {
        keyStatus.set(letter, next);
      }
    });
  });
}

function render() {
  currentGuess = "";
  updateKeyStatuses();
  buildBoard();
  buildKeyboard();
  const complete = game.finished;
  elements.keyboard.hidden = complete;
  elements.result.hidden = !complete;
  if (complete) {
    elements.resultEyebrow.textContent = game.won ? "DESAFIO CONCLUÍDO" : "FIM DAS TENTATIVAS";
    elements.resultTitle.textContent = game.won ? "Mandou muito!" : "Quase! Amanhã tem mais.";
    elements.resultDescription.textContent = game.won
      ? `Você encontrou a palavra em ${game.guesses.length} ${game.guesses.length === 1 ? "tentativa" : "tentativas"}: ${answer}.`
      : `A palavra era ${answer}. O próximo desafio chega à meia-noite UTC.`;
    elements.message.textContent = "";
  } else {
    elements.result.hidden = true;
    elements.message.textContent = "";
  }
}

function beginGame() {
  elements.home.hidden = true;
  elements.game.hidden = false;
  render();
}

function finishGame(won) {
  game.finished = true;
  game.won = won;
  saveGame();

  if (stats.lastPlayedDate !== today) {
    stats.currentStreak = stats.lastPlayedDate && dayNumber(today) - dayNumber(stats.lastPlayedDate) === 1
      ? stats.currentStreak + 1
      : 1;
    stats.bestStreak = Math.max(stats.bestStreak, stats.currentStreak);
    stats.totalGames += 1;
    if (won) stats.totalWins += 1;
    stats.lastPlayedDate = today;
    stats.lastWord = answer;
    saveStats();
  }
}

function submitGuess() {
  if (game.finished) return;
  if (currentGuess.length !== WORD_LENGTH) {
    showMessage("Sua palavra precisa ter 5 letras.");
    return;
  }
  if (!ALLOWED_GUESSES.has(currentGuess)) {
    showMessage("Ainda não reconheço essa palavra. Tente outra!");
    return;
  }
  if (game.guesses.includes(currentGuess)) {
    showMessage("Você já tentou essa palavra.");
    return;
  }

  game.guesses.push(currentGuess);
  const won = currentGuess === answer;
  currentGuess = "";
  if (won || game.guesses.length === MAX_ATTEMPTS) finishGame(won);
  else saveGame();
  render();
}

function handleKey(key) {
  if (game.finished) return;
  if (key === "ENTER") {
    submitGuess();
    return;
  }
  if (key === "⌫" || key === "BACKSPACE") {
    currentGuess = currentGuess.slice(0, -1);
    elements.message.textContent = "";
    buildBoard();
    return;
  }
  if (/^[A-Z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
    currentGuess += key;
    elements.message.textContent = "";
    buildBoard();
  }
}

function showMessage(message) {
  elements.message.textContent = message;
}

function announce(message) {
  if (!elements.toast) return;
  elements.toast.textContent = message;
  elements.toast.classList.add("visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => elements.toast.classList.remove("visible"), 2600);
}

function updateHomeStats() {
  const winRate = stats.totalGames ? Math.round((stats.totalWins / stats.totalGames) * 100) : 0;
  document.querySelector("#home-streak").textContent = stats.currentStreak;
  document.querySelector("#home-wins").textContent = stats.totalWins;
  document.querySelector("#home-win-rate").textContent = `${winRate}%`;
  document.querySelector("#stat-played").textContent = stats.totalGames;
  document.querySelector("#stat-wins").textContent = stats.totalWins;
  document.querySelector("#stat-rate").textContent = `${winRate}%`;
  document.querySelector("#stat-streak").textContent = stats.currentStreak;
  document.querySelector("#stat-best").textContent = stats.bestStreak;
  document.querySelector("#stat-last").textContent = stats.lastWord || "—";
}

function makeShareText() {
  const rows = game.guesses.map((guess) => {
    const feedback = evaluateGuess(guess);
    return feedback.map((color) => color === "tile-correct" ? "🟩" : color === "tile-present" ? "🟨" : "⬜").join("");
  });
  const result = game.won ? `${game.guesses.length}/${MAX_ATTEMPTS}` : `X/${MAX_ATTEMPTS}`;
  return [`Palavra do Dia ${today} — ${result}`, "", ...rows, "", "Jogue também: Palavra do Dia"].join("\n");
}

async function shareResult() {
  const text = makeShareText();
  if (navigator.share) {
    try {
      await navigator.share({ title: "Meu resultado — Palavra do Dia", text });
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
      console.error("O compartilhamento do resultado falhou.", error);
    }
  }
  try {
    await navigator.clipboard.writeText(text);
    announce("Resultado copiado! Pode compartilhar sem spoilers.");
  } catch (error) {
    console.error("Não foi possível copiar o resultado.", error);
    announce("Não foi possível compartilhar. Tente novamente.");
  }
}

document.querySelector("#daily-date").textContent = dateLabel(today);
document.querySelector("#game-date").textContent = dateLabel(today);
document.querySelector("#start-game").addEventListener("click", beginGame);
document.querySelector("#back-home").addEventListener("click", () => {
  elements.game.hidden = true;
  elements.home.hidden = false;
  updateHomeStats();
});
document.querySelector("#how-to-play").addEventListener("click", () => elements.howModal.showModal());
document.querySelector("#show-stats").addEventListener("click", () => {
  updateHomeStats();
  elements.statsModal.showModal();
});
document.querySelector("#share-result").addEventListener("click", shareResult);
window.addEventListener("keydown", (event) => {
  if (elements.game.hidden || elements.howModal.open || elements.statsModal.open) return;
  if (event.key === "Enter" || event.key === "Backspace") {
    event.preventDefault();
    handleKey(event.key === "Enter" ? "ENTER" : "BACKSPACE");
    return;
  }
  const key = normalizeWord(event.key);
  if (/^[A-Z]$/.test(key)) handleKey(key);
});

document.querySelector("#start-label").textContent = game.guesses.length ? "Continuar desafio" : "Jogar o desafio";
updateHomeStats();
if (!game.finished && game.guesses.length) elements.startLabel.textContent = "Continuar desafio";
if (game.finished) {
  document.querySelector("#start-label").textContent = "Ver resultado";
}
