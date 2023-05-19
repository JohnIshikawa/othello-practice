import React from "react";
import { Link } from "react-router-dom";
import "./css/MenuButton.css"

interface ButtonProps {
    text: string;
    path: string;
};
const MenuButton: React.FC<ButtonProps> = (props: ButtonProps) => {
    return (
        <div>
            <Link to={props.path} className="menu-btn">{props.text}</Link>
        </div>
    );
}

export default MenuButton;
