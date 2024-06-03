const baseUrl = `http://127.0.0.1:1337/api`;
const authorization = `bearer eacd478e60944ec246fcdf1716214d2c6d3b013ef5508bd0cb98635fcf5c5d9f9f8da38b86b6116773f3aece5e9102ad747164643eec9eb9279d04d47dc4ea46ad1e1091d0ca9f0286a56c6fb5896c145da2c3f83ae20cac34546f1972ffc62745ac41d3e26939230681e116dc9e83b459e5702389c4ca0ae345570f1f8b6a65`;

const baseHeaderConfig = {
  Authorization: authorization,
  "Content-Type": "application/json",
};

export async function getAllNotes() {
  const response = await fetch(`${baseUrl}/notes`, {
    method: "GET",
    headers: {
      Authorization: authorization,
    },
  });
  const data = await response.json();

  console.log("data ================> ", data);

  if (!data?.data) return;

  const res = {};

  data.data.forEach(({ attributes: { title, content, slug, updatedAt } }) => {
    res[slug] = JSON.stringify({
      title,
      content,
      updateTime: updatedAt,
    });
  });

  return res;
}

export async function addNote(data) {
  const response = await fetch(`${baseUrl}/notes`, {
    method: "POST",
    headers: baseHeaderConfig,
    body: JSON.stringify({
      data: JSON.parse(data),
    }),
  });
  const res = await response.json();
  return res.data.attributes.slug;
}

export async function updateNote(uuid, data) {
  const { id } = await getNote(uuid);
  const response = await fetch(`${baseUrl}/notes/${id}`, {
    method: "PUT",
    headers: baseHeaderConfig,
    body: JSON.stringify({
      data: JSON.parse(data),
    }),
  });
  const res = await response.json();
}

export async function getNote(uuid) {
  const response = await fetch(`${baseUrl}/notes?filters[slug][$eq]=${uuid}`, {
    method: "GET",
    headers: {
      Authorization: authorization,
    },
  });
  const data = await response.json();

  const {
    attributes: { title, content, updatedAt },
    id,
  } = data.data[0];
  return {
    title,
    content: content,
    updateTime: updatedAt,
    id,
  };
}

export async function delNote(uuid) {
  const { id } = await getNote(uuid);
  const response = await fetch(`${baseUrl}/notes/${id}`, {
    method: "DELETE",
    headers: baseHeaderConfig,
  });
  const res = await response.json();
}
