document.addEventListener("DOMContentLoaded", () => {
    const videoElement = document.getElementById("localVideo");
    const videoToggle = document.getElementById("toggleVideo");
    const audioToggle = document.getElementById("toggleAudio");
    const leaveButton = document.getElementById("leaveRoom");
    let localStream = null;

    // Function to start the media stream
    async function startMediaStream() {
        try {
            localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            videoElement.srcObject = localStream;
            videoElement.style.display = "block";
            console.log("Media stream started.");
        } catch (error) {
            console.error("Error accessing media devices:", error);
            alert("Failed to access media devices. Please allow camera and microphone access.");
        }
    }

    // Start the media stream when the page loads
    startMediaStream();

    // Toggle video
    videoToggle.addEventListener("click", () => {
        if (localStream) {
            const videoTrack = localStream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                videoToggle.textContent = videoTrack.enabled ? "Turn Video Off" : "Turn Video On";
                console.log("Video toggled:", videoTrack.enabled);
            } else {
                console.warn("No video track found.");
            }
        }
    });

    // Toggle audio
    audioToggle.addEventListener("click", () => {
        if (localStream) {
            const audioTrack = localStream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                audioToggle.textContent = audioTrack.enabled ? "Mute Audio" : "Unmute Audio";
                console.log("Audio toggled:", audioTrack.enabled);
            } else {
                console.warn("No audio track found.");
            }
        }
    });

    // Leave room
    leaveButton.addEventListener("click", () => {
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
            videoElement.srcObject = null;
            videoElement.style.display = "none";
            console.log("Left the room and stopped media stream.");
        }
        window.location.href = "index.html"; // Redirect to home page
    });
});