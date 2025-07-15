# MoodMirror

MoodMirror is a simple web application that acts as your emotional dashboard. It allows users to share how they feel—either by typing their mood or selecting from preset options (Happy, Sad, Angry, Lost). The app analyzes the user's mood using an AI (with a fallback to manual keyword detection) and responds with an empathetic, mood-specific message.

## Features

- **AI Mood Analysis:** Uses the Hugging Face API to analyze text input and detect emotions.
- **Manual Mood Detection:** Falls back to keyword-based analysis if the API is unavailable.
- **Mood History:** Records and displays a history of detected moods with timestamps in the browser's local storage.
- **Dynamic UI:** The appearance and messages adapt to the detected mood.
- **Responsive Design:** Works well on both desktop and mobile devices.

## Enable AI
To use the mood-detection AI, you need a free Hugging Face account.
Get your API key from: https://huggingface.co/settings/tokens
Paste it into ai.js where it says HF_API_KEY.

## How It Works

1. User enters their mood as text or selects from a dropdown.
2. The app analyzes the mood using AI or manual keyword matching.
3. A personalized response and visual feedback are shown based on the detected mood.
4. The mood and timestamp are saved to history for later review.

## Technologies Used

- HTML, CSS, JavaScript
- Hugging Face Inference API (for emotion detection)
- LocalStorage (for mood history)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Laadnanimoustapha/MoodMirror.git
