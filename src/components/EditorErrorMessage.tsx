export function EditorErrorMessage({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <>
      <h2>{title}</h2>
      <p className="text-red-500">{message}</p>
    </>
  );
}
