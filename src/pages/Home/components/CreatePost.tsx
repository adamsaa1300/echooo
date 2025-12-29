import { useState } from "react";
import "./CreatePost.css";

type CreatePostProps = {
    onAddPost: (content: string) => void;
};

function CreatePost({ onAddPost }: CreatePostProps) {
    const [text, setText] = useState("");

    const handleSubmit = () => {
        if (text.trim() === "") return;

        onAddPost(text);
        setText("");
    };

    return (
        <div className="create-post-card">
            <div className="create-post-header">
                <div className="avatar"></div>
                <input
                    type="text"
                    placeholder="What's on your mind?"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>

            <div className="create-post-actions">
                <button type="button" onClick={handleSubmit}>
                    Post
                </button>
            </div>
        </div>
    );
}



export default CreatePost;
