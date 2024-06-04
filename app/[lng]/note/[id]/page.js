import Note from "@/components/Note";
import { getNote } from "@/lib/prisma";

export default async function Page({ params }) {
  // 动态路由 获取笔记 id
  const noteId = params.id;
  const note = await getNote(noteId);

  // 为了让 Suspense 的效果更明显
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  await sleep(1000);

  if (note === null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Write down some wonderful ideas 🌞
        </span>
      </div>
    );
  }

  return <Note noteId={noteId} note={note} />;
}
