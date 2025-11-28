import Panel from "../../UI/Panel.js";
import ObjectTable from "../../UI/ObjectTable.js";

export default function TicketPanels({ tickets }) {
  const displayableAttributes = [
    { key: "TicketTitle", label: "Title" },
    { key: "TicketDescription", label: "Description" },
    { key: "TicketOfficeName", label: "Office" },
    { key: "RequestedByUserName", label: "Requested By" },
    { key: "CreatedAt", label: "Created At" },
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
        </Panel>
      ))}
    </Panel.Container>
  );
}
