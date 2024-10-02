/* eslint-disable no-unused-vars */
import React from 'react'
import "./newPrompt.css"
import { useEffect, useRef, useState } from "react";
import { IKImage } from "imagekitio-react";
import Upload from '../upload/Upload';
import model from "../../lib/gemini";
import Markdown from "react-markdown";
const NewPrompt = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
    generationConfig: {
      // maxOutputTokens: 1024,
    }
  });
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [question, answer, img.dbData]);


  const add = async (text) => {
    try {
      setQuestion(text);
      // const result = await model.generateContent(text);
      const result = await model.generateContentStream(Object.entries(img.aiData).length ? [img.aiData, text] : [text]);

      let accumulator = "";
      try {
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          console.log(chunkText);
          accumulator += chunkText;
          setAnswer(accumulator);
        }
      } catch (error) {
        console.error("Error while streaming:", error);
        setAnswer("Sorry, something went wrong.");
      }

    } catch (error) {
      console.error("Error fetching response:", error);
      setAnswer("Sorry, something went wrong. Please try again.");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;
    add(text);
  };
  return (
    <>
      {/* ADD NEW CHAT */}
      {img.isLoading && <div className="">Loading...</div>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width="380"
          transformation={[{ width: 380 }]}
        />
      )}
      {question && <div className="message user">{question}</div>}
      {answer && (
        <div className="message">
          <Markdown>{answer}</Markdown>
        </div>
      )}
      <div className="endChat" ref={endRef}></div>
      <form className="newForm" onSubmit={handleSubmit} >
        <Upload setImg={setImg} />
        <input id="file" type="file" multiple={false} hidden />
        <input type="text" name="text" placeholder="Ask anything..." />
        <button>
          <img src="/arrow.png" alt="" />
        </button>
      </form>
    </>
  )
}

export default NewPrompt