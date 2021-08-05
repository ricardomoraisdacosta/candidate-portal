import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCandidate, setLogin, setToken } from "../../../store/main.store";
import { RootState } from "../../../store";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import classes from "./Candidate.module.css";

const Candidate: React.FC<{}> = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.main.token);
  const { id } = useParams<any>();
  const candidateFinal = useSelector(
    (state: RootState) => state.main.candidate
  );

  useEffect(() => {
    const fetchCandidate = async () => {
      const fetchCandidatesRequest = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      };
      const response = await fetch(
        `https://localhost:5001/Candidate/${id}`,
        fetchCandidatesRequest
      );

      if (response.status === 401 && token.length !== 0) {
        dispatch(setLogin(false));
        dispatch(setToken(""));
      }

      const candidates = await response.json();
      dispatch(setCandidate(candidates.data));
    };
    fetchCandidate();
    // eslint-disable-next-line
  }, [token]);

  return (
    <div className={classes.candidateWrapper}>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{candidateFinal.name}</Card.Title>
          <Card.Text>{`Email : ${candidateFinal.email}`}</Card.Text>
          <Card.Text>{`Telephone : ${candidateFinal.phone}`}</Card.Text>
          <Card.Text>{`Address : ${candidateFinal.address}`}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Candidate;
