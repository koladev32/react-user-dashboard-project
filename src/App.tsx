import React from "react";
import { Provider } from "react-redux";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { AddUser, ListUsers, UpdateUser, NotFound } from "./pages";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListUsers />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/update/:id/" element={<UpdateUser />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
