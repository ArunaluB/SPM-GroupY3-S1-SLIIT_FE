/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import "./newPrompt.css";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import Markdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const NewPrompt = ({ data }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });
  const Prompt = `Analyze the following code and provide step-by-step feedback. Start by explaining the code’s functionality, followed by identifying syntax, logical, and common errors. For each error found, explain the cause and suggest a method for fixing it. After fixing each error, explain how the corrected code improves functionality. Additionally, estimate the error percentage breakdown (syntax, common, logical), and provide suggestions for best practices and optimizations, including the use of appropriate data structures. Complete the correct code base—explanation of code functionality.  Finally, give references to documentation or YouTube videos that can further assist in understanding and improving the code.

Once completed, return the output in a well-structured  with clear sections for code explanation, error identification and correction, best practices, and recommendations.`;
  // Function to check if the input contains code (simple check for now)
  const isCodeInput = (input) => {
    return (
      input.includes("function") ||
      input.includes("const") ||
      input.includes("let") ||
      input.includes("return") ||
      input.includes("import") ||
      input.includes("export") ||
      input.includes("app")
    );
  };
  const queryClient = useQueryClient();
  const endRef = useRef(null);
  const formRef = useRef(null);

  // Check if there's valid history and if the first entry has the role 'user'
  const history = data?.history?.length
    ? data.history.map(({ role, parts }) => ({
      role,
      parts: [{ text: parts[0].text }],
    }))
    : [];

  // Initialize chat if the first entry in history is from the 'user'
  const chat = history.length && history[0].role === "user"
    ? model.startChat({
      history,
      generationConfig: {
        // maxOutputTokens: 100,
      },
    })
    : null;

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data, question, answer, img.dbData]);

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.length ? question : undefined,
          answer,
          img: img.dbData?.filePath || undefined,
        }),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ["chat", data._id] })
        .then(() => {
          formRef.current.reset();
          setQuestion("");
          setAnswer("");
          setImg({
            isLoading: false,
            error: "",
            dbData: {},
            aiData: {},
          });
        });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const add = async (text, isInitial) => {
    if (!isInitial) setQuestion(text);

    try {
      if (chat) {
        const result = await chat.sendMessageStream(
          Object.entries(img.aiData).length ? [img.aiData, text] : [text]
        );
        let accumulatedText = "";
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          console.log(chunkText);
          accumulatedText += chunkText;
          setAnswer(accumulatedText);
        }

        mutation.mutate();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target.text.value;
    if (!text) return;

    const finalText = isCodeInput(text) ? text + Prompt : text;
    console.log("aaaaaaaaaaaaaaaaaaaaa", finalText);

    add(finalText, false);
  };

  // IN PRODUCTION WE DON'T NEED IT
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current && data?.history?.length === 1) {
      add(data.history[0].parts[0].text, true);
    }
    hasRun.current = true;
  }, []);

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
      <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
        <Upload setImg={setImg} />
        <input id="file" type="file" multiple={false} hidden />
        <input type="text" name="text" placeholder="Ask anything..." />
        <button>
          <img src="/arrow.png" alt="" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
