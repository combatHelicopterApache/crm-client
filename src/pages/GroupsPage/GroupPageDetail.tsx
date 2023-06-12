import React from 'react';
import MainLayout from "../../layouts/MainLayout/MainLayout";
import {GroupDetailForm} from "../../features/Groups/forms/GroupDetailForm";

const GroupPageDetail = () => {
    return (
        <MainLayout>
            <GroupDetailForm />
        </MainLayout>
    );
};

export default GroupPageDetail;