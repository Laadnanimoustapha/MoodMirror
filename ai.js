async function analyzeMood(text) {
    // Fallback moods if API fails
    const fallbackMoods = {
        happy: ["happy", "joy", "good"],
        sad: ["sad", "cry", "depressed"],
        angry: ["angry", "mad", "frustrated"],
        lost: ["lost", "confused"]
    };

    try {
        // Try Hugging Face API first
        const mood = await detectMoodWithAPI(text); 
        const response = getResponse(mood);
        return `Mood: ${mood}\n${response}`;
        
    } catch (apiError) {
        console.error("API Failed. Using fallback:", apiError);
        // Fallback to keyword matching
        const mood = detectMoodManually(text, fallbackMoods);
        const response = getResponse(mood);
        return `Mood: ${mood}\n${response}`;
    }
}

// --- Helper Functions ---
async function detectMoodWithAPI(text) {
    const API_URL = "https://api-inference.huggingface.co/models/joeddav/distilbert-base-uncased-go-emotions-student";
    const API_KEY = "API KEY "; // Your key
    
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { 
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({ inputs: text })
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data[0][0].label; // e.g., "joy", "sadness"
}

function detectMoodManually(text, moodKeywords) {
    text = text.toLowerCase();
    for (const [mood, keywords] of Object.entries(moodKeywords)) {
        if (keywords.some(word => text.includes(word))) {
            return mood;
        }
    }
    return "neutral";
}

function getResponse(mood) {
    const responses = {
        joy: "Keep smiling! 🌞 The world loves your energy.",
        sadness: "It's okay to feel down. Better days are coming. 💙",
        anger: "Take a breath, my G. You got this. 😤💨",
        confusion: "Even GPS gets confused sometimes. You'll find your way. 🧭",
        neutral: "Thanks for sharing. Keep being real 💬"
    };
    return responses[mood] || responses.neutral;
}