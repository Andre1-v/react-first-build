import { useState } from "react";
import Modal from "../../UI/Modal.js";
import API from "../../api/API.js";
import Panel from "../../UI/Panel.js";
import ObjectTable from "../../UI/ObjectTable.js";
import {
  ActionTray,
  ActionModify,
  ActionDelete,
  ActionYes,
  ActionNo,
  ActionClose,
} from "../../UI/Actions.js";
import ToolTipDecorator from "../../UI/ToolTipDecorator.js";
import TicketForm from "../../entitites/ticket/TicketForm.js";

export default function TicketPanels({ tickets, reloadTickets }) {
  //Initialisation ------------------------

  const putTicketsEndpoint = "/tickets";
  const deleteTicketsEndpoint = "/tickets";

  //State --------------------------

  const [showFormId, setShowFormId] = useState(0);

  //Context -------------------------
  const { handleModal } = Modal.useModal();
  //Methods ----------------------------------
  const toggleModify = (id) => setShowFormId(showFormId === id ? 0 : id);
  const handleDelete = async (id) => {
    dismissModal();
    const response = await API.delete(`${deleteTicketsEndpoint}/${id}`);
    response.isSuccess
      ? reloadTickets()
      : showErrorModal("Delete failed!", response.message);
  };
  const handleSubmit = async (ticket) => {
    const response = await API.put(
      `${putTicketsEndpoint}/${ticket.TicketID}`,
      ticket
    );
    if (response.isSuccess) {
      setShowFormId(0);
      reloadTickets();
    }
  };

  const handleCancel = () => setShowFormId(0);

  const showDeleteModal = (id) =>
    handleModal({
      show: true,
      title: "Alert!",
      content: <p> Are you sure you want to delete this ticket?</p>,
      actions: [
        <ToolTipDecorator key="ActionYes" message="Click to confirm deletion">
          <ActionYes showText onClick={() => handleDelete(id)} />
        </ToolTipDecorator>,
        <ToolTipDecorator key="ActionNo" message="Click to abandon deletion">
          <ActionNo showText onClick={dismissModal} />
        </ToolTipDecorator>,
      ],
    });

  const showErrorModal = (title, message) =>
    handleModal({
      show: true,
      title: title,
      content: <p>{message}</p>,
      actions: [
        <ToolTipDecorator
          key="ActionClose"
          message="Click to dismiss error message"
        >
          <ActionClose showText onClick={dismissModal} />
        </ToolTipDecorator>,
      ],
    });

  const dismissModal = () => handleModal({ show: false });

  const displayableAttributes = [
    { key: "TicketTitle", label: "Title" },
    { key: "TicketDescription", label: "Description" },
    { key: "TicketDueDate", label: "Due Date" },
    { key: "TicketOfficeName", label: "Office" },
    { key: "TicketRequestedByUserName", label: "Requested By" },
    { key: "TicketCreatedAt", label: "Created At" },
  ];

  return (
    <Panel.Container>
      {tickets.map((ticket) => (
        <Panel
          key={ticket.TicketID}
          title={`${ticket.TicketID} - ${ticket.TicketTitle}`}
          level={3}
        >
          <Panel.Static level={4}>
            <ObjectTable object={ticket} attributes={displayableAttributes} />
          </Panel.Static>

          <ActionTray>
            <ToolTipDecorator message="Modify this request">
              <ActionModify
                showText
                onClick={() => toggleModify(ticket.TicketID)}
                buttonText="Modify ticket"
              />
            </ToolTipDecorator>
            <ToolTipDecorator message="Delete this request">
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
