import { Provider } from "react-redux";
import { Meta, Links, ScrollRestoration, Scripts, Outlet } from "react-router";
import { store } from "../store/store";
import Box from "@mui/material/Box";

export function Layout() {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Provider store={store}>
          <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
            <Outlet />
          </Box>
        </Provider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
