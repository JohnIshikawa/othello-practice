import React from "react";
import "./css/AnnounceSub.css";

interface AnnounceSubProp {
  text: string;
}
const AnnounceSub:React.FC<AnnounceSubProp> = (props: AnnounceSubProp) => {
  return (
    <div id="announce-sub">
      <p>{props.text}</p>
    </div>
  );
};

export default AnnounceSub;
