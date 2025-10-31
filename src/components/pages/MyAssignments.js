import { useState, useEffect } from "react";
import API from "../api/API.js";
import AssignmentPanels from "../entitites/assignment/AssignmentPanels.js";

export default function MyAssignmets() {
  // Initialisation ------------------------------
  const loggedinUserID = 15;
  const endpoint = `/assignments/user/${loggedinUserID}`;

  // State ---------------------------------------
  const [assignments, setAssignments] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("Loading records ...");

  // Context -------------------------------------
  // Methods -------------------------------------
  const apiCall = async (endpoint) => {
    const response = await API.get(endpoint);
    response.isSuccess
      ? setAssignments(response.result)
      : setLoadingMessage(response.message);
  };

  useEffect(() => {
    apiCall(endpoint);
  }, [endpoint]);

  // View ----------------------------------------
  return (
    <section>
      <h1>My Assignments</h1>
      {!assignments ? (
        <p>{loadingMessage}</p>
      ) : assignments.length === 0 ? (
        <p>NO Assignments found</p>
      ) : (
        <AssignmentPanels assignments={assignments} />
      )}
    </section>
  );
}
