import React, { useState, useEffect } from "react";
import play from "./images/play.png";

function TestReader() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("Google US English");
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const synth = window.speechSynthesis;

    synth.onvoiceschanged = () => {
      setVoices(synth.getVoices());
    };

    setVoices(synth.getVoices());
  }, []);

  const textToSpeech = () => {
    if (!text) {
      return;
    }

    const synth = window.speechSynthesis;

    try {
      synth.cancel(); // Stop any ongoing speech
    } catch (error) {
      console.error("Speech synthesis error:", error);
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const selected = voices.find((voice) => voice.name === selectedVoice);

    if (selected) {
      utterance.voice = selected;
      synth.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const toggleSpeech = () => {
    const synth = window.speechSynthesis;
    if (isSpeaking) {
      synth.pause();
      setIsSpeaking(false);
    } else {
      synth.resume();
      setIsSpeaking(true);
    }
  };

  return (
    <div className=" w-[100%] h-[100vh] bg-[#637ea3] flex justify-center items-center flex-col ">
      <div className="w-[90%] h-[60%] lg:w-[50%] lg:h-[60%] md:w-[60%] md:h-[40%] bg-[white] text-black flex justify-center items-center flex-col rounded-lg p-0 m-0">
        <h1 className="text-xl text-[#ff2963] font-bold mt-0 mb-5 lg:text-4xl lg:mb-10 md:text-3xl">
          Text To Speech
          <span className="text-[#273b50] underline ml-3">Converter</span>
        </h1>
        <textarea
          placeholder="Write anything here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-72 h-48 lg:w-[80%] md:w-[90%] text-[#4f4f4f] border-2 text-base outline-0 p-4 rounded-md resize-none mb-5 bg-transparent"
        ></textarea>
        <div className=" flex items-center flex-col gap-5">
          <select
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
            className="text-xs flex-1 text-black bg-transparent h-10 px-0 py-3 outline-0 border-2 rounded-lg lg:text-base"
          >
            {voices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
          <button
            onClick={isSpeaking ? toggleSpeech : textToSpeech}
            className="bg-[#ff2963] text-white text-base px-6 py-2 rounded-lg border-0 outline-0 cursor-pointer flex items-center lg:px-6"
          >
            <img src={play} alt="play" className="w-4 mr-2" />
            {isSpeaking ? "Reset" : "Listen"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestReader;
