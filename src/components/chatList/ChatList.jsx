/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import "./chatList.css";
import { Trash } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
const ChatList = () => {
    const queryClient = useQueryClient();
    const { isPending, error, data } = useQuery({
        queryKey: ["userChats"],
        queryFn: () =>
            fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
                credentials: "include",
            }).then((res) => res.json()),
    });

   
   // Mutation to delete a chat
   const deleteChatMutation = useMutation({
    mutationFn: (chatId) =>
        fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
            method: "DELETE",
            credentials: "include",
        }),
    onSuccess: () => {
        // Invalidate and refetch userChats after deletion
        queryClient.invalidateQueries(["userChats"]);
    },
});

// Handle delete button click
const handleDelete = (chatId) => {
    deleteChatMutation.mutate(chatId);
};

    return (
        <div className="chatList">
            <span className="title">DASHBOARD</span>
            <Link to="/dashboard">Create a new Chat</Link>
            <Link to="/">Explore Pro Menter</Link>
            <Link to="/quiz">Quiz</Link>
            <hr />
            <span className="title">RECENT CHATS</span>
            <div className="list">
                {isPending
                    ? "Loading..."
                    : error
                        ? "Something went wrong!"
                        : data?.map((chat) => (
                            <div className="chat-item" key={chat._id}>
                                <Link to={`/dashboard/chats/${chat._id}`}>{chat.title}</Link>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(chat._id)}
                                >
                                    <Trash size={16} />
                                </button>
                            </div>
                        ))}
            </div>
            <hr />
            <Link to="/base" className="start-button">
             <div className="upgrade">
                <img src="/logo.png" alt="" />
                <div className="texts">
                    <span>Start to Learning</span>
                    <span>Create Your Code Block</span>
                </div>
            </div>
            </Link>
        </div>
    );
};

export default ChatList;