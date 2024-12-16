import React from "react";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import DynamicTable from "./DynamicTable";
import { Typography } from "antd";
import { Content } from "antd/es/layout/layout";

export const CommentsTable: React.FC = () => {
    const { data: comments, isLoading: isLoadingComment, deleteMutation } = useFirestoreCollection('Comments'); // Fetch products
    const { data: products, isLoading: isLoadingProducts } = useFirestoreCollection('Products');
    const { data: users, isLoading: isLoadingUsers } = useFirestoreCollection('Users');

    const showingComments = comments?.map(c => {
        console.log(products);
        const email = users?.filter(u => u.uid === c.uid)?.[0].email ?? '';
        const productName = products?.filter(p => p.id == c.productid)?.[0]?.title ?? '';
        return { ...c, email, productName }
    })


    // Handle delete logic (uses the deleteMutation from useFirestoreCollection)
    const handleDelete = (id: string) => {
        deleteMutation.mutate(id); // Call the delete mutation
    };

    // Filter products based on selected size

    return (
        <Content className="p-[3.5vw] shadow-xl rounded-xl bg-white">
            <Typography.Title level={5} >
                Manage comments
            </Typography.Title>
            <DynamicTable
                data={showingComments ?? []} // Pass filtered products data
                isLoading={isLoadingComment || isLoadingProducts || isLoadingUsers} // Show loading state for products and sizes
                canDelete={true}
                canEdit={false}
                canCreate={false}
                onDelete={handleDelete} // Pass sizes data dynamically
            />
        </Content>
    );
};
