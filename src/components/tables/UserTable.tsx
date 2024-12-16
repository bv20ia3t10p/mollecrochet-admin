import React from "react";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import DynamicTable from "./DynamicTable";
import { Typography } from "antd";
import { Content } from "antd/es/layout/layout";

export const UserTable: React.FC = () => {
    const { data: users, isLoading: isLoadingUsers } = useFirestoreCollection("Users"); // Fetch sizes
    // Filter products based on selected size

    return (
        <Content className="px-[1vw] py-[2.5vh]  shadow-xl rounded-xl bg-white">
            <Typography.Title level={5} >
                Manage users
            </Typography.Title>
            <DynamicTable
                data={users ?? []} // Pass filtered products data
                isLoading={isLoadingUsers} // Show loading state for products and sizes
                canEdit={false}
                canDelete={false}
                canCreate={false}
            />
        </Content>
    );
};
