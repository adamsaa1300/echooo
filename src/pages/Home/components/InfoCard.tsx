import { Card, CardContent, Typography } from "@mui/material";
import "./InfoCard.css";

function InfoCard() {
    return (
        <Card className="info-card" sx={{
            borderRadius: 15,
            border: '2px solid #3b2a1f',
            overflow: 'hidden',
            boxShadow: '0 10px 25px rgba(0,0,0,0.18)',
        }}>
            <CardContent className="info-card-content">
                <Typography className="info-title">
                    Echoo
                </Typography>

                <Typography className="info-text">
                    © 2025 Echoo <br />
                    About · Help · Privacy
                </Typography>
            </CardContent>
        </Card>
    );
}

export default InfoCard;
