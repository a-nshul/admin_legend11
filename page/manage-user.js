"use client";
import React, { useEffect, useState } from "react";
import { Table, Button, message, Spin, Modal } from "antd";
import { Layout } from "antd";
import axios from "axios";
import Sidebar from "@/components/Sidebar";
import AppHeader from "@/components/Header";

const { Content } = Layout;

export default function ManageUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(null);
  const [modal, contextHolder] = Modal.useModal();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://3.7.71.35:3001/api/users");
      setUsers(Array.isArray(response.data.users) ? response.data.users : []);
    } catch (error) {
      message.error("Failed to fetch users!");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (userId, actionType, isActive) => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("You need to log in again!");
      return;
    }
  
    const actionUrls = {
      block: `http://3.7.71.35:3001/api/users/block/${userId}`,
      unblock: `http://3.7.71.35:3001/api/users/unblock/${userId}`,
      suspend: `http://3.7.71.35:3001/api/users/suspend/${userId}`,
      unsuspend: `http://3.7.71.35:3001/api/users/unsuspend/${userId}`,
    };
  
    const actionKey = isActive ? `un${actionType}` : actionType;
  
    setLoadingAction(userId + actionType);
  
    try {
      const response = await axios.post(
        actionUrls[actionKey],
        {}, // Ensure the request body is not empty if required
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.status === 200) {
        message.success(`User ${actionKey}ed successfully!`);
        fetchUsers(); // Refresh user list
      } else {
        message.error(`Unexpected response: ${response.statusText}`);
      }
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      message.error(`Failed to ${actionKey} user! ${error.response?.data?.message || ""}`);
    } finally {
      setLoadingAction(null);
    }
  };

  const confirmAction = (userId, actionType, isActive) => {
    const actionText = isActive ? `Un${actionType}` : actionType.charAt(0).toUpperCase() + actionType.slice(1);
    modal.confirm({
      title: `Are you sure you want to ${actionText} this user?`,
      content: "This action can be reversed later.",
      okText: "Yes",
      cancelText: "No",
      onOk: () => handleAction(userId, actionType, isActive),
    });
  };

  const columns = [
    { title: "Mobile number", dataIndex: "mobileno", key: "mobileno" },
    {
      title: "Status",
      dataIndex: "blocked",
      key: "blocked",
      render: (blocked, record) => (
        <Button
          type="primary"
          className={`px-4 py-2 rounded-md transition-all 
            ${blocked ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
          loading={loadingAction === record.id + (blocked ? "unblock" : "block")}
          onClick={() => confirmAction(record.id, blocked ? "unblock" : "block", blocked)}
        >
          {blocked ? "Unblock" : "Block"}
        </Button>
      ),
    },
    {
      title: "Suspension",
      dataIndex: "suspended",
      key: "suspended",
      render: (suspended, record) => (
        <Button
          type="primary"
          className={`px-4 py-2 rounded-md transition-all 
            ${suspended ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"}`}
          loading={loadingAction === record.id + (suspended ? "unsuspend" : "suspend")}
          onClick={() => confirmAction(record.id, suspended ? "unsuspend" : "suspend", suspended)}
        >
          {suspended ? "Unsuspend" : "Suspend"}
        </Button>
      ),
    },
  ];

  return (
    <Layout className="h-screen">
      <Sidebar />
      <Layout>
        <AppHeader />
        <Content className="p-6">
          {contextHolder}
          {loading ? (
            <Spin size="large" className="flex justify-center mt-10" />
          ) : (
            <Table
              dataSource={users}
              columns={columns}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              className="shadow-md rounded-lg"
            />
          )}
        </Content>
      </Layout>
    </Layout>
  );
}
