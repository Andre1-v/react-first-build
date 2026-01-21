import Form from "../../UI/Form.js";
import useLoad from "../../api/useLoad.js";
import { DateFormatter } from "../../utils/dateUtils.js";

const emptyJob = {
  JobID: "",
  JobDueDateTime: "",
  JobTicketID: "",
  JobJobTypeID: "",
  JobTitle: "",
  JobDescription: "",
  JobStatus: "",
  JobCreatedAt: "",
};

export default function JobForm({ onCancel, onSubmit, initialJob = emptyJob }) {
  // Initialisation ------------------------------

  const formattedInitial = {
    ...initialJob,
    JobDueDateTime: DateFormatter.forInputDateTime(initialJob.JobDueDateTime),
    JobCreatedAt: initialJob.JobCreatedAt || new Date().toISOString(),
  };

  // Validation --------------------------
  const validation = {
    isValid: {
      JobTicketID: (id) => !isNaN(id) && id > 0,
      JobTitle: (title) => title !== "",
      JobDescription: (description) => description !== "",
      JobDueDateTime: (dateTime) => !isNaN(new Date(dateTime).getTime()),
      JobJobTypeID: (jobTypeID) => !isNaN(jobTypeID) && jobTypeID > 0,
      JobStatus: (status) =>
        ["Open", "In Progress", "Completed"].includes(status),
    },

    errorMessage: {
      JobTicketID: "The selected Ticket is invalid",
      JobTitle: "The Job Title cannot be empty",
      JobDescription: "The Job Description cannot be empty",
      JobDueDateTime: "The provided date and time is invalid",
      JobJobTypeID: "The selected Job Type is invalid",
      JobStatus: "The selected Status is invalid", // Need to create in backend
    },
  };
  const conformance = ["JobJobTypeID", "JobTicketID"];

  // State ---------------------------------------

  const [job, errors, handleChange, handleSubmit] = Form.useForm(
    formattedInitial,
    conformance,
    validation,
    onCancel,
    onSubmit,
  );
  const [tickets, , loadingTicketsMessage] = useLoad("/tickets");
  const [jobTypes, , loadingJobTypesMessage] = useLoad("/jobtypes");

  //Handlers -----------------------------------
  //View ----------------------------------------

  return (
    <Form onSubmit={handleSubmit} onCancel={onCancel}>
      <Form.Item
        label="Job Ticket"
        htmlFor="JobTicketID"
        advice="Select a ticket for the job"
        error={errors.JobTicketID}
      >
        {!tickets ? (
          <p>{loadingTicketsMessage}</p>
        ) : tickets.length === 0 ? (
          <p>No tickets found</p>
        ) : (
          <select
            name="JobTicketID"
            value={job.JobTicketID}
            onChange={handleChange}
          >
            <option value="0" disabled>
              Select a ticket
            </option>
            {tickets.map((ticket) => (
              <option key={ticket.TicketID} value={ticket.TicketID}>
                {ticket.TicketTitle}
              </option>
            ))}
          </select>
        )}
      </Form.Item>
      <Form.Item
        label="Job Title"
        htmlFor="JobTitle"
        advice="Enter a title for the job"
        error={errors.JobTitle}
      >
        <input
          type="text"
          name="JobTitle"
          value={job.JobTitle}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        label="Job Description"
        htmlFor="JobDescription"
        advice="Enter a description for the job"
        error={errors.JobDescription}
      >
        <textarea
          name="JobDescription"
          value={job.JobDescription}
          onChange={handleChange}
        ></textarea>
      </Form.Item>

      <Form.Item
        label="Due Date"
        htmlFor="JobDueDateTime"
        advice="Enter a due date you need the request to be done"
        error={errors.JobDueDateTime}
      >
        <input
          type="datetime-local"
          name="JobDueDateTime"
          value={job.JobDueDateTime}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        label="Job Type"
        htmlFor="JobJobTypeID"
        advice="Select a job type"
        error={errors.JobJobTypeID}
      >
        {!jobTypes ? (
          <p>{loadingJobTypesMessage}</p>
        ) : jobTypes.length === 0 ? (
          <p>No job types found</p>
        ) : (
          <select
            name="JobJobTypeID"
            value={job.JobJobTypeID}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select a job type
            </option>
            {jobTypes.map((jobType) => (
              <option key={jobType.JobTypeID} value={jobType.JobTypeID}>
                {jobType.JobTypeName}
              </option>
            ))}
          </select>
        )}
      </Form.Item>

      <Form.Item
        label="Job Status"
        htmlFor="JobStatus"
        advice="Select the status of the job"
        error={errors.JobStatus}
      >
        <select name="JobStatus" value={job.JobStatus} onChange={handleChange}>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </Form.Item>
    </Form>
  );
}
