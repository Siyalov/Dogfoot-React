import React from "react";
import { Link } from "react-router-dom";
import logo from "./img/logo.svg";
import miniLogo from "./img/mini-logo.svg";
import "./style.css";
import { path } from "../../settings";

export default function Logo() {
  return (
    <Link className="logo" to={path}>
      <img src={logo} alt="Dog Food" className="full-logo" />
      <img src={miniLogo} alt="Dog Food" className="small-logo" />
    </Link>
  );
};
