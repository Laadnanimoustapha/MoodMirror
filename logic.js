// Fixed moodResponses to match Hugging Face outputs
const moodResponses = {
    joy: "Keep smiling! 🌞 The world loves your energy.",
    sadness: "It's okay to feel down. Better days are coming. 💙",
    anger: "Take a breath, my G. You got this. 😤💨",
    confusion: "Even GPS gets confused sometimes. You'll find your way. 🧭",
    neutral: "Thanks for sharing. Keep being real 💬"
};

// Updated moodBtn click handler
moodBtn.addEventListener("click", async () => {
    try {
        let moodText = moodInput.value.trim();
        if (!moodText) moodText = moodSelect.value;

        // Show loading state
        resultBox.innerHTML = "<p>Analyzing your mood...</p>";
        resultBox.style.display = "block";
        document.querySelector(".MAIN").style.display = "none";

        // Get AI analysis
        const aiResult = await analyzeMood(moodText);
        const moodMatch = aiResult.match(/Mood:\s*(\w+)/i);
        const detectedMood = moodMatch ? moodMatch[1] : "neutral";

        // Update UI
        resultBox.innerHTML = `
            <h3>🧠 Mood Detected: ${detectedMood}</h3>
            <p>${moodResponses[detectedMood] || moodResponses.neutral}</p>
            <p><em>AI Analysis:</em> ${aiResult.split('\n')[1] || aiResult}</p>
            <button id="backBtn">Try Again</button>
        `;

        // Set background
        const moodColors = {
            joy: "linear-gradient(135deg, #f1f38bff 0%, #edfd06ff 100%)",
            sadness: "linear-gradient(135deg, #000000ff 0%, #ea01ffff 100%)",
            anger: "linear-gradient(135deg, #d24c4ca7 0%, #ff3300ff 100%)",
            confusion: "linear-gradient(135deg, #000000ff 0%, #764ba2 100%)",
            neutral: "#333"
        };
        document.body.style.background = moodColors[detectedMood] || moodColors.neutral;

        // Save to history
        const time = new Date().toLocaleString();
        const moodEntry = { mood: detectedMood, time };
        let moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];
        moodHistory.push(moodEntry);
        localStorage.setItem("moodHistory", JSON.stringify(moodHistory));

        // Back button
        document.getElementById("backBtn").addEventListener("click", resetUI);
        
    } catch (error) {
        resultBox.innerHTML = `
            <p>😢 Couldn't analyze your mood</p>
            <p>${moodResponses.neutral}</p>
            <button id="backBtn">Try Again</button>
        `;
    }
});

function resetUI() {
    resultBox.style.display = "none";
    document.querySelector(".MAIN").style.display = "block";
    moodInput.value = "";
};