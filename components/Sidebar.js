"use client";
import React from "react";
import { Layout, Menu, Button, Modal, message } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Image from "next/image";

const { Sider } = Layout;

export default function Sidebar() {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const showLogoutModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    message.success("Logged out successfully!");
    router.push("/");
  };

  return (
    <Sider width={250} className="h-screen bg-gray-900 text-white">
      {/* Logo at the top */}
      <div className="p-4 flex justify-center">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7iyX14BpUBbn_z5cxyELX5leXkg3_ram9eQ&s"
          alt="Logo"
          width={100}
          height={50}
        />
      </div>

      {/* Menu Items */}
      <Menu theme="dark" mode="vertical" className="bg-gray-900">
        <Menu.Item
          key="userManagement"
          icon={<UserOutlined />}
          onClick={() => router.push("/manage-user")}
        >
          User Management
        </Menu.Item>
      </Menu>

      {/* Logout Button at Bottom */}
      <div className="absolute bottom-5 left-0 w-full flex justify-center">
        <Button
          type="primary"
          danger
          icon={<LogoutOutlined />}
          className="w-4/5"
          onClick={showLogoutModal}
        >
          Logout
        </Button>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        title="Confirm Logout"
        open={isModalVisible}
        onOk={handleLogout}
        onCancel={handleCancel}
        okText="Yes, Logout"
        cancelText="Cancel"
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </Sider>
  );
}
