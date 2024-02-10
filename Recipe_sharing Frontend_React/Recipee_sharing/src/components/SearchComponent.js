// src/components/SearchComponent.js

import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux
// import { setUserFromLocalStorage } from '../store/authSlice';

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const user = useSelector((state) => state.auth.user); // Get user from Redux store

  const handleSearch = async () => {
    try {
      if (!user || !user.accessToken) {
        console.error('User or access token is missing.');
        // Handle unauthenticated user, redirect to login or show a message
        return;
      }

      const response = await axios.post(
        'http://localhost:8000/api/search',
        { search_query: searchQuery },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
      });

      // Update state with search results
      setSearchResults(response.data.recipes);
    } catch (error) {
      console.error('Error searching recipes:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Recipe Search</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter search query"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" type="button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {searchResults.length > 0 ? (
        <div>
          <h3 className="mt-4">Search Results:</h3>
          {searchResults.map((recipe) => (
            <div key={recipe.id} className="mb-3 p-3 border bg-light">
              <p className="font-weight-bold">{recipe.title}</p>
              {/* Add additional information as needed */}
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4">No results found.</p>
      )}
    </div>
  );
};

export default SearchComponent;
