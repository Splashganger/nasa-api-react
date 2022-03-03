import React, { useState, useEffect } from "react";
import "./index.css";

export default function NasaPhoto() {
  const [nData, setData] = useState(null);

  useEffect(() => {
    fetchData();

    async function fetchData() {
      const res = await fetch(
                // we'll update the KEYHERE soon!
        `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`
      );
      const data = await res.json();
      setData(data);
    }
  }, []);

  if (!nData) return <div />;

  return (
    <div className="nasa-photo">
        <img
          src={nData.url}
          alt={nData.title}
          className="photo"
        />
      <div>
        <h1>{nData.title}</h1>
        <p className="date">{nData.date}</p>
        <p className="explanation">{nData.explanation}</p>
      </div>
    </div>
  );
}