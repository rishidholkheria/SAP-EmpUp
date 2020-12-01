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
        `https://newsapi.org/v2/top-headlines?sources=the-next-web&apiKey=${newsApiKey}`
      )
      .then((res) => {
        setNews(res.data.articles);
        // console.log(res.data.articles);
        // console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="library_right">
      <div className="newsheader">
        <h2>News</h2>
      </div>
      <div className="all_news">
        <NewsArticle
          title={
            "Lockdown Extended Till December 31: This States Imposes Total Shutdown in COVID Hotspots, Clamps Night Curfew in 12 Districts "
          }
          description="Amid the rising number of coronavirus cases, the Ashok Gehlot-led Rajasthan government extended the lockdown in containment zones till December 31, 2020."
          source="https://www.india.com/news/india/lockdown-till-december-31-school-colleges-cinema-halls-closed-large-gatherings-restricted-whats-allowed-whats-prohibited-4232326/"
        />
        <NewsArticle
          title={
            "India’s Covid count in November lowest in 4 months, since july"
          }
          description="The Covid death toll in the country fell sharply in November .."
          source=" http://timesofindia.indiatimes.com/articleshow/79500639.cms?utm_source=contentofinterest&utm_medium=text&utm_campaign=cppst"
        />
        {news != 0 ? (
          [...news]
            .slice(0, 10)
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
