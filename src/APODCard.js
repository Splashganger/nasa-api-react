import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const APODCard = ({ apod }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const firstTwoSentences = apod.explanation.split(". ").slice(0, 2).join(". ");
  return (
    <div className="card-container">
      <Card sx={{ maxWidth: 600 }}>
        <CardMedia
          component={apod.media_type === "image" ? "img" : "iframe"}
          alt={apod.title}
          height={apod.media_type === "image" ? "600" : "600"}
          src={apod.url}
          title={apod.title}
          frameBorder="0"
          gesture="media"
          allow="encrypted-media"
          allowFullScreen
          className="photo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {apod.title} - {apod.date}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {showMore ? apod.explanation : firstTwoSentences}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={toggleShowMore}>
            {showMore ? "weniger lesen" : "mehr lesen"}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default APODCard;
