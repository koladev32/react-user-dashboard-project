import React from "react";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
function Layout(props: { children: React.ReactNode; title: string }) {
  const sideBarLinks = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Add user",
      link: "/users/add",
    },
  ];

  return (
    <Stack direction="row" spacing={4}>
      <div>
        <h2>User Dashboard</h2>
        <ul>
          {sideBarLinks.map((link) => (
            <li key={link.label}>
              <Link to={link.link}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ width: "80%" }}>
        <h3>{props.title}</h3>
        {props.children}
      </div>
    </Stack>
  );
}

export default Layout;
