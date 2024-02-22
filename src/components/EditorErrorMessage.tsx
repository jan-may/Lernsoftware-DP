export function EditorErrorMessage({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="py-2">
      <h2 className="text-lg">{title}</h2>
      <p className={title == "Message" ? "" : "text-red-500"}>{message}</p>
    </div>
  );
}
