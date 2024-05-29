import dayjs from "dayjs"; // 引入 day.js 的 SidebarNoteList 组件使用的是服务端渲染，这意味着 day.js 的代码并不会被打包到客户端的 bundle 中。
import SidebarNoteItem from "@/components/SidebarNoteItem";

export default async function NoteList({ notes }) {
  const arr = Object.entries(notes);

  if (arr.length === 0) {
    return <div className="notes-empty">{"No notes created yet!"}</div>;
  }

  return (
    <ul className="notes-list">
      {arr.map(([noteId, note]) => {
        const { title, updateTime } = JSON.parse(note);
        return (
          <li key={noteId}>
            <SidebarNoteItem noteId={noteId} note={JSON.parse(note)} />
          </li>
        );
      })}
    </ul>
  );
}
