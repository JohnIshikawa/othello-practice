import React from "react";
import MenuButton from "../common/MenuButton";
import "./css/HomeContent.css"

const HomeContent: React.FC = () => {
    return (
        <div className="home-contents">
            <ul className="menu-list">
                <li className="menu-list-item"><MenuButton text="1人でオセロ" path="/game" /></li>
            </ul>
        </div>
    );
}

export default HomeContent;
