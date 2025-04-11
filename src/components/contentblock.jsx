import React from "react";
import '../styles/ContentBlock.css';

function ContentBlock({ imageSrc, text }) {
    return (
        <div className="content-block">
          {imageSrc && <img src={imageSrc} alt="Content" className="content-image" />}
          {text && (
            <div className="content-text">
              <p>{text}</p>
            </div>
          )}
        </div>
      );
    }
  
 export default ContentBlock