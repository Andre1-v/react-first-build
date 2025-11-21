import { useEffect, useState } from "react";
import API from "../../api/API.js";
import FormItem from "../../UI/Form.js";
import { ActionTray, ActionAdd, ActionClose } from "../../UI/Actions.js";
import ToolTipDecorator from "../../UI/ToolTipDecorator.js";

const emptyAssignment = {
  AssignmentJobID: "",
  AssignmentUserID: "",
  AssignmentStatus: "",
};

export default function AssignmentForm({
  onDismiss,
  onSubmit,
  initalAssignment = emptyAssignment,
}) {
  // Initialisation ------------------------------
  const isValid = {
    AssignmentJobID: (id) => true,
    AssignmentUserID: (id) => true,
    AssignmentStatus: (status) =>
      ["Assigned", "In Progress", "Completed"].includes(status),
  };

  const errorMessage = {
    AssignmentJobID: "The selected Job is invalid",
    AssignmentUserID: "The selected Tradesperson is invalid",
    AssignmentStatus: "The selected Status is invalid",
  };

  // State ---------------------------------------
  const [assignment, setAssignment] = useState(initalAssignment);
  const [errors, setErrors] = useState(
    Object.keys(initalAssignment).reduce(
      (accum, key) => ({ ...accum, [key]: null }),
      {}
    )
  );

  const [jobs, setJobs] = useState([]);
  const [loadingJobsMessage, setLoadingJobsMessage] =
    useState("Loading jobs ...");

  const getJob = async () => {
    const response = await API.get("/jobs");
    response.isSuccess
      ? setJobs(response.result)
      : setLoadingJobsMessage(response.message);
  };

  useEffect(() => {
    getJob();
  }, []);

  const [tradespersons, setTradespersons] = useState([]);
  const [loadingTradespersonMessage, setLoadingTradespersonMessage] = useState(
    "Loading tradespersons ..."
  );

  const getTradesperson = async () => {
    const response = await API.get("/users/tradesperson");
    response.isSuccess
      ? setTradespersons(response.result)
      : setLoadingTradespersonMessage(response.message);
  };

  useEffect(() => {
    getTradesperson();
  }, []);

  //Handlers -----------------------------------

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newValue =
      name === "AssignmentJobID" || name === "AssignmentUserID"
        ? parseInt(value)
        : value;
    setAssignment({ ...assignment, [name]: newValue });
    setErrors({
      ...errors,
      [name]: isValid[name](newValue) ? null : errorMessage[name],
    });
  };

  const isValidAssignment = (assignment) => {
    let isAssignmentValid = true;

    Object.keys(assignment).forEach((key) => {
      if (isValid[key]) {
        errors[key] = isValid[key](assignment[key]) ? null : errorMessage[key];
        if (!isValid[key](assignment[key])) isAssignmentValid = false;
      }
    });

    setErrors(errors);
    return isAssignmentValid;
  };

  const handleCancel = () => onDismiss();
  const handleSubmit = (event) => {
    event.preventDefault();
    isValidAssignment(assignment) && onSubmit(assignment) && onDismiss();
    setErrors({ ...errors });
  };

  //View ----------------------------------------

  return (
    <form className="BorderedForm">
      <FormItem
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
      </FormItem>

      <FormItem
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
      </FormItem>

      <FormItem
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
      </FormItem>

      <ActionTray>
        <ToolTipDecorator message="Submit new assignment">
          <ActionAdd showText onClick={handleSubmit} />
        </ToolTipDecorator>
        <ToolTipDecorator message="Cancel submision">
          <ActionClose showText onClick={handleCancel} />
        </ToolTipDecorator>
      </ActionTray>
    </form>
  );
}
