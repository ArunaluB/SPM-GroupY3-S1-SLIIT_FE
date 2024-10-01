/* eslint-disable no-unused-vars */
import React from 'react'
import "./newPrompt.css"
import { useEffect, useRef, useState } from "react";
import { IKImage } from "imagekitio-react";
import Upload from '../upload/Upload';
import model from "../../lib/gemini";
const NewPrompt = () => {
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);
 
  const add = async () => {
    const prompt = "write a react js";
    const result = model.generateContent(prompt);
    const response = (await result).response;
    const text = response.text();
    console.log(text);
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
      <div className="endChat" ref={endRef}></div>
      <form className="newForm" >
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