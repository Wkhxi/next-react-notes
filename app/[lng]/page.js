export default async function Page({ params: { lng } }) {
  return (
    <div className="note--empty-state">
      <span className="note-text--empty-state">
        Write down some wonderful ideas 🌞
      </span>
    </div>
  );
}
