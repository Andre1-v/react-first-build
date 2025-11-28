import { useState } from "react";
import { useAuth } from "../auth/useAuth.js";
import API from "../api/API.js";
import { ActionTray, ActionAdd } from "../UI/Actions.js";
import TicketPanels from "../entities/ticket/TicketPanels.js";
import ToolTipDecorator from "../UI/ToolTipDecorator.js";
import TicketForm from "../entities/ticket/TicketForm.js";
import useLoad from "../api/useLoad.js";
import "./Pages.scss";

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
  const handleAdd = () => setShowNewTicketForm(true);
  const handleDismissAdd = () => setShowNewTicketForm(false);

  const handleSubmit = async (ticket) => {
    const response = await API.post(postTicketsEndpoint, ticket);
    return response.isSuccess
      ? loadTickets(postTicketsEndpoint) || true
      : false;
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
        <TicketPanels tickets={tickets} />
      )}

      <p>&nbsp;</p>
      <ActionTray>
        <ToolTipDecorator message="Create a new ticket">
          <ActionAdd
            showText
            onClick={handleAdd}
            buttonText="Create new ticket"
          />
        </ToolTipDecorator>
      </ActionTray>

      {showNewTicketForm && (
        <TicketForm onDismiss={handleDismissAdd} onSubmit={handleSubmit} />
      )}
    </section>
  );
}
