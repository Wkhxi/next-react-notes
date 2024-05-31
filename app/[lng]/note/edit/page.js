import NoteEditor from "@/components/NoteEditor";

/**
 * 新增页
 */
export default async function EditPage() {
  return <NoteEditor note={null} initialTitle="Untitled" initialBody="" />;
}
