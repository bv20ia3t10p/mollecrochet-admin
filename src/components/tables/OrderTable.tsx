import React from "react";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import DynamicTable from "./DynamicTable";
import { Typography } from "antd";
import { Content } from "antd/es/layout/layout";

export const OrderTable: React.FC = () => {
    const { data: orders, isLoading: isLoadingOrders } = useFirestoreCollection("Orders"); // Fetch sizes
    const { data: users, isLoading: isLoadingUsers } = useFirestoreCollection("Users");

    // Filter products based on selected size

    return (
        <Content className="p-[2vw] shadow-xl rounded-xl bg-white">
            <Typography.Title level={5} >
                Manage orders
            </Typography.Title>
            <DynamicTable
                data={users?.flatMap((curUser) =>
                    orders
                        ?.filter((orders) => orders.uid === curUser.id)
                        .map((orders) => ({ email: curUser.email, ...orders }))
                ) ?? []} // Pass filtered products data
                isLoading={isLoadingOrders || isLoadingUsers} // Show loading state for products and sizes
                canEdit={false}
                canDelete={false}
                canCreate={false}
            />
        </Content>
    );
};
