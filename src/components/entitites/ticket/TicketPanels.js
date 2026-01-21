import API from "../../api/API.js";
import TicketForm from "../../entitites/ticket/TicketForm.js";
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

export default function TicketPanels({ tickets, reloadTickets }) {
  //Initialisation ------------------------

  const putTicketsEndpoint = "/tickets";
  const deleteTicketsEndpoint = "/tickets";

  // Format tickets
  const formattedTickets = tickets.map((ticket) => ({
    ...ticket,
    TicketDueDateTimeFormatted: DateFormatter.forDisplayWithTime(
      ticket.TicketDueDate,
    ),
    TicketCreatedAtFormatted: DateFormatter.forDisplayWithTime(
      ticket.TicketCreatedAt,
    ),
  }));

  const displayableAttributes = [
    { key: "TicketTitle", label: "Title" },
    { key: "TicketDescription", label: "Description" },
    { key: "TicketDueDateTimeFormatted", label: "Due Date" },
    { key: "TicketOfficeName", label: "Office" },
    { key: "TicketRequestedByUserName", label: "Requested By" },
    { key: "TicketCreatedAtFormatted", label: "Created At" },
  ];

  // State for form display
  const [showFormId, setShowFormId] = useState(0);
  const { handleModal } = Modal.useModal();

  // Modal helpers
  const dismissModal = () => handleModal({ show: false });
  const showDeleteModal = (id) =>
    handleModal(
      createDeleteModal(() => handleDelete(id), dismissModal, "ticket"),
    );
  const showErrorModal = (title, message) =>
    handleModal(createErrorModal(title, message, dismissModal));

  // Form handlers
  const toggleModify = (id) => setShowFormId(showFormId === id ? 0 : id);
  const handleSubmit = async (ticket) => {
    try {
      await handleModifySubmit(ticket);
      setShowFormId(0);
    } catch (error) {
      showErrorModal("Update failed!", error.message || "An error occurred");
    }
  };
  const handleCancel = () => setShowFormId(0);
  const handleDelete = async (id) => {
    const response = await API.delete(`${deleteTicketsEndpoint}/${id}`);
    if (!response.isSuccess) {
      throw new Error(response.message);
    }
    reloadTickets();
  };

  const handleModifySubmit = async (ticket) => {
    const response = await API.put(
      `${putTicketsEndpoint}/${ticket.TicketID}`,
      ticket,
    );
    if (!response.isSuccess) {
      throw new Error(response.message);
    }
    reloadTickets();
  };

  return (
    <Panel.Container>
      {formattedTickets.map((ticket) => (
        <Panel
          key={ticket.TicketID}
          title={`${ticket.TicketID} - ${ticket.TicketTitle}`}
          level={3}
        >
          <Panel.Static level={4}>
            <ObjectTable object={ticket} attributes={displayableAttributes} />
          </Panel.Static>

          <ActionTray>
            <ToolTipDecorator message="Modify this ticket">
              <ActionModify
                showText
                onClick={() => toggleModify(ticket.TicketID)}
                buttonText="Modify ticket"
              />
            </ToolTipDecorator>
            <ToolTipDecorator message="Delete this ticket">
              <ActionDelete
                showText
                onClick={() => showDeleteModal(ticket.TicketID)}
                buttonText="Delete ticket"
              />
            </ToolTipDecorator>
          </ActionTray>

          {showFormId === ticket.TicketID && (
            <TicketForm
              initialTicket={ticket}
              onCancel={handleCancel}
              onSubmit={handleSubmit}
            />
          )}
        </Panel>
      ))}
    </Panel.Container>
  );
}
