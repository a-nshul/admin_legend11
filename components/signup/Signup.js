"use client";
import React, { useState } from "react";
import { Input, Button } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";

export default function Signup() {
  return (
    <div className="flex h-screen">
      {/* Left Side Image */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <Image
          src="https://lh6.googleusercontent.com/proxy/wNb43hqXxunWwZf-FeLuo7qc5diVibdrgufdsb7_pp9vCWWxyq9lKbsly6ENmBiU2KUVPqT05pd3OJSFKy_wCAsOrlNk"
          alt="Signup"
          width={500}
          height={500}
          className="rounded-lg"
        />
      </div>

      {/* Right Side Form - Dark Mode */}
      <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-gray-900 text-white">
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="flex justify-center mb-5">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7iyX14BpUBbn_z5cxyELX5leXkg3_ram9eQ&s"
              alt="Logo"
              width={100}
              height={50}
            />
          </div>
          <h2 className="text-2xl font-semibold text-center mb-6">
            Create Account
          </h2>

          {/* Name Input */}
          <div className="mb-4">
            <Input
              size="large"
              placeholder="Full Name"
              prefix={<UserOutlined className="text-gray-400" />}
              className="rounded-lg bg-gray-700  border-gray-600 placeholder-gray-400"
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <Input
              size="large"
              placeholder="Email"
              prefix={<MailOutlined className="text-gray-400" />}
              className="rounded-lg bg-gray-700  border-gray-600 placeholder-gray-400"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <Input.Password
              size="large"
              placeholder="Password"
              prefix={<LockOutlined className="text-gray-400" />}
              iconRender={(visible) =>
                visible ? (
                  <LockOutlined className="text-gray-400" />
                ) : (
                  <LockOutlined className="text-gray-400" />
                )
              }
              className="rounded-lg bg-gray-700  border-gray-600 placeholder-gray-400"
              visibilityToggle
            />
          </div>

          {/* Signup Button */}
          <Button
            type="primary"
            size="large"
            block
            className="mb-3 bg-blue-500 hover:bg-blue-600 border-none rounded-lg"
          >
            Sign Up
          </Button>

          {/* Login Link */}
          <p className="text-center text-gray-400">
            Already have an account?{" "}
            <Link href="/" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
