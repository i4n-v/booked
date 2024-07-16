interface IAlertProps {
  title: string;
  message: string;
  open?: boolean;
  handleClose(): void;
  onClose(): void;
  onConfirm(): void;
  onCancel(): void;
  confirmTextButton?: string;
  cancelTextButton?: string;
  hasActions?: boolean;
}

export { IAlertProps };
