import React, { useState } from "react";
import axios from "axios";
import "./Dictionary.css";
import Results from "./Results";
import Photos from "./Photos";

export default function Dictionary(props) {
  const [keywords, setKeywords] = useState(props.defaultKeyword);
  const [results, setResults] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [photos, setPhotos] = useState(null);

  function handleDictionaryResponse(response) {
    console.log(response.data[0]);
    setResults(response.data[0]);
  }

  function handlePexelsResponse(response) {
    console.log(response.data);
    setPhotos(response.data.photos);
  }

  function search() {
    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keywords}`;
    axios.get(apiUrl).then(handleDictionaryResponse);

    let pexelsApiKey =
      "xa8N3JMXd749FrvhG6R36YLoJ4UAJa4PVuBIUlhWSjX4kWwEDl2hGRha";
    let pexelsApiUrl = `https://api.pexels.com/v1/search?query=${keywords}&per_page=9`;
    let headers = { Authorization: ` ${pexelsApiKey}` };
    axios.get(pexelsApiUrl, { headers: headers }).then(handlePexelsResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    alert(`Searching for ${keywords}`);
    search();
  }
  function handleOnChange(event) {
    setKeywords(event.target.value);
  }

  function load() {
    setLoaded(true);
    search();
  }

  if (loaded) {
    return (
      <div className="Dictionary">
        <section className="form">
          <h1>What word do you want to look up?</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="search"
              onChange={handleOnChange}
              placeholder="Search for a word"
            />
          </form>
          <div className="hint">i.e. paris, wine, yoga, coding</div>
        </section>
        <Results results={results} />
        <Photos photos={photos} />
      </div>
    );
  } else {
    load();
    return "Loading";
  }
}
