import "./Authentication.css";
import "../../Components/Authentication/Background";
import Background from "../../Components/Authentication/Background";
import Login from "../../Components/Authentication/Login";

const Authentication = () => {
  return (
    <div className="AuthPage">
      <div id="titleHomeScreen" className="titleBg">
        <Background></Background>
        <h1 className="title">
          Home <span className="titleAscent">Bank</span> Project
        </h1>
      </div>
      <Login></Login>
    </div>
  );
};

export default Authentication;
