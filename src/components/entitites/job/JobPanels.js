import API from "../../api/API.js";
import JobForm from "../job/JobForm.js";
import { DateFormatter } from "../../utils/dateUtils.js";
import { useState } from "react";
import Modal from "../../UI/Modal.js";
import Panel from "../../UI/Panel.js";
import ObjectTable from "../../UI/ObjectTable.js";
import { ActionTray, ActionModify, ActionDelete } from "../../UI/Actions.js";
import ToolTipDecorator from "../../UI/ToolTipDecorator.js";
import {
  createDeleteModal,
  createErrorModal,
} from "../../utils/modalCreators.js";

export default function JobPanels({ jobs, reloadJobs }) {
  // Initialisation ------------------------------
  const putJobsEndpoint = "/jobs";
  const deleteJobsEndpoint = "/jobs";

  // Format jobs
  const formattedJobs = jobs.map((job) => ({
    ...job,
    JobCreatedAtFormatted: DateFormatter.forDisplay(job.JobCreatedAt),
    JobDueDateTimeFormatted: DateFormatter.forDisplayWithTime(
      job.JobDueDateTime,
    ),
  }));
  // State ---------------------------------------
  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  const displayableAttributes = [
    { key: "JobTitle", label: "Job Title" },
    { key: "JobDescription", label: "Job Description" },
    { key: "JobDueDateTimeFormatted", label: "Due Date & Time" },
    { key: "JobStatus", label: "Status" },
    { key: "JobJobTypeName", label: "Job Type" },
    { key: "JobTicketTitle", label: "Ticket Title" },
    { key: "JobCreatedAtFormatted", label: "Created At" },
  ];
  const [showFormId, setShowFormId] = useState(0);
  const { handleModal } = Modal.useModal();

  // Modal helpers
  const dismissModal = () => handleModal({ show: false });
  const showDeleteModal = (id) =>
    handleModal(createDeleteModal(() => handleDelete(id), dismissModal, "job"));
  const showErrorModal = (title, message) =>
    handleModal(createErrorModal(title, message, dismissModal));
  //Form handlers
  const toggleModify = (id) => setShowFormId(showFormId === id ? 0 : id);
  const handleSubmit = async (job) => {
    try {
      await handleModifySubmit(job);
      setShowFormId(0);
    } catch (error) {
      showErrorModal("Update failed!", error.message || "An error occurred");
    }
  };
  const handleCancel = () => setShowFormId(0);
  const handleDelete = async (id) => {
    const response = await API.delete(`${deleteJobsEndpoint}/${id}`);
    if (!response.isSuccess) {
      throw new Error(response.message);
    }
    reloadJobs();
  };

  const handleModifySubmit = async (job) => {
    const response = await API.put(`${putJobsEndpoint}/${job.JobID}`, job);
    if (!response.isSuccess) {
      throw new Error(response.message);
    }
    reloadJobs();
  };

  return (
    <Panel.Container>
      {formattedJobs.map((job) => (
        <Panel key={job.JobID} title={`${job.JobID} ${job.JobTitle}`} level={3}>
          <Panel.Static level={4}>
            <ObjectTable object={job} attributes={displayableAttributes} />
          </Panel.Static>

          <ActionTray>
            <ToolTipDecorator message="Modify this Job">
              <ActionModify
                showText
                onClick={() => toggleModify(job.JobID)}
                buttonText="Modify job"
              />
            </ToolTipDecorator>
            <ToolTipDecorator message="Delete this job">
              <ActionDelete
                showText
                onClick={() => showDeleteModal(job.JobID)}
                buttonText="Delete job"
              />
            </ToolTipDecorator>
          </ActionTray>

          {showFormId === job.JobID && (
            <JobForm
              initialJob={job}
              onCancel={handleCancel}
              onSubmit={handleSubmit}
            />
          )}
        </Panel>
      ))}
    </Panel.Container>
  );
}
