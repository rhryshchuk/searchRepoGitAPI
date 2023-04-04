import React, { useState } from 'react';
import axios from 'axios';

function SearchRepositories() {
  const [query, setQuery] = useState('');
  const [repos, setRepos] = useState([]);

  const handleInputChange = event => {
    setQuery(event.target.value);
  };

  const handleSearch = event => {
    event.preventDefault();
    axios.get(`https://api.github.com/users/${query}/repos`)
        .then(response => {
          setRepos(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  return (
    <div>
      <form onSubmit={handleSearch}>
        <label>
          Search Repositories:
          <input type="text" value={query} onChange={handleInputChange} />
        </label>
        <button type="submit">Search</button>
      </form>
      <ul>
        {repos.map(repo => (
          <li key={repo.id}>{repo.full_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchRepositories;
