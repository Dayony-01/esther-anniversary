const screens = Array.from(document.querySelectorAll('.screen'));
const progressText = document.getElementById('progressText');
const sectionName = document.getElementById('sectionName');
const timelineReveal = document.getElementById('timelineReveal');
const sequenceEl = document.getElementById('sequence');
const nameResult = document.getElementById('nameResult');
const nameContinue = document.getElementById('nameContinue');
const secretReveal = document.getElementById('secretReveal');
const secretBtn = document.getElementById('secretBtn');

let currentScreen = 0;

const correctNameOrder = ["Big Head", "Finished Man", "Crab Baby"];
let selectedNames = [];

function updateProgress() {
  progressText.textContent = `${currentScreen + 1} / ${screens.length}`;
  const names = [
    "Begin",
    "Beginning",
    "Our Language",
    "Things I Notice",
    "Ordinary Things",
    "What I Remember",
    "For Esther"
  ];
  sectionName.textContent = names[currentScreen] || "End";
}

function showScreen(index) {
  screens.forEach((screen, i) => {
    screen.classList.toggle('active', i === index);
  });
  currentScreen = index;
  updateProgress();
}

function bindNextButtons() {
  document.querySelectorAll('[data-next]').forEach((button) => {
    button.addEventListener('click', () => {
      const nextIndex = currentScreen + 1;
      if (nextIndex < screens.length) {
        showScreen(nextIndex);
      }
    });
  });
}

function bindRevealCards() {
  const cards = document.querySelectorAll('[data-reveal]');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const value = card.dataset.reveal;
      timelineReveal.textContent = `I remember this part: ${value}. It wasn't a grand moment. It was a moment that mattered.`;
    });
  });
}

function bindNameCards() {
  const cards = document.querySelectorAll('.namecard');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const currentValue = card.dataset.name;

      if (selectedNames.includes(currentValue)) {
        selectedNames = selectedNames.filter(item => item !== currentValue);
        card.classList.remove('selected');
      } else {
        selectedNames.push(currentValue);
        card.classList.add('selected');
      }

      if (selectedNames.length > 3) {
        selectedNames.shift();
      }

      renderSequence();
      checkNameOrder();
    });
  });
}

function renderSequence() {
  sequenceEl.textContent = selectedNames.length
    ? selectedNames.join(' → ')
    : 'No selection yet';
}

function checkNameOrder() {
  const chosenOrder = selectedNames.slice();
  const isCorrect = chosenOrder.length === correctNameOrder.length &&
    chosenOrder.every((value, index) => value === correctNameOrder[index]);

  if (isCorrect) {
    nameResult.textContent = 'You got it. That was the evolution of your language.';
    nameContinue.disabled = false;
  } else if (chosenOrder.length === correctNameOrder.length) {
    nameResult.textContent = 'Not quite. Try again.';
    nameContinue.disabled = true;
  } else {
    nameResult.textContent = '';
  }
}

function bindOrdinaryButtons() {
  const ordinaryButtons = document.querySelectorAll('#ordinary button');
  const reveal = document.getElementById('ordinaryReveal');
  const revealParagraphs = Array.from(reveal.querySelectorAll('p'));

  ordinaryButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      ordinaryButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      revealParagraphs.forEach((p, i) => {
        p.classList.toggle('show', i === index || i === index + 1 || i === index + 2 || i >= 3);
      });
    });
  });
}

function bindSecretReveal() {
  secretBtn.addEventListener('click', () => {
    secretReveal.classList.toggle('open');
  });
}

function init() {
  bindNextButtons();
  bindRevealCards();
  bindNameCards();
  bindOrdinaryButtons();
  bindSecretReveal();

  const finalButton = document.getElementById('openFinal');
  finalButton.addEventListener('click', () => {
    showScreen(6);
  });

  updateProgress();
}

init();
