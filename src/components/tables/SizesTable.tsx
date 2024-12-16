/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import DynamicTable from "./DynamicTable";
import { Typography } from "antd";
import { Content } from "antd/es/layout/layout";

export const SizesTable: React.FC = () => {
    const { data: sizes, isLoading: isLoadingSizes, createMutation, updateMutation, deleteMutation } = useFirestoreCollection("Size"); // Fetch sizes


    // Handle create logic (uses the createMutation from useFirestoreCollection)
    const handleCreate = (newItem: any) => {
        createMutation.mutate(newItem); // Call the create mutation
    };

    // Handle edit logic (uses the updateMutation from useFirestoreCollection)
    const handleEdit = (updatedItem: any) => {
        updateMutation.mutate(updatedItem); // Call the update mutation
    };

    // Handle delete logic (uses the deleteMutation from useFirestoreCollection)
    const handleDelete = (id: string) => {
        deleteMutation.mutate(id); // Call the delete mutation
    };

    // Filter products based on selected size

    return (
        <Content className="py-[1vh] pt-[2vh] rounded-md bg-white">
            <Typography.Title level={5} style={{marginLeft:'24px'}} >
                Manage sizes
            </Typography.Title>
            <DynamicTable
                data={sizes ?? []} // Pass filtered products data
                isLoading={isLoadingSizes} // Show loading state for products and sizes
                canEdit={true}
                canDelete={true}
                canCreate={true}
                onCreate={handleCreate}
                onEdit={handleEdit}
                onDelete={handleDelete}
                sizes={sizes ?? []} // Pass sizes data dynamically
            />
        </Content>
    );
};
