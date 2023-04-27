import React, { useState, useEffect } from "react";
import APODCard from "./APODCard";
import "./styles.css";

const APODList = () => {
  const today = new Date();
  const [startDate, setStartDate] = useState(
    new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState(today.toISOString().slice(0, 10));
  const [isLoading, setIsLoading] = useState(false);

  const [apodData, setApodData] = useState([]);

  const fetchData = async (start, end) => {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=sn1gryOkxcFdPaeK8uSKOp6Jg1Y2IHDdYFfFm2Jb&start_date=${start}&end_date=${end}`
    );
    const data = await response.json();
    if (Array.isArray(data)) {
      if (apodData.length === 0) {
        setApodData([...data]);
      } else {
        setApodData((prevData) => [...data.reverse(), ...prevData]);
      }
    }
  };

  const handleLoadMore = () => {
    const newEndDate = new Date(startDate.getTime() - 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    const newStartDate = new Date(newEndDate);
    newStartDate.setDate(newStartDate.getDate() - 10);
    setIsLoading(true);
    fetchData(newStartDate.toISOString().slice(0, 10), newEndDate).then(() => {
      setIsLoading(false);
      setStartDate(newStartDate);
      setEndDate(newEndDate);
    });
  };

  useEffect(() => {
    fetchData(startDate.toISOString().slice(0, 10), endDate);
  }, []);

  return (
    <div className="body">
      {[...apodData].reverse().map((apod) => (
        <APODCard key={apod.date} apod={apod} />
      ))}

      <div className="more" style={{ textAlign: "center" }}>
        {isLoading ? (
          <div className="container">
            <div className="loader"></div>
          </div>
        ) : (
          <button onClick={handleLoadMore}>Load more</button>
        )}
      </div>
    </div>
  );
};

export default APODList;
