# voice-mobile
Mobile application to convert text/audio to chosen accent

## Features
- Text-to-speech with accent selection
- Speech recognition (record audio)
- PWA support (installable on mobile)
- Unit tested with Vitest

## Development

### Setup
```bash
npm install
```

### Run locally
```bash
npm run dev
```
Open `http://localhost:4173` in your browser.

### Run tests
```bash
npm test
```

### Build for production
```bash
npm run build
```

## Deployment

### GitHub Pages
This project is automatically deployed to GitHub Pages on every push to `main`.

**Live URL:** `https://biligunb.github.io/voice-mobile/`

The deployment workflow:
1. Installs dependencies
2. Runs tests
3. Builds the production bundle
4. Deploys to GitHub Pages

You can monitor deployments in the **Actions** tab on GitHub.

## Testing on Mobile
1. Visit the live GitHub Pages URL on your phone
2. In browser menu, select "Add to Home screen" to install as PWA
3. Grant microphone permission for speech recognition
4. Enter text, click "Send" to hear it spoken
5. Click "Record" to test speech recognition
