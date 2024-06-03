import SidebarNoteListFilter from "@/components/SidebarNoteListFilter";
import SidebarNoteItem from "@/components/SidebarNoteItem";
import { getAllNotes } from "@/lib/strapi";
import { sleep } from "@/lib/utils";
import SidebarNoteItemHeader from "@/components/SidebarNoteItemHeader";

export default async function NoteList() {
  await sleep(2000);
  const notes = await getAllNotes();

  if (Object.entries(notes).length == 0) {
    return <div className="notes-empty">{"No notes created yet!"}</div>;
  }

  // return (
  //   // SidebarNoteListFilter 包了一层 这么写是为了 让 SidebarNoteItem 还是服务端组件
  //   // SidebarNoteItem以props的形式 传递进 SidebarNoteListFilter
  //   // 服务端组件可以引入客户端组件，客户端组件不能引入服务端组件（因为一引入这个服务端组件就变为客户端组件了）
  //   // 所以将 服务端组件以props形式传入客户端组件，来达到 客户端组件引入服务端组件 的目的
  //   <SidebarNoteListFilter>
  //     {Object.entries(notes).map(([noteId, note]) => {
  //       return (
  //         <SidebarNoteItem
  //           key={noteId}
  //           noteId={noteId}
  //           note={JSON.parse(note)}
  //         />
  //       );
  //     })}
  //   </SidebarNoteListFilter>
  // );

  return (
    // notes 数组 代替 children
    <SidebarNoteListFilter
      notes={Object.entries(notes).map(([noteId, note]) => {
        const noteData = JSON.parse(note);
        return {
          noteId,
          note: noteData,
          header: (
            <SidebarNoteItemHeader
              title={noteData.title}
              updateTime={noteData.updateTime}
            />
          ),
        };
      })}
    />
  );
}
