
      import React, { useState, useEffect } from 'react';
import '../styles/App.css';

const App = () => {
  const [category, setCategory] = useState('general');
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [API_KEY] = useState("0a9a1d28d2d04347a001b6f2059b3150")
  const [API_URL] = useState(`https://gnews.io/api/v4/top-headlines?apikey=${API_KEY}&max=10&lang=en&category=`)

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}${category}`)
      .then(response => response.json())
      .then(data => {
        setNewsData(data.articles);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, [category]);

  const handleCategoryChange = event => {
    setCategory(event.target.value);
  };

  return (
    <div id="main">
      <h1 className='heading'>Top 10 {category} news</h1>
      <select value={category} onChange={handleCategoryChange}>
        <option value="general">General</option>
        <option value="business">Business</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
        <option value="world">World</option>
        <option value="entertainment">Entertainment</option>
        <option value="science">Science</option>
      </select>
      {loading ? (
        <p className='loader'>Loading...</p>
      ) : (
        <ol>
          {newsData.map((news, index) => (
            <li key={index}>
              <img className='news-img' src={news.image} alt={news.title} />
              <section className='new-title-content-author'>
                <h3 className='news-title'>{news.title}</h3>
                <section className='new-content-author'>
                  <p className='news-description'>{news.description}</p>
                  <p className='news-source'>
                    <strong>Source:</strong> {news.source.name}
                  </p>
                </section>
              </section>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default App;
