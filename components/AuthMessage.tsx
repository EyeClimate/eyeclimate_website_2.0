export default function AuthMessage({
  error,
  message,
}: {
  error?: string;
  message?: string;
}) {
  const text = error || message;
  if (!text) return null;
  return (
    <p
      role={error ? "alert" : "status"}
      className={`rounded-lg border p-4 text-body-sm ${error ? "border-red-500/40 bg-red-500/10 text-red-300" : "border-border-accent bg-accent-green-06 text-accent-green"}`}
    >
      {text}
    </p>
  );
}
