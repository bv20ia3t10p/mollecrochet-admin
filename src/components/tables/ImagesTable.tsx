/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    ref,
    uploadBytes,
    listAll,
    getDownloadURL,
    deleteObject,
    getStorage,
} from "firebase/storage";
import { Button, Input, Table, Space, Modal, message, Tooltip, Row, Col } from "antd";
import { CopyOutlined, EyeOutlined } from "@ant-design/icons";
import { FirebaseApp } from "../../utils/FireBase";
import { Content } from "antd/es/layout/layout";
const storage = getStorage(FirebaseApp);

export const ImagesTable: React.FC = () => {
    const queryClient = useQueryClient();
    const [fileToUpload, setFileToUpload] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [urlToCopy, setUrlToCopy] = useState<string | null>(null);

    // Fetch files from Firebase Storage
    const fetchFiles = async () => {
        const storageRef = ref(storage);
        const fileList = await listAll(storageRef);
        const filePromises = fileList.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return { name: item.name, url };
        });
        return Promise.all(filePromises);
    };

    const { data: files, isLoading } = useQuery({ queryKey: ["files"], queryFn: fetchFiles });

    // Mutation for uploading a file
    const uploadMutation = useMutation({
        mutationFn: async (file: File) => {
            const fileRef = ref(storage, file.name);
            await uploadBytes(fileRef, file);
        },
        onSuccess: () => {
            message.success("File uploaded successfully!");
            queryClient.invalidateQueries({ queryKey: ["files"] }); // Refresh file list
        },
        onError: () => {
            message.error("Error uploading file!");
        },
    });

    // Mutation for deleting a file
    const deleteMutation = useMutation({
        mutationFn: async (fileName: any) => {
            const fileRef = ref(storage, fileName);
            await deleteObject(fileRef);
        },
        onSuccess: () => {
            message.success("File deleted successfully!");
            queryClient.invalidateQueries({ queryKey: ["files"] }); // Refresh file list
        },
        onError: () => {
            message.error("Error deleting file!");
        },
    });

    // Ant Design table columns
    const columns = [
        {
            title: "File Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "URL",
            dataIndex: "url",
            key: "url",
            render: (url: string) => (
                <Tooltip title="Click to view URL">
                    <Button
                        type="link"
                        icon={<EyeOutlined />}
                        onClick={() => setUrlToCopy(url)}
                    />
                </Tooltip>
            ),
        },
        {
            title: "Preview",
            dataIndex: "url",
            key: "preview",
            render: (url: string) => (
                <Button type="link" onClick={() => setPreviewUrl(url)}>
                    Preview
                </Button>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: { name: string }) => (
                <Button
                    type="link"
                    danger
                    onClick={() => deleteMutation.mutate(record.name)}
                >
                    Delete
                </Button>
            ),
        },
    ];

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url).then(() => {
            message.success("URL copied to clipboard!");
        });
    };

    return (
        <Content className="p-[2.5vw] shadow-xl rounded-xl bg-white">
            <h1 style={{ fontSize: "2rem", textAlign: "center" }}>Firebase Storage Manager</h1>

            {/* File Upload */}
            <Row gutter={[16, 16]} justify="center" style={{ marginBottom: 20 }}>
                <Col xs={24} sm={12} md={8}>
                    <Space direction="vertical" style={{ width: "100%" }}>
                        <Input
                            type="file"
                            onChange={(e) => setFileToUpload(e.target.files ? e.target.files[0] : null)}
                            style={{ width: "100%" }}
                        />
                        <Button
                            type="primary"
                            onClick={() => fileToUpload && uploadMutation.mutate(fileToUpload)}
                            disabled={!fileToUpload || uploadMutation.isPending}
                            style={{ width: "100%" }}
                        >
                            {uploadMutation.isPending ? "Uploading..." : "Upload File"}
                        </Button>
                    </Space>
                </Col>
            </Row>

            {/* File List */}
            <Table
                dataSource={files}
                columns={columns}
                rowKey="name"
                loading={isLoading}
                pagination={{ pageSize: 5 }}
                scroll={{ x: true }} // Enables horizontal scrolling on smaller screens
            />

            {/* Image Preview Modal */}
            <Modal
                visible={!!previewUrl}
                footer={null}
                onCancel={() => setPreviewUrl(null)}
                title="Image Preview"
            >
                {previewUrl && (
                    <img
                        src={previewUrl}
                        alt="Preview"
                        style={{ width: "100%", height: "auto" }}
                    />
                )}
            </Modal>

            {/* URL Copy Modal */}
            <Modal
                visible={!!urlToCopy}
                footer={null}
                onCancel={() => setUrlToCopy(null)}
                title="File URL"
            >
                <div>
                    <p>{urlToCopy}</p>
                    <Button
                        type="primary"
                        icon={<CopyOutlined />}
                        onClick={() => urlToCopy && copyToClipboard(urlToCopy)}
                    >
                        Copy to Clipboard
                    </Button>
                </div>
            </Modal>
        </Content>
    );
};
