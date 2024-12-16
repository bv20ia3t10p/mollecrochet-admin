/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import DynamicTable from "./DynamicTable";
import { Typography } from "antd";
import { Content } from "antd/es/layout/layout";

export const OrderTable: React.FC = () => {
    const { data: orders, isLoading: isLoadingOrders, updateMutation } = useFirestoreCollection("Orders"); // Fetch orders
    const { data: users, isLoading: isLoadingUsers } = useFirestoreCollection("Users"); // Fetch users

    // Handle status change and update Firestore
    const handleChangeStatus = (newStatus: string, currentItem: any) => {
        // Find the order by ID
        const orderIndex = orders?.findIndex(order => order.id === currentItem.id) ?? 0;

        if (orderIndex !== -1) {
            // Create a copy of the order and update the status
            const updatedOrder = { ...orders?.[orderIndex], status: newStatus };
            
            // Update the order in Firestore (this assumes you have an `updateMutation` hook to handle Firestore updates)
            updateMutation.mutate(updatedOrder);
        }
    };

    return (
        <Content className="py-[1vh] rounded-md bg-white">
            <Typography.Title style={{marginLeft:'0.5vw'}}  level={5}>
                Manage orders
            </Typography.Title>
            <DynamicTable
                data={users?.flatMap((curUser) =>
                    orders
                        ?.filter((order) => order.uid === curUser.id)
                        .map((order) => ({ email: curUser.email, ...order }))
                ) ?? []} // Pass filtered products data
                isLoading={isLoadingOrders || isLoadingUsers} // Show loading state for products and sizes
                canEdit={false}
                canDelete={false}
                canCreate={false}
                showStatus={true}
                handleChangeStatus={handleChangeStatus} // Pass the handleChangeStatus function
            />
        </Content>
    );
};
