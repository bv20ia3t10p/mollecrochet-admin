import { Outlet } from "react-router";
import { AuthenticatedRoute } from "./AuthenticatedRoute";
import { Page } from "../components/layouts/Page";
import LoginForm from "../components/forms/LoginForm";
import { ProductTable } from "../components/tables/ProductTable";
import { UserTable } from "../components/tables/UserTable";
import { OrderTable } from "../components/tables/OrderTable";
import { AddressTable } from "../components/tables/AddressesTable";
import Breadcrumbs from "../components/Breadcrumbs";
import { Divider } from "antd";
import Dashboard from "../components/Dashboard";

export const createRoutes = () => {
    const appRoutes = [
        {
            path: "/manage",
            element: (
                <AuthenticatedRoute>
                    <Page>
                        <Breadcrumbs />
                        <Divider />
                        <Outlet />
                    </Page>
                </AuthenticatedRoute>
            ),
            children: [
                {
                    path: "",
                    index: true,
                    element: <Dashboard />
                },
                // Fixed typo here
                {
                    path: "products",
                    element: <ProductTable />,
                },
                {
                    path: "users",
                    element: <UserTable />,
                },
                {
                    path: "orders",
                    element: <OrderTable />,
                },
                {
                    path: "addresses",
                    element: <AddressTable />
                }
            ],
        },
        {
            path: "/",
            element: <LoginForm />,
        },
    ];

    return appRoutes;
};
