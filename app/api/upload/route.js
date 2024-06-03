import { stat, mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import mime from "mime";
import dayjs from "dayjs";
import { addNote } from "@/lib/strapi";

export async function POST(request) {
  // 获取 formData
  const formData = await request.formData();
  const file = formData.get("file");

  console.log("POST", file);

  if (!file)
    return NextResponse.json({ error: "No file provided" }, { status: 400 });

  //  await file.arrayBuffer() 包含文件的原始二进制数据的ArrayBuffer
  const buffer = Buffer.from(await file.arrayBuffer()); // ArrayBuffer对象是一个固定长度的二进制数据缓冲区，可以用来存储和操作原始二进制数据
  const relativeUploadDir = `/uploads/${dayjs().format("YY-MM-DD")}`;
  // process.cwd() 获取当前 Node.js 进程的当前工作目录
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  // 先看有没有这个文件夹
  try {
    await stat(uploadDir); // 获取指定路径的文件或目录的状态信息
  } catch (e) {
    if (e.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
  }

  try {
    const filename = file.name.replace(/\.[^/.]+$/, "");
    const uniqueSuffix = `${Math.random().toString(36).slice(-6)}`; // 随即后缀防止重复写入
    const uniqueFilename = `${filename}-${uniqueSuffix}.${mime.getExtension(
      file.type
    )}`;

    await writeFile(`${uploadDir}/${uniqueFilename}`, buffer);

    const res = await addNote(
      JSON.stringify({
        title: filename,
        content: buffer.toString("utf-8"),
      })
    );

    revalidatePath("/", "layout"); // 清除缓存

    // 例如
    //{
    //     "fileUrl": "/uploads/24-05-31/test-upload-25gnuh.bin",
    //     "uid": "1717151032285"
    // }
    // http://localhost:3000/uploads/24-05-31/test-upload-25gnuh.bin 可以直接查看文件
    return NextResponse.json({
      fileUrl: `${relativeUploadDir}/${uniqueFilename}`,
      uid: res,
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
