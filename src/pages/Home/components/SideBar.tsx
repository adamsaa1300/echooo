import "./SideBar.css";
import {
    Card,
    Typography,
    List,
    Avatar,
    Button,
} from "@mui/material";

function SideBar() {
    const suggestions = [
        { name: "Ali Barqawi", handle: "@ali" },
        { name: "Adam", handle: "@adam" },
        { name: "Zamorda", handle: "@zamorda" },
    ];

    return (
        <Card className="sidebar-card">
            <Typography className="sidebar-title">Who to follow</Typography>

            <List disablePadding>
                {suggestions.map((person) => (
                    <div key={person.handle} className="suggestion-item">
                        <div className="suggestion-info">
                            <Avatar className="suggestion-avatar" />
                            <div className="suggestion-text">
                                <div className="suggestion-name">{person.name}</div>
                                <div className="suggestion-handle">{person.handle}</div>
                            </div>
                        </div>
                        <Button className="follow-btn">Follow</Button>
                    </div>
                ))}
            </List>
        </Card>
    );
}

export default SideBar;