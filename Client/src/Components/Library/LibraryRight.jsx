import React from "react";
import { useEffect, useState } from "react";
import "./LibraryRight.css";
import axios from "axios";
import NewsArticle from "./NewsArticle";

const LibraryRight = () => {
  const [news, setNews] = useState([]);
  const newsApiKey = "cb0c4bf57bcf48ea88b8a9b680797325";

  useEffect(() => {
    axios
      .get(
        `http://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=${newsApiKey}`
      )
      .then((res) => {
        setNews(res.data.articles);
        console.log(res.data.articles);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="library_right">
      <div className="newsheader">
        <h2>News</h2>
      </div>
      <div className="all_news">
        {news != 0 ? (
          [...news]
            .slice(0, 5)
            .map((newsArticle) => (
              <NewsArticle
                title={newsArticle.title}
                description={newsArticle.description}
                source={newsArticle.url}
              />
            ))
        ) : (
          <div className="loading">
            <h3>Loading...</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryRight;
