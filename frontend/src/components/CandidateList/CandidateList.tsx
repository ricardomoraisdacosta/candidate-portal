import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setCandidates, setLogin, setToken } from "../../store/main.store";
import { RootState } from "../../store";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";

const CandidateList: React.FC<{}> = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.main.token);
  let stateCandidates = useSelector(
    (state: RootState) => state.main.candidates
  );

  useEffect(() => {
    const fetchCandidates = async () => {
      const fetchCandidatesRequest = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      };
      const response = await fetch(
        "https://localhost:5001/Candidate/GetAll",
        fetchCandidatesRequest
      );
      if (response.status === 401 && token.length !== 0) {
        dispatch(setLogin(false));
        dispatch(setToken(""));
      }
      const candidates = await response.json();

      dispatch(setCandidates(candidates.data));
    };
    fetchCandidates();
    // eslint-disable-next-line
  }, [token]);
  const candidatesHtml = stateCandidates.map((candidate: any) => (
    <tr key={"candidate" + candidate.id}>
      <td>{candidate.id}</td>
      <td>{candidate.name}</td>
      <td>{candidate.email}</td>
      <td>{candidate.phone}</td>
      <td>{candidate.address}</td>
      <td>
        <Link to={"/candidate/" + candidate.id}> Go</Link>
      </td>
    </tr>
  ));
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Telephone</th>
            <th>Address</th>
            <th>GoTo</th>
          </tr>
        </thead>
        <tbody>{candidatesHtml}</tbody>
      </Table>
    </div>
  );
};

export default CandidateList;
