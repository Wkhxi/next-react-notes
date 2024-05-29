import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import SidebarNoteList from "@/components/SidebarNoteList";
import EditButton from "@/components/EditButton";
import NoteListSkeleton from "./NoteListSkeleton";

export default async function Sidebar() {
  return (
    <>
      <section className="col sidebar">
        <Link href={"/"} className="link--unstyled">
          <section className="sidebar-header">
            <Image
              className="logo"
              src="/logo.svg"
              width="22"
              height="20"
              alt=""
              role="presentation"
            />
            <strong>Memo Notes</strong>
          </section>
        </Link>
        <section className="sidebar-menu" role="menubar">
          <EditButton noteId={null}>New</EditButton>
        </section>
        <nav>
          {/* 使用 Suspense 后 数据不会阻塞页面 */}
          {/* 因为 HTML 是通过 stream 格式进行传输的，Transfer-Encoding 标头的值为 chunked  分块传输 */}
          {/* 如果不使用 Suspense 且服务端渲染的情况下，接口请求完毕渲染完成才会相应 客户端的http请求，返回html，这样就可能出现首屏特别慢的情况 */}
          {/* 如果使用了 Suspense 那么服务端就会先返回 骨架屏内容 进行渲染，然后等待数据请求结束渲染完毕后，再对新传输来的html进行渲染 */}
          {/* 数据要在 Suspense 包裹的组件中请求 */}
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
      </section>
    </>
  );
}
