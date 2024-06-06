import Redis from "ioredis";

// const redis = new Redis();
const redis = new Redis({
  host: "172.18.0.2",
});

const initialData = {
  1702459181837:
    '{"title":"aaa","content":"aaa content","updateTime":"2023-12-13T09:19:48.837Z"}',
  1702459182837:
    '{"title":"bbb","content":"aaa content","updateTime":"2023-12-13T09:19:48.837Z"}',
  1702459188837:
    '{"title":"ccc","content":"ccc content","updateTime":"2023-12-13T09:19:48.837Z"}',
};

// 获取所有笔记
export async function getAllNotes() {
  const data = await redis.hgetall("notes"); // 获取整个哈希对象
  if (Object.keys(data).length === 0) {
    await redis.hset("notes", initialData); // 设置哈希值
  }
  return await redis.hgetall("notes");
}

// 新增笔记
export async function addNote(data) {
  const uuid = Date.now().toString();
  await redis.hset("notes", [uuid], data); // field - uuid   value - data
  return uuid;
}

// 更新笔记
export async function updateNote(uuid, data) {
  await redis.hset("notes", [uuid], data);
}

// 获取笔记详情
export async function getNote(uuid) {
  return JSON.parse(await redis.hget("notes", uuid));
}

// 删除笔记
export async function delNote(uuid) {
  return redis.hdel("notes", uuid); // 删除哈希字段
}

export default redis;
