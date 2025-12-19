import { useState } from "react";
import { useAuth } from "../auth/useAuth.js";
import API from "../api/API.js";
import { ActionTray, ActionAdd } from "../UI/Actions.js";
import ToolTipDecorator from "../UI/ToolTipDecorator.js";
import useLoad from "../api/useLoad.js";
import "./Pages.scss";
import TicketPanels from "../entitites/ticket/TicketPanels.js";
import TicketForm from "../entitites/ticket/TicketForm.js";

export default function MyTickets() {
  // Initialisation ------------------------------
  const { loggedinUser } = useAuth();

  const getTicketsEndpoint = loggedinUser
    ? `/tickets/users/${loggedinUser.UserID}`
    : null;
  const postTicketsEndpoint = `/tickets`;

  // State ---------------------------------------
  const [tickets, , loadingMessage, loadTickets] = useLoad(getTicketsEndpoint);

  const [showNewTicketForm, setShowNewTicketForm] = useState(false);

  // Methods -------------------------------------
  const toggleAddForm = () => {
    setShowNewTicketForm(true);
  };
  const cancelAddForm = () => {
    setShowNewTicketForm(false);
  };

  const handleAddSubmit = async (ticket) => {
    const response = await API.post(postTicketsEndpoint, ticket);
    return loadTickets() && response.isSuccess;
  };

  // View ----------------------------------------
  return (
    <section>
      <h1>My Tickets</h1>

      {!tickets ? (
        <p>{loadingMessage}</p>
      ) : tickets.length === 0 ? (
        <p>No Tickets found</p>
      ) : (
        <TicketPanels tickets={tickets} reloadTickets={loadTickets} />
      )}

      <p>&nbsp;</p>
      <ActionTray>
        <ToolTipDecorator message="Add a new ticket">
          <ActionAdd
            showText
            onClick={toggleAddForm}
            buttonText="Add a new ticket"
          />
        </ToolTipDecorator>
      </ActionTray>

      {showNewTicketForm && (
        <TicketForm onCancel={cancelAddForm} onSubmit={handleAddSubmit} />
      )}
    </section>
  );
}
