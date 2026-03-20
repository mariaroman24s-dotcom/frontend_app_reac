export default function Alert({ message, type }) {

  if (!message) return null;

  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500"
  };

  return (
    <div className={`${colors[type]} text-white p-3 rounded mb-4`}>
      {message}
    </div>
  );
}