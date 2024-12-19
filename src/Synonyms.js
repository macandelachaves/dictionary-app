import React from "react";
import "./Synonyms.css";

export default function Synonyms(props) {
  return (
    <div className="Synonyms">
      {props.synonyms.synonyms.map(function (synonym, index) {
        return (
          <ul key={index}>
            <li> {synonym}</li>
          </ul>
        );
      })}
    </div>
  );
}
