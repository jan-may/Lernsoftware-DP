export function EditorErrorMessage({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="p-4">
      <h2 className="text-lg">{title}</h2>
      <p className="text-red-500">{message}</p>
    </div>
  );
}
