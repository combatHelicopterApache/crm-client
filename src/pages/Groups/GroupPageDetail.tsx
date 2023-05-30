import React from 'react';
import MainLayout from "../../layouts/MainLayout/MainLayout";
import {GroupDetailForm} from "../../features/groups/forms/GroupDetailForm";

const GroupPageDetail = () => {
    return (
        <MainLayout>
            <GroupDetailForm />
        </MainLayout>
    );
};

export default GroupPageDetail;