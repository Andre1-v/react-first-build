import Form from "../../UI/Form.js";
import useLoad from "../../api/useLoad.js";
import { DateFormatter } from "../../utils/dateUtils.js";

const emptyTicket = {
  TicketTitle: "",
  TicketDescription: "",
  TicketDueDate: "",
  TicketOfficeLocationID: "",
  TicketRequestedByUserID: "",
};

export default function TicketForm({
  onCancel,
  onSubmit,
  initialTicket = emptyTicket,
}) {
  const formattedInitial = {
    ...initialTicket,
    TicketDueDate: DateFormatter.forInputDateTime(initialTicket.TicketDueDate),
  };

  // Validation --------------------------
  const validation = {
    isValid: {
      TicketTitle: (title) => title.length >= 3,
      TicketDescription: (desc) => desc.length >= 5,
      TicketDueDate: (value) => !Number.isNaN(Date.parse(value)),
      TicketOfficeLocationID: (id) => !isNaN(id) && id > 0,
      TicketRequestedByUserID: (id) => !isNaN(id) && id > 0,
      TicketCreateAt: () => true,
    },

    errorMessage: {
      TicketTitle: "Title must be at least 3 characters",
      TicketDescription: "Description must be at least 5 characters",
      TicketDueDate: "Enter a valid date",
      TicketOfficeLocationID: "Invalid office selected",
      TicketRequestedByUserID: "Invalid user",
    },
  };

  const conformance = ["TicketOfficeLocationID", "TicketRequestedByUserID"];

  // State ---------------------------------------
  const [ticket, errors, handleChange, handleSubmit] = Form.useForm(
    formattedInitial,
    conformance,
    validation,
    onCancel,
    onSubmit,
  );

  const [offices, , loadingOffices] = useLoad("/offices");
  const [users, , loadingUsers] = useLoad("/users/client");

  // View ----------------------------------------
  return (
    <Form onSubmit={handleSubmit} onCancel={onCancel}>
      <Form.Item
        label="Ticket Title"
        htmlFor="TicketTitle"
        advice="Enter a title for the ticket"
        error={errors.TicketTitle}
      >
        <input
          type="text"
          name="TicketTitle"
          value={ticket.TicketTitle}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        label="Ticket Description"
        htmlFor="TicketDescription"
        advice="Enter a description for the ticket"
        error={errors.TicketDescription}
      >
        <textarea
          name="TicketDescription"
          value={ticket.TicketDescription}
          onChange={handleChange}
        ></textarea>
      </Form.Item>

      <Form.Item
        label="Due Date"
        htmlFor="TicketDueDate"
        advice="Enter a due date you need the request to be done"
        error={errors.TicketDueDate}
      >
        <input
          type="date"
          name="TicketDueDate"
          value={ticket.TicketDueDate}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        label="Office Location"
        htmlFor="TicketOfficeLocationID"
        advice="Select the office for this ticket"
        error={errors.TicketOfficeLocationID}
      >
        {!offices ? (
          <p>{loadingOffices}</p>
        ) : offices.length === 0 ? (
          <p>No offices found</p>
        ) : (
          <select
            name="TicketOfficeLocationID"
            value={ticket.TicketOfficeLocationID}
            onChange={handleChange}
          >
            <option value="0" disabled>
              Select an office
            </option>
            {offices.map((office) => (
              <option key={office.OfficeID} value={office.OfficeID}>
                {office.OfficeName}
              </option>
            ))}
          </select>
        )}
      </Form.Item>

      <Form.Item
        label="Requested By"
        htmlFor="TicketRequestedByUserID"
        advice="Select the user creating the ticket"
        error={errors.TicketRequestedByUserID}
      >
        {!users ? (
          <p>{loadingUsers}</p>
        ) : users.length === 0 ? (
          <p>No users found</p>
        ) : (
          <select
            name="TicketRequestedByUserID"
            value={ticket.TicketRequestedByUserID}
            onChange={handleChange}
          >
            <option value="0" disabled>
              Select user
            </option>
            {users.map((user) => (
              <option key={user.UserID} value={user.UserID}>
                {user.FullName}
              </option>
            ))}
          </select>
        )}
      </Form.Item>
    </Form>
  );
}
