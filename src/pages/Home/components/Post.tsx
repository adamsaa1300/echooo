import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    Typography,
    Box,
} from "@mui/material";
import { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import "./Post.css";
interface PostProps {
    username: string;
    handle?: string;
    content: string;
    time: string;
    image?: string;
}

function Post({ username, handle = "@user", content, time, image }: PostProps) {
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(12);

    const handleLike = () => {
        setLiked(!liked);
        setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    };

    return (
        <Card className="post-card">
            <CardHeader
                avatar={<Avatar src="/profile.png" />}
                title={
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                            {username}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {handle} · {time}
                        </Typography>
                    </Box>
                }
            />

            <CardContent>
                <Typography variant="body1">
                    {content}
                </Typography>

                {image && (
                    <div className="post-image-container">
                        <img src={image} alt="post" className="post-image" />
                    </div>
                )}
            </CardContent>

            <CardActions className="post-actions">
                <IconButton onClick={handleLike}>
                    {liked ? <FavoriteIcon className="like-active" /> : <FavoriteBorderIcon />}
                </IconButton>
                <span className="count">{likesCount}</span>

                <IconButton>
                    <ChatBubbleOutlineIcon />
                </IconButton>
                <span className="count">0</span>

                <IconButton>
                    <RepeatIcon />
                </IconButton>
                <span className="count">0</span>
            </CardActions>
        </Card>
    );
}

export default Post;