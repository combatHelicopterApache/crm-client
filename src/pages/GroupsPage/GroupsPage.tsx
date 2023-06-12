import React from 'react';
import MainLayout from "../../layouts/MainLayout/MainLayout";
import GroupsTable from "../../features/Groups/tables/GroupsTable";
import {TopPanel} from "../../features/Groups/components/TopPanel";

const HomePage = () => {
    return (
        <MainLayout>
            <TopPanel />
            <GroupsTable />
        </MainLayout>
    );
};

export default HomePage;