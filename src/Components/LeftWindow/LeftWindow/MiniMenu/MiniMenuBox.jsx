import React from "react";
import styles from "./MiniMenu.module.css";
import { NavLink } from "react-router-dom";

const MiniMenuBox = (props) => {
  return (
    <li className="MiniMenuBox">
      <div className="placeholder">
        <NavLink
          className={styles.Link}
          to={props.To}
          style={({ isActive }) => {
            return {
              transform: isActive ? "scale(1.1)" : "scale(1)",
              filter: isActive
                ? "drop-shadow(3px 3px 10px rgba(255, 255, 255, 0.8))"
                : "",
            };
          }}
          end
        >
          <props.Sprite className={styles.Icon} alt=""></props.Sprite>
          <p className={styles.MiniMenuText}>{props.text}</p>
        </NavLink>
      </div>
    </li>
  );
};

export default MiniMenuBox;
