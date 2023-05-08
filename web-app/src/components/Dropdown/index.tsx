import React from "react";
import { Menu, MenuItem, useTheme } from "@mui/material";
import { DropdownProps } from "./type";

export default function Dropdown({
  anchorEl,
  open,
  handleClose,
  options,
}: DropdownProps) {
  const theme = useTheme();

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          background: theme.palette.secondary.dark,
          overflow: "visible",
          mt: 1.5,
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: theme.palette.secondary.dark,
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {options.map(({ icon, label, handler }) => (
        <MenuItem
          key={label}
          sx={{
            minWidth: "260px",
            font: theme.font.xs,
            color: theme.palette.secondary.light,
            padding: "10px 20px",
            "&:hover": {
              color: theme.palette.primary[700],
              background: theme.palette.secondary.A100,
            },
          }}
          onClick={handler}
        >
          {icon} {label}
        </MenuItem>
      ))}
    </Menu>
  );
}
