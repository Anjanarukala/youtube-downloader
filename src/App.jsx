import axios from "axios";
import React, { useState } from "react";
import { FaYoutube } from "react-icons/fa";

function App() {
  const [URL, setURL] = useState(""); // State for storing YouTube video URL

  // Handle input change
  const handleInput = (e) => {
    e.preventDefault();
    setURL(e.target.value);
  };

  // Helper function to extract video ID from various YouTube URL formats
  const extractVideoId = (url) => {
    if (url.includes("youtu.be")) {
      return url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("v=")) {
      return url.split("v=")[1]?.split("&")[0];
    } else {
      return null; // Return null if the URL is invalid
    }
  };

  // Function to download the video
  const downloadVideo = async (e) => {
    e.preventDefault();

    // Validate if URL is provided
    if (!URL) {
      alert("Please enter a valid YouTube URL.");
      return;
    }

    // Extract the video ID from the URL
    const videoId = extractVideoId(URL);

    // If the video ID is invalid, show an alert
    if (!videoId) {
      alert("Invalid YouTube URL. Please check the format.");
      return;
    }

    const requestData = {
      id: videoId, // Send the video ID
    };

    const options = {
      method: "GET",
      url: `https://youtube-data8.p.rapidapi.com/video/streaming-data/?id=${videoId}`, // Use extracted video ID
      headers: {
        "x-rapidapi-key": "245e387e6amsh5ecf628cdcf436ep14f1b4jsnde04f705f2e6", // Your RapidAPI Key
        "x-rapidapi-host": "youtube-data8.p.rapidapi.com", // Your RapidAPI Host
        "content-type": "application/json", // Set content type to JSON
      },
    };

    try {
      const response = await axios.request(options); // Make the API request

      // Check if formats are available in the response
      const videoUrl = response?.data?.formats?.[0]?.url; // Extract video URL from the response
      if (videoUrl) {
        console.log("Video URL:", videoUrl); // Log the video URL
        window.location.href = videoUrl; // Redirect to the video URL to download it
      } else {
        alert("No downloadable formats available for this video.");
        console.error("No available video formats.");
      }
    } catch (error) {
      alert("An error occurred while downloading the video. Please try again.");
      console.error("Error downloading video:", error); // Log any errors
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col bg-slate-200">
      <div className="flex items-center justify-center gap-x-2">
        {/* YouTube logo and title */}
        <FaYoutube size={60} className="text-red-600" />
        <p className="text-2xl font-bold text-red-400">Video Downloader</p>
      </div>

      <div className="flex items-center justify-center gap-x-2">
        {/* Input for YouTube Video URL */}
        <input
          type="url"
          className="h-10 w-96 border-none outline-none px-5 rounded-lg shadow-lg"
          value={URL}
          onChange={handleInput}
          placeholder="Enter YouTube URL"
        />
        {/* Button to trigger video download */}
        <button
          className="h-10 bg-slate-600 text-white px-2 rounded-lg border-none outline-none"
          onClick={downloadVideo}
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default App;
