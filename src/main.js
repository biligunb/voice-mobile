import './styles.css';

const app = document.getElementById('app');
app.innerHTML = `
  <header class="hero">
    <div>
      <h1>Voice Mobile</h1>
      <p>Convert text or recorded audio into a chosen accent with a mobile-friendly PWA.</p>
    </div>
  </header>

  <main class="card">
    <label for="editor">Enter text</label>
    <textarea id="editor" rows="6" placeholder="Type a phrase here..."></textarea>

    <label for="accent-select">Accent</label>
    <select id="accent-select">
      <option value="en-US">American English</option>
      <option value="en-GB">British English</option>
      <option value="en-AU">Australian English</option>
      <option value="en-IN">Indian English</option>
    </select>

    <div class="button-row">
      <button id="send-btn" type="button">Send</button>
      <button id="speak-btn" type="button">Speak</button>
      <button id="record-btn" type="button">Record</button>
      <button id="stop-btn" type="button" disabled>Stop</button>
    </div>

    <section class="status-card">
      <p id="status-message">Ready to speak or record.</p>
      <p id="transcript" class="transcript"></p>
    </section>
  </main>
`;

const editor = document.getElementById('editor');
const accentSelect = document.getElementById('accent-select');
const sendBtn = document.getElementById('send-btn');
const speakBtn = document.getElementById('speak-btn');
const recordBtn = document.getElementById('record-btn');
const stopBtn = document.getElementById('stop-btn');
const statusMessage = document.getElementById('status-message');
const transcriptOutput = document.getElementById('transcript');

const accentNames = {
  'en-US': 'American English',
  'en-GB': 'British English',
  'en-AU': 'Australian English',
  'en-IN': 'Indian English'
};

function setStatus(message) {
  statusMessage.textContent = message;
}

function getVoiceForLocale(locale) {
  const voices = speechSynthesis.getVoices();
  const filtered = voices.filter((voice) => voice.lang.startsWith(locale));
  return filtered[0] || voices.find((voice) => voice.lang.startsWith('en')) || voices[0];
}

function speakText(text) {
  if (!text) {
    setStatus('Enter text before speaking.');
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = accentSelect.value;
  const voice = getVoiceForLocale(accentSelect.value);

  if (voice) {
    utterance.voice = voice;
  }

  utterance.onstart = () => setStatus(`Speaking in ${accentNames[accentSelect.value]}...`);
  utterance.onend = () => setStatus('Ready to speak or record.');
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

import { submitText } from './utils.js';

sendBtn.addEventListener('click', () => {
  const result = submitText(editor.value);

  if (!result.submitted) {
    setStatus(result.status);
    return;
  }

  console.log('Text submitted:', result.text);
  speakText(result.text);
});

speakBtn.addEventListener('click', () => speakText(editor.value.trim()));

let recognition;
let isRecording = false;

function updateRecordButtons() {
  recordBtn.disabled = isRecording;
  stopBtn.disabled = !isRecording;
}

if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.lang = 'en-US';

  recognition.onstart = () => {
    isRecording = true;
    updateRecordButtons();
    setStatus('Listening... Speak clearly into the microphone.');
    transcriptOutput.textContent = '';
  }; 

  recognition.onresult = (event) => {
    const phrase = event.results[0][0].transcript;
    editor.value = phrase;
  };

  recognition.onend = () => {
    isRecording = false;
    updateRecordButtons();
    setStatus('Recording stopped.');
  };

  recognition.onerror = (event) => {
    isRecording = false;
    updateRecordButtons();
    setStatus(`Recording error: ${event.error}`);
  };
} else {
  recordBtn.disabled = true;
  stopBtn.disabled = true;
  setStatus('Speech recognition is not available in this browser.');
}

recordBtn.addEventListener('click', () => {
  if (recognition && !isRecording) {
    recognition.start();
  }
});

stopBtn.addEventListener('click', () => {
  if (recognition && isRecording) {
    recognition.stop();
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered');
    } catch (error) {
      console.warn('Service Worker registration failed:', error);
    }
  });
}

setStatus('Ready to speak or record.');
