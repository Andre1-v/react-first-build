import Form from "../../UI/Form.js";
import useLoad from "../../api/useLoad.js";

const emptyAssignment = {
  AssignmentJobID: "",
  AssignmentUserID: "",
  AssignmentStatus: "",
};

export default function AssignmentForm({
  onCancel,
  onSubmit,
  initalAssignment = emptyAssignment,
}) {
  // Initialisation ------------------------------
  const validation = {
    isValid: {
      AssignmentJobID: (id) => true,
      AssignmentUserID: (id) => true,
      AssignmentStatus: (status) =>
        ["Assigned", "In Progress", "Completed"].includes(status),
    },

    errorMessage: {
      AssignmentJobID: "The selected Job is invalid",
      AssignmentUserID: "The selected Tradesperson is invalid",
      AssignmentStatus: "The selected Status is invalid",
    },
  };

  const conformance = ["AssignmentJobID", "AssignmentUserID"];

  // State ---------------------------------------

  const [assignment, errors, handleChange, handleSubmit] = Form.useForm(
    initalAssignment,
    conformance,
    validation,
    onCancel,
    onSubmit
  );
  const [jobs, , loadingJobsMessage] = useLoad("/jobs");
  const [tradespersons, , loadingTradespersonMessage] = useLoad(
    "/users/tradesperson"
  );

  //Handlers -----------------------------------
  //View ----------------------------------------

  return (
    <Form onSubmit={handleSubmit} onCancel={onCancel}>
      <Form.Item
        label="Assignment Job"
        htmlFor="AssignmentJobName"
        advice="Select a job for the assignment"
        error={errors.AssignmentJobID}
      >
        {!jobs ? (
          <p>{loadingJobsMessage}</p>
        ) : jobs.length === 0 ? (
          <p>No Jobs found</p>
        ) : (
          <select
            name="AssignmentJobID"
            value={assignment.AssignmentJobID}
            onChange={handleChange}
          >
            <option value="0" disabled>
              Select a Job
            </option>
            {jobs.map((job) => (
              <option key={job.JobID} value={job.JobID}>
                {job.JobTitle}
              </option>
            ))}
          </select>
        )}
      </Form.Item>

      <Form.Item
        label="Assignment Tradesperson"
        htmlFor="AssignmentTradespersonName"
        advice="Select a tradesperson for the assignment"
        error={errors.AssignmentUserID}
      >
        {!tradespersons ? (
          <p>{loadingTradespersonMessage}</p>
        ) : tradespersons.length === 0 ? (
          <p>No Tradesperson found</p>
        ) : (
          <select
            name="AssignmentUserID"
            value={assignment.AssignmentUserID}
            onChange={handleChange}
          >
            <option value="0" disabled>
              Select a Tradesperson
            </option>
            {tradespersons.map((tradesperson) => (
              <option key={tradesperson.UserID} value={tradesperson.UserID}>
                {tradesperson.FullName}
              </option>
            ))}
          </select>
        )}
      </Form.Item>

      <Form.Item
        label="Assignment Status"
        htmlFor="AssignmentStatus"
        advice="Select the status of the assignment"
        error={errors.AssignmentStatus}
      >
        <select
          name="AssignmentStatus"
          value={assignment.AssignmentStatus}
          onChange={handleChange}
        >
          <option value="Assigned">Assigned</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Example">Example</option>
        </select>
      </Form.Item>
    </Form>
  );
}
