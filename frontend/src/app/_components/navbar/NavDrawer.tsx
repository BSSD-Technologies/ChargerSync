"use client";

import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useState } from "react";
import { NavbarItem } from "./Navbar";
import Link from "next/link";

/** Define interface for NavDrawer props
 * navItems: array of NavbarItem's for drawer
 */
interface NavDrawerProps {
  navItems: NavbarItem[];
}

export default function NavDrawer(props: NavDrawerProps) {
  const anchor = "left";  // Anchor drawer to the left of the page
  const navItems: NavbarItem[] = props.navItems;  // Get NavbarItem prop
  const [isOpen, setIsOpen] = useState(false);    // Drawer open state

  /** Toggle drawer open state based on click event */
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsOpen(open);
    };

  /** List of NavbarItem's for drawer */
  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navItems.map((page) => (
          <Link passHref href={page.link} key={page.key}>
            <ListItem key={page.name} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {page.key === "generate" ? (
                    <AddCircleRoundedIcon color="primary" />
                  ) : (
                    <HelpRoundedIcon color="primary" />
                  )}
                </ListItemIcon>
                <ListItemText primary={page.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <Box>
      <IconButton
        size="large"
        aria-haspopup="true"
        onClick={toggleDrawer(true)}
        color="inherit"
      >
        <MenuRoundedIcon />
      </IconButton>
      <Drawer anchor={anchor} open={isOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </Box>
  );
}
