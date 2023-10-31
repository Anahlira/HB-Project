import { useLayoutEffect, useRef, useState, useEffect } from "react";
import "./Authentication.css";
import "./Background";
import Background from "./Background";

function Authentication() {
  return (
    <div id="titleHomeScreen" className="titleBg">
      <Background></Background>
      <h1 className="title">
        Home <span className="titleAscent">Bank</span> Project
      </h1>
    </div>
  );
}

export default Authentication;
