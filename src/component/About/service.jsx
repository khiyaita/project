function Service({ i, p, n }) {
  return (
    <div className="mx-4 border rounded-sm border-gray-50 w-1/5 h-48 shadow hover:bg-red-500 flex flex-col items-center justify-center">
      <i
        className={`mb-4 text-white bg-black border-8 rounded-full border-gray-300 px-2 py-1 hover:bg-white hover:border-red-300 hover:text-black bi bi-${i}`}
      ></i>
      <h2 className="font-bold text-xl">{n}k</h2>
      <p className="text-xs">{p}</p>
    </div>
  );
}
export default Service;