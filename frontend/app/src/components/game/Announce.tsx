import React from "react";
import "./css/Announce.css";

interface AnnounceProp {
  text: string;
}
const Announce: React.FC<AnnounceProp> = (props: AnnounceProp) => {
  return (
    <div id="announce">
      <p>{props.text}</p>
    </div>
  );
};

export default Announce;
