"use client";

import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { usePathname } from "next/navigation";
import Link from "next/link";
const SidebarMenu = () => {
  const pathname = usePathname();
  return (
    <ListSubheader>
      <ListItem>
        <Link className="w-full h-full" href={"/tools"}>
          <ListItemButton>
            <ListItemText
              primary="Home"
              sx={{
                color: pathname === "/tools" ? "primary.main" : "inherit",
              }}
            />
          </ListItemButton>
        </Link>
      </ListItem>
      <ListItem>
        <Link className="w-full h-full" href={"/tools/random"}>
          <ListItemButton>
            <ListItemText
              primary="random"
              sx={{
                color:
                  pathname === "/tools/random" ? "primary.main" : "inherit",
              }}
            />
          </ListItemButton>
        </Link>
      </ListItem>
    </ListSubheader>
  );
};

export default SidebarMenu;
