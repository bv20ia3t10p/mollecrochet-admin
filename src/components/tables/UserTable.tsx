import React from "react";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import DynamicTable from "./DynamicTable";
import { Typography } from "antd";
import { Content } from "antd/es/layout/layout";

export const UserTable: React.FC = () => {
    const { data: users, isLoading: isLoadingUsers } = useFirestoreCollection("Users"); // Fetch sizes
    // Filter products based on selected size

    return (
        <Content className="py-[1vh]  rounded-md bg-white">
            <Typography.Title level={5} style={{marginLeft:'0.5vw'}} >
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
