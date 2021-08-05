import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import CandidateList from "../CandidateList/CandidateList";
import Login from "../Login/Login";

const Mains: React.FC<{}> = (props) => {
  const isLogin = useSelector((state: RootState) => state.main.login);
  return (
    <div>
      {!isLogin && <Login />}
      {isLogin && <CandidateList />}
    </div>
  );
};

export default Mains;
