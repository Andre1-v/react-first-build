import { useState } from "react";
import { useAuth } from "../auth/useAuth.js";
import API from "../api/API.js";
import { ActionTray, ActionAdd } from "../UI/Actions.js";
import AssignmentPanels from "../entitites/assignment/AssignmentPanels.js";
import ToolTipDecorator from "../UI/ToolTipDecorator.js";
import AssignmentForm from "../entitites/assignment/AssignmentForm.js";
import useLoad from "../api/useLoad.js";
import "./Pages.scss";

export default function MyAssignmets() {
  // Initialisation ------------------------------
  const { loggedinUser } = useAuth();

  const getAssignmentEndpoint = loggedinUser
    ? `/assignments/users/${loggedinUser.UserID}`
    : null;
  const postAssignmentEndpoint = `/assignments`;

  // State ---------------------------------------
  const [assignments, , loadingMessage, loadAssignment] = useLoad(
    getAssignmentEndpoint
  );

  const [showNewAssignmentForm, setShowNewAssignmentForm] = useState(false);

  // Context -------------------------------------
  // Methods -------------------------------------

  const handleAdd = () => {
    setShowNewAssignmentForm(true);
  };
  const handleDismissAdd = () => {
    setShowNewAssignmentForm(false);
  };

  const handleSubmit = async (assignment) => {
    const response = await API.post(postAssignmentEndpoint, assignment);
    return response.isSuccess
      ? loadAssignment(postAssignmentEndpoint) || true
      : false;
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
