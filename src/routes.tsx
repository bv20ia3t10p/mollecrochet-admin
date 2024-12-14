import { Outlet } from "react-router";

export const createRoutes = () => {
    const appRoutes = [
        {
            path: "/",
            element: (
                <Outlet />
            ),
            children: [
                {
                    path: "",
                    index: true,
                    element: <></> // Home or storefront page
                }
            ],
        },
    ];

    return appRoutes;
};