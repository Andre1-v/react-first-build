import Panel from "../../UI/Panel.js";
import ObjectTable from "../../UI/ObjectTable.js";

export default function AssignmentPanels({ assignments }) {
  // Initialisation ------------------------------
  // State ---------------------------------------
  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  const displayableAttributes = [
    { key: "AssignmentStatus", label: "Status" },
    { key: "AssignedAt", label: "Date" },
    { key: "AssignmentJobDescription", label: "Description" },
  ];

  return (
    <Panel.Container>
      {assignments.map((assignment) => (
        <Panel
          key={assignment.AssignmentID}
          title={`${assignment.AssignmentID} ${assignment.AssignmentJobTitle}`}
          level={3}
        >
          <Panel.Static level={4}>
            <ObjectTable
              object={assignment}
              attributes={displayableAttributes}
            />
          </Panel.Static>
        </Panel>
      ))}
    </Panel.Container>
  );
}
