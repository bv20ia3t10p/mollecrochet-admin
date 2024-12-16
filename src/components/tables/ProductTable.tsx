/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import DynamicTable from "./DynamicTable";
import { Typography } from "antd";
import { Content } from "antd/es/layout/layout";

export const ProductTable: React.FC = () => {
    const { data: sizes, isLoading: isLoadingSizes } = useFirestoreCollection("Size"); // Fetch sizes
    const { data: products, isLoading: isLoadingProduct, createMutation, updateMutation, deleteMutation } = useFirestoreCollection('Products'); // Fetch products



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
        <Content className="p-[2.5vw]  shadow-xl rounded-xl bg-white">
            <Typography.Title level={5} >
                Manage products
            </Typography.Title>
            <DynamicTable
                data={products ?? []} // Pass filtered products data
                isLoading={isLoadingProduct || isLoadingSizes} // Show loading state for products and sizes
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
