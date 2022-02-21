import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { userSlice } from "../store/slices/user";

function render(
  ui: React.ReactNode,
  {
    // @ts-ignore
    preloadedState,
    store = configureStore({
      reducer: { users: userSlice.reducer },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  // @ts-ignore
  // eslint-disable-next-line react/prop-types
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  return rtlRender(
    ui as React.ReactElement<any, string | React.JSXElementConstructor<any>>,
    { wrapper: Wrapper, ...renderOptions }
  );
}

export * from "@testing-library/react";
export { render };
