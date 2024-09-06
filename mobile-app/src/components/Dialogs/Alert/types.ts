interface IAlertProps {
  title: string;
  message: string;
  open: boolean;
  status?: "error" | "info" | "success" | "warning";
  onClose(): void;
  onConfirm?(): void;
  onCancel?(): void;
  confirmTextButton?: string;
  cancelTextButton?: string;
  hasActions?: boolean;
}

interface IconContainerProps {
  color: string;
}

type IStatusTypes = "error" | "success" | null;

export { IAlertProps, IconContainerProps, IStatusTypes };
