import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("./Layout/Layout.tsx", [
        index('./Pages/Home.tsx'),
        route("documents/:fileId", "./Pages/EditorPage.tsx"),
        route("blocks", "./Pages/BlocksPage.tsx"),
    ]),
] satisfies RouteConfig;

