import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("./Layout/Layout.tsx", [
        index('./Pages/HomePage.tsx'),
        route("documents/:fileId", "./Pages/EditorPage.tsx"),
        route("blocks", "./Pages/BlocksPage.tsx"),
        route("/images", "Pages/ImagesPage.tsx"),
    ]),
] satisfies RouteConfig;

