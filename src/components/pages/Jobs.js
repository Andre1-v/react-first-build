import { useState } from "react";
import { useAuth } from "../auth/useAuth.js";
import API from "../api/API.js";
import { ActionTray, ActionAdd } from "../UI/Actions.js";
import ToolTipDecorator from "../UI/ToolTipDecorator.js";
import useLoad from "../api/useLoad.js";
import "./Pages.scss";
import JobPanels from "../entitites/job/JobPanels.js";
import JobForm from "../entitites/job/JobForm.js";

export default function Jobs() {
  // Initialisation ------------------------------
  const { loggedinUser } = useAuth();

  const getJobsEndpoint = "/jobs";

  const postJobsEndpoint = `/jobs`;

  // State ---------------------------------------
  const [jobs, , loadingMessage, loadJobs] = useLoad(getJobsEndpoint);

  const [showNewJobForm, setShowNewJobForm] = useState(false);

  // Methods -------------------------------------
  const toggleAddForm = () => {
    setShowNewJobForm(true);
  };
  const cancelAddForm = () => {
    setShowNewJobForm(false);
  };

  const handleAddSubmit = async (job) => {
    const response = await API.post(postJobsEndpoint, job);
    return loadJobs() && response.isSuccess;
  };

  // View ----------------------------------------
  return (
    <section>
      <h1>Jobs</h1>

      {!jobs ? (
        <p>{loadingMessage}</p>
      ) : jobs.length === 0 ? (
        <p>No Jobs found</p>
      ) : (
        <JobPanels jobs={jobs} reloadJobs={loadJobs} />
      )}

      <p>&nbsp;</p>
      <ActionTray>
        <ToolTipDecorator message="Add a new job">
          <ActionAdd
            showText
            onClick={toggleAddForm}
            buttonText="Add a new job"
          />
        </ToolTipDecorator>
      </ActionTray>

      {showNewJobForm && (
        <JobForm onCancel={cancelAddForm} onSubmit={handleAddSubmit} />
      )}
    </section>
  );
}
