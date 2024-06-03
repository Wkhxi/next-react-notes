"use server";

import { redirect } from "next/navigation";
import { addNote, updateNote, delNote } from "@/lib/strapi";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  title: z.string(),
  content: z.string().min(1, "请输入内容").max(100, "最大可输入100字"),
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function saveNote(prevState, formData) {
  // 获取 noteId
  const noteId = formData.get("noteId");
  const data = {
    title: formData.get("title"),
    content: formData.get("body"),
    updateTime: new Date(),
  };

  // 校验数据
  const validated = schema.safeParse(data);
  if (!validated.success) {
    return {
      errors: validated.error.issues,
    };
  }

  // 模拟接口时间
  // 模拟请求时间
  await sleep(1000);

  // 更新数据库
  if (noteId) {
    await updateNote(noteId, JSON.stringify(data));
    revalidatePath("/", "layout");
    redirect(`/note/${noteId}`);
  } else {
    const res = await addNote(JSON.stringify(data));
    revalidatePath("/", "layout");
    redirect(`/note/${res}`);
  }

  // return { message: `Add Success!` };
}

export async function deleteNote(prevState, formData) {
  const noteId = formData.get("noteId");
  delNote(noteId);
  revalidatePath("/", "layout");
  redirect("/");
}
