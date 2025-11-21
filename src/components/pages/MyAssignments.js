import { useState, useEffect } from "react";
import API from "../api/API.js";
import { ActionTray, ActionAdd } from "../UI/Actions.js";
import AssignmentPanels from "../entitites/assignment/AssignmentPanels.js";
import ToolTipDecorator from "../UI/ToolTipDecorator.js";
import AssignmentForm from "../entitites/assignment/AssignmentForm.js";

export default function MyAssignmets() {
  // Initialisation ------------------------------
  const loggedinUserID = 15;
  //const endpoint = `/assignments/user/${loggedinUserID}`;
  const endpoint = `/assignments`;

  // State ---------------------------------------
  const [assignments, setAssignments] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("Loading records ...");

  const [showNewAssignmentForm, setShowNewAssignmentForm] = useState(false);

  // Context -------------------------------------
  // Methods -------------------------------------
  const getAssignment = async () => {
    const response = await API.get("/assignments");
    response.isSuccess
      ? setAssignments(response.result)
      : setLoadingMessage(response.message);
  };

  useEffect(() => {
    getAssignment();
  }, []);

  const handleAdd = () => {
    setShowNewAssignmentForm(true);
  };
  const handleDismissAdd = () => {
    setShowNewAssignmentForm(false);
  };

  const handleSubmit = async (assignment) => {
    const response = await API.post(endpoint, assignment);
    return response.isSuccess ? getAssignment() || true : false;
  };

  // View ----------------------------------------
  return (
    <section>
      <h1>My Assignments</h1>
      {!assignments ? (
        <p>{loadingMessage}</p>
      ) : assignments.length === 0 ? (
        <p>No Assignments found</p>
      ) : (
        <AssignmentPanels assignments={assignments} />
      )}

      <p>&nbsp;</p>
      <ActionTray>
        <ToolTipDecorator message="Add a new assignment">
          <ActionAdd
            showText
            onClick={handleAdd}
            buttonText="Add a new assignment"
          />
        </ToolTipDecorator>
      </ActionTray>

      {showNewAssignmentForm && (
        <AssignmentForm onDismiss={handleDismissAdd} onSubmit={handleSubmit} />
      )}
    </section>
  );
}
