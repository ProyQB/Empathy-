import * as Tone from "https://esm.sh/tone";

const CONFIG = {
  steps: 16,
  tracks: ['Kick', 'Snare', 'HiHat', 'Sample']
};

const players = new Tone.Players({
  kick: "https://tonejs.github.io/audio/drum-samples/kick.mp3",
  snare: "https://tonejs.github.io/audio/drum-samples/snare.mp3",
  hihat: "https://tonejs.github.io/audio/drum-samples/hihat.mp3",
}).toDestination();

// State management
let currentPattern = {
  kick: Array(16).fill(false),
  snare: Array(16).fill(false),
  hihat: Array(16).fill(false)
};

// Initialize the Grid
function initGrid() {
  const grid = document.getElementById('kick-grid');
  for (let i = 0; i < CONFIG.steps; i++) {
    const step = document.createElement('div');
    step.classList.add('step');
    step.onclick = () => {
      currentPattern.kick[i] = !currentPattern.kick[i];
      step.classList.toggle('active');
    };
    grid.appendChild(step);
  }
}

// The Sequencer Loop
const loop = new Tone.Sequence((time, step) => {
  if (currentPattern.kick[step] && !isKickedMuted) {
    players.player("kick").start(time);
  }
  // Visual feedback
  document.querySelectorAll('.step')[step].style.opacity = 1;
}, Array.from({length: 16}, (_, i) => i), "16n");

// "AI Remix" Logic Placeholder
async function remixFromYoutube(url) {
  // 1. Fetch audio via backend
  // 2. Use a model (like Magenta.js) to transcribe the MIDI patterns
  // 3. Inject that pattern into currentPattern
  console.log("Analyzing patterns from:", url);
  
  // Simulation: randomize kick pattern based on "AI Analysis"
  currentPattern.kick = currentPattern.kick.map(() => Math.random() > 0.7);
  updateUI();
}

document.getElementById('play-pause').onclick = async () => {
  await Tone.start();
  Tone.Transport.toggle();
  loop.start(0);
};

initGrid();
