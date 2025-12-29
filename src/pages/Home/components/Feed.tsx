import { useState } from "react";
import { useEffect } from "react";

import Post from "./Post";
import CreatePost from "./CreatePost";
import "./Feed.css";

function Feed() {
    const [posts, setPosts] = useState([
        {
            id: 1,
            username: "Fatima Sholi",
            handle: "@fatima",
            content: "Good Morning",
            time: "2h",
        },
    ]);
    useEffect(() => {
        fetch("http://localhost:3001/posts")
            .then((res) => res.json())
            .then((data) => {
                setPosts(data);
            });
    }, []);

    const addPost = (content: string) => {
        const newPost = {
            id: Date.now(),
            username: "You",
            handle: "@you",
            content,
            time: "now",
        };

        fetch("http://localhost:3001/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPost),
        })
            .then((res) => res.json())
            .then((savedPost) => {
                setPosts((prev) => [savedPost, ...prev]);
            });
    };

    return (
        <div className="feed">

            <CreatePost onAddPost={addPost} />

            {posts.map((post) => (
                <Post
                    key={post.id}
                    username={post.username}
                    handle={post.handle}
                    content={post.content}
                    time={post.time}
                />
            ))}
        </div>
    );
}

export default Feed;
