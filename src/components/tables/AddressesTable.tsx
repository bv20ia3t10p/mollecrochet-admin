import React from "react";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import DynamicTable from "./DynamicTable";
import { Typography } from "antd";
import { Content } from "antd/es/layout/layout";

export const AddressTable: React.FC = () => {
    const { data: addresses, isLoading: isLoadingAddresses } = useFirestoreCollection("Address"); // Fetch sizes
    const { data: users, isLoading: isLoadingUsers } = useFirestoreCollection("Users");
    // Filter products based on selected size

    return (
        <Content className="px-[1vw] py-[2.5vh]  shadow-xl rounded-xl bg-white">
            <Typography.Title level={5} >
                Manage users
            </Typography.Title>
            <DynamicTable
                data={users?.flatMap((curUser) =>
                    addresses
                        ?.filter((address) => address.uid === curUser.id)
                        .map((address) => ({ email: curUser.email, ...address }))
                ) ?? []} // Pass filtered products data
                isLoading={isLoadingAddresses || isLoadingUsers} // Show loading state for products and sizes
                canEdit={false}
                canDelete={false}
                canCreate={false}
            />
        </Content>
    );
};
