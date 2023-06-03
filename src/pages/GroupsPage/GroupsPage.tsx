import React from 'react';
import MainLayout from "../../layouts/MainLayout/MainLayout";
import GroupsTable from "../../features/groups/tables/GroupsTable";
import {TopPanel} from "../../features/groups/components/TopPanel";

const HomePage = () => {
    return (
        <MainLayout>
            <TopPanel />
            <GroupsTable />
        </MainLayout>
    );
};

export default HomePage;