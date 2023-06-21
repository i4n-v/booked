import React from "react";
import {
  Dialog as MaterialDialog,
  DialogContent,
  DialogTitle,
  IconButton,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import { Box } from "@mui/system";
import { IConfirmProps } from "./types";
import highlightText from "../HighlightText";

function Confirm({
  text,
  open,
  onClose,
  children,
  icon,
  maxWidth,
  fullWidth,
  hideBackdrop = false,
  actions,
  onConfirm,
  onCancel,
  ...props
} : IConfirmProps) {
  return (
    <MaterialDialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      hideBackdrop={hideBackdrop}
      onClick={(event) => event.stopPropagation()}
      sx={{
        padding: 1,
        "& .MuiDialogTitle-root": {
          p: 2,
        },
      }}
      {...props}
    >
      <DialogTitle
        sx={{
          marginTop: 2,
          mb: 2,
          fontWeight: 500,
          display: "flex",
          justifyContent: "space-between",
        }}
        color="secondary"
      >
        <Box sx={{ display: "flex", alignItems: "center" }} gap={2}>
          <Typography component={"p"} sx={{font: t => t.font.md,color: t => t.palette.secondary.A100}} textAlign={"center"}>
            {highlightText(text)}
          </Typography>
          <Box>{icon}</Box>
        </Box>
        <IconButton onClick={() => onClose()}>
          <CloseRounded />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          mt: -3,
          "&.MuiDialogContent-root": {
            padding: 2,
          },
        }}
      >
        {children}
      </DialogContent>
      {actions && (
        <DialogActions>
          <Button
            onClick={(e) => {
              if (onCancel instanceof Function) onCancel();
              if (onClose instanceof Function) onClose();
            }}
            color="error"
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              if (onConfirm instanceof Function) onConfirm();
              if (onClose instanceof Function) onClose();
            }}
          >
            Confirmar
          </Button>
        </DialogActions>
      )}
    </MaterialDialog>
  );
}

export default Confirm;
