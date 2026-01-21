import { ActionYes, ActionNo, ActionClose } from "../UI/Actions.js";
import ToolTipDecorator from "../UI/ToolTipDecorator.js";

export const createDeleteModal = (onConfirm, onCancel, itemType = "item") => ({
  show: true,
  title: "Alert!",
  content: <p>Are you sure you want to delete this {itemType}?</p>,
  actions: [
    <ToolTipDecorator key="ActionYes" message="Click to confirm deletion">
      <ActionYes showText onClick={async () => { await onConfirm(); onCancel(); }} />
    </ToolTipDecorator>,
    <ToolTipDecorator key="ActionNo" message="Click to abandon deletion">
      <ActionNo showText onClick={onCancel} />
    </ToolTipDecorator>,
  ],
});

export const createErrorModal = (title, message, onClose) => ({
  show: true,
  title: title,
  content: <p>{message}</p>,
  actions: [
    <ToolTipDecorator
      key="ActionClose"
      message="Click to dismiss error message"
    >
      <ActionClose showText onClick={onClose} />
    </ToolTipDecorator>,
  ],
});
