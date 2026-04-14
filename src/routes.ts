import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("Pages/Home.tsx"),
    route("documents/:fileId", "Pages/EditorPage.tsx"),
    route("blocks", "Pages/BlocksPage.tsx"),
] satisfies RouteConfig;
