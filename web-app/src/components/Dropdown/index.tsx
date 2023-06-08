import React, { useEffect, useState } from "react";
import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { DropdownProps } from "./type";

export default function Dropdown({
  anchorId,
  open,
  handleClose,
  options,
  minWidth = "260px",
  ...props
}: DropdownProps) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const element = document.getElementById(anchorId);
    setAnchorEl(element);
  }, [anchorId]);

  if (!anchorEl) return <></>
  return (
    <Menu
      id="menu-dropdown"
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
      {...props}
    >
      {options.map(({ icon, label, handler }) => (
        <MenuItem
          key={label}
          sx={{
            minWidth: {minWidth},
            padding: "10px 20px",
            "&:hover": {
              background: theme.palette.secondary.A100,
              "& span": {
                color: theme.palette.primary[700],
              },
            },
          }}
          onClick={handler}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText
            sx={{
              font: theme.font.xs,
              color: theme.palette.secondary.light,
            }}
          >
            {label}
          </ListItemText>
        </MenuItem>
      ))}
    </Menu>
  );
}
