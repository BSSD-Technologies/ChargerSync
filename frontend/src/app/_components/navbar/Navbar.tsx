"use client";

import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import Image from "next/image";
import WhiteLogo from "@/app/_assets/WhiteLogo.svg";
import Link from "next/link";
import NavDrawer from "./NavDrawer";

/** Define interface for a navbar item
 * name: button text
 * link: href for navbar button
 * key: a unique key name
 */
export interface NavbarItem {
  name: string;
  link: string;
  key: string;
}

/** Array of navbar links with associated NavbarItem data */
const pages: NavbarItem[] = [
  {
    name: "Generate Schedule",
    link: "/input-data",
    key: "generate",
  },
  {
    name: "Help Manual",
    link: "/help",
    key: "help"
  },
];

export default function Navbar() {

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            sx={{
              mr: 3,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Link passHref href="/">
              <Image src={WhiteLogo} alt={"Charger Sync"} height={60}></Image>
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <NavDrawer navItems={pages} />
          </Box>
          <Typography
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
            }}
          >
            <Link passHref href="/">
              <Image src={WhiteLogo} alt={"Charger Sync"} height={60}></Image>
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page: NavbarItem) => (
              <Link passHref href={page.link} key={page.key}>
                <Button
                  variant="text"
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
