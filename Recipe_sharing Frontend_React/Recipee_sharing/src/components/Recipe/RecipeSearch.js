// RecipeSearch.js

import React, { useState } from 'react';

const RecipeSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleChange} placeholder="Search recipes" />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default RecipeSearch;
