// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Main.css";

const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="logo">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAWFJREFUaEPtmesNwjAMhM1kwGTAZLAZyFIrCk2T8ytpJecvTnSfz3Zoe6KDr9PB9VMCjHYw0oE7Ed0mwCsRvSJgowAuRPT8E/wgIoZyXREAJfGzaHcnvAFq4kMgvAG4bBiitrgX2AmX5QmAiJ9Fu0F4AUjEzxAuTe0BsByX0rIwQ1gBLOJdnLAAeIg3Q2gBPMWbIDQAyKyX9oIaQgoQKV510UkAeogXQ0gANLNeW0rwRYcC9BQvuq0RgBHi4aZuAUSMS2lZVW/rGsAexDed2ALYk/gqRAmg57g0l1MJYGTTtoBW47UE8G6dMvB3CIDr/ww8GvbmYPE8kX5ez7TG6FJkb2cgbVDQRJEAwpqDkgsFpQPC1E/hUHKhoHQgHdjOQJaQrjqgXVByoaBsYijhqyAouVBQOrATB3o+6Li/F+Ic8qMmfzZtfULS5fu7q/i/f+tQSQ9YhYXsT4CQtAoOPbwDH6SCRDHIVPkrAAAAAElFTkSuQmCC"/>
      </Link>
      <div className="header-title">
        <h1>Прогноз погоды</h1>
      </div>
    </div>
  );
};

export default Header;