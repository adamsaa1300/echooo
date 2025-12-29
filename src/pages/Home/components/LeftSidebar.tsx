import "./LeftSidebar.css";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

function LeftSidebar() {
    const trends = [
        { topic: "#ReactJS", posts: "12.5K posts" },
        { topic: "#Palestine", posts: "45.2K posts" },
        { topic: "#WebDev", posts: "8.3K posts" },
        { topic: "#TypeScript", posts: "6.1K posts" },
        { topic: "#EchooApp", posts: "3.7K posts" },
    ];

    return (
        <Card className="left-sidebar-card">
            <Typography className="trends-title">
                <TrendingUpIcon className="trends-icon" />
                Trending Topics
            </Typography>

            <List className="trends-list">
                {trends.map((trend, index) => (
                    <ListItem key={index} className="trend-item">
                        <ListItemText
                            primary={<span className="trend-topic">{trend.topic}</span>}
                            secondary={<span className="trend-posts">{trend.posts}</span>}
                        />
                    </ListItem>
                ))}
            </List>

            <div className="show-more">Show more</div>
        </Card>
    );
}

export default LeftSidebar;