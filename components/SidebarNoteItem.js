import dayjs from "dayjs"; // 引入 day.js 的  组件使用的是服务端渲染，这意味着 day.js 的代码并不会被打包到客户端的 bundle 中。
import SidebarNoteItemContent from "@/components/SidebarNoteItemContent"; // 服务端组件可以导入客户端组件

/**
 *
 * 尽可能将客户端组件在组件树中下移， 应该尽可能缩减客户端组件的范围。
 *
 * 本来可以将 SidebarNoteItem 这个组件直接声明为 客户端组件一把梭就完事了
 * 现在将 SidebarNoteItemContent 为客户端组件，实现了客户端组件的下移，也减少了 bundle 的体积
 */
export default function SidebarNoteItem({ noteId, note }) {
  const { title, content = "", updateTime } = note;
  return (
    // SidebarNoteItemContent 为 客户端组件
    <SidebarNoteItemContent
      id={noteId}
      title={note.title}
      expandedChildren={
        //1. props传递，从服务端组件到客户端组件传递的数据需要可序列化
        <p className="sidebar-note-excerpt">
          {content.substring(0, 20) || <i>(No content)</i>}
        </p>
      }
    >
      {/* jsx会先在 服务端组件中 渲染好后 再传递给客户端组件 SidebarNoteItemContent */}
      {/* 所以说发送给 SidebarNoteItemContent 并不是 以下内容，而是以下内容编译后的内容 */}
      {/* 其实以下内容也可以 再 单独抽离为 一个服务端组件 */}
      {/*  2. children传递 */}
      <header className="sidebar-note-header">
        <strong>{title}</strong>
        <small>{dayjs(updateTime).format("YYYY-MM-DD hh:mm:ss")}</small>
      </header>
    </SidebarNoteItemContent>
  );
}
