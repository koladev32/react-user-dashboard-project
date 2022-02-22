import React from "react";

function Layout(props: { children: React.ReactNode; title: string }) {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.children}
    </div>
  );
}

export default Layout;
