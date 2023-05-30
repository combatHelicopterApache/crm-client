import React from 'react';
import MainLayout from "../../layouts/MainLayout/MainLayout";
import {LeadsTable} from "../../features/leads/tables/LeadsTable";
import ControlPanel from "../../components/ControlPanel/ControlPanel";
import {Button} from "antd";
import control from "../../components/ControlPanel/ControlPanel.module.css";
import {FilterOutlined, UploadOutlined, SaveOutlined} from "@ant-design/icons";


const LeadsPage = () => {
    return (
        <MainLayout>
            <ControlPanel>
                <Button className={control.filter}  ><FilterOutlined />  Filter</Button>

                <Button className={control.upload}  ><UploadOutlined />  Upload</Button>

                <Button className={control.filters}  ><SaveOutlined />  Templates</Button>
            </ControlPanel>
            <LeadsTable />
        </MainLayout>
    );
};

export default LeadsPage;