export default function Modal({ isOpen, onClose, title, children }) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-green-400 bg-opacity-40 flex justify-center items-center">

      <div className="bg-white rounded-xl p-6 w-96 shadow-lg">

        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-red-500 font-bold">
            X
          </button>
        </div>

        {children}

      </div>

    </div>
  );
}