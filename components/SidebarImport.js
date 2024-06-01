"use client";

import React, { Suspense, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function SidebarImport() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // 直接监听了 <input type="file"> 的 onChange 事件
  const onChange = async (e) => {
    const fileInput = e.target;

    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn("files list is empty");
      return;
    }

    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("something went wrong");
        return;
      }

      const data = await response.json();

      startTransition(() => router.push(`/note/${data.uid}`));
      startTransition(() => router.refresh()); // 清理路由缓存
    } catch (error) {
      console.error("something went wrong");
    }

    // 重置 file input
    e.target.type = "text";
    e.target.type = "file";
  };

  return (
    <div style={{ textAlign: "center" }}>
      {/* 使用 label 标签关联，隐藏 input 标签 */}
      <label htmlFor="file" style={{ cursor: "pointer" }}>
        Import .md File
      </label>
      <input
        type="file"
        id="file"
        name="file"
        style={{ position: "absolute", clip: "rect(0 0 0 0)" }}
        onChange={onChange}
        accept=".md"
      />
    </div>
  );
}

/**
 * application/x-www-form-urlencoded：所有字符在发送前都会被编码。空格会转换为“+”符号，特殊字符会转换为 ASCII 十六进制值，适用于普通的表单数据
    multipart/form-data：不对字符编码。如果表单中有上传文件时使用
 */
