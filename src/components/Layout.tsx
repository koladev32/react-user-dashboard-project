import React from "react";
import { Link } from "react-router-dom";

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
    <div className="flex flex-row h-screen">
      <div className="w-2/12 p-8 bg-blue-600 h-full text-white fixed">
        <h2 className="text-center text-xl font-bold">DASHBOARD</h2>
        <ul className="mt-8 space-y-2">
          {sideBarLinks.map((link) => (
            <li className="hover:text-black" key={link.label}>
              <Link to={link.link}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col w-10/12 p-8 space-y-4 ml-auto">
        <h3 className="text-xl text-blue-600 font-bold">{props.title}</h3>
        {props.children}
      </div>
    </div>
  );
}

export default Layout;
