"use client";
import React, { useState } from "react";
import { Layout, Spin } from "antd";
import Image from "next/image";

const { Header } = Layout;

export default function AppHeader() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <Header className="bg-gray-800 px-4 flex justify-end">
      {loading && <Spin size="large" />}
      {!error ? (
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7iyX14BpUBbn_z5cxyELX5leXkg3_ram9eQ&s"
          alt="Logo"
          width={100}
          height={50}
          className="rounded-full object-cover"
          onLoad={() => setLoading(false)}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
        />
      ) : (
        <div className="text-white">Logo Error</div>
      )}
    </Header>
  );
}
