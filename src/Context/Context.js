import { createContext, useState } from "react";
import run from "../config";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

//   const onSent = async (input) => {
//     setResultData("");
//     setLoading(true);
//     setShowResult(true);
//     setRecentPrompt(input);
//     const response = await run(input);
//     let responseArray = response.split("**");
//     let newResponse;
//     for (let i = 0; i < responseArray.length; i++) {
//       if (i === 0 || i % 2 !== 1) {
//         newResponse += responseArray[i];
//       } else { 
//         newResponse += "<b>"+responseArray[i]+"</br>";
//       }
//     }
//     let newResponse2 = newResponse.split("*").join("</br>");
//     let newResponseArray = newResponse2.split(" ");
//     for (let i = 0; i < newResponseArray.length; i++) {
//       const nextWord = newResponseArray[i];
//       delayPara(i, nextWord+" ");
//     }
    
//     setLoading(false);
//     setInput("");
//   };

const onSent = async (prompt) => {
    setResultData(""); // Clear the previous result
    setLoading(true);
    setShowResult(true);

    let response;

    if(prompt !== undefined) {
        setPrevPrompts(prev => [...prev, prompt]);
        setRecentPrompt(prompt);
        response = await run(prompt);
      } else {
        setPrevPrompts(prev => [...prev, input]);
        setRecentPrompt(input);
        response = await run(input);
      }
      
    
    let formattedResponse = response
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Bold text between double asterisks
      .replace(/\*(.*?)\*/g, "<i>$1</i>") // Italic text between single asterisks
      .replace(/\n/g, "<br/>"); // Convert newlines to <br> for line breaks

    // Animate word-by-word reveal
    let words = formattedResponse.split(" ");
    for (let i = 0; i < words.length; i++) {
      delayPara(i, words[i] + " ");
    }
    
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
