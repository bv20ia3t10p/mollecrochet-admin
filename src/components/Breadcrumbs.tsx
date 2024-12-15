import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router';

const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/'); // Split path and remove empty segments

    // Create paths for each breadcrumb
    const breadcrumbPaths = pathSegments.map((_, index) => 
        `${pathSegments.slice(0, index + 1).join('/')}`
    );

    return (
        <Breadcrumb>
            {pathSegments.map((segment, index) => (
                <Breadcrumb.Item key={index}>
                    <Link to={breadcrumbPaths[index]}>
                        {segment.charAt(0).toUpperCase() + segment.slice(1)}
                    </Link>
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
};

export default Breadcrumbs;
