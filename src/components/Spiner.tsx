type SpinerProps = {
  fullscreen?: boolean;
};

function Spiner({ fullscreen = true }: SpinerProps) {
  const wrapperClass = fullscreen ? "fixed inset-0" : "relative w-full h-full";

  return (
    <div
      className={`${wrapperClass} flex flex-col justify-center items-center`}
    >
      <div className="w-12 h-12 border-4 border-amber-50 border-solid rounded-full animate-spin border-t-transparent" />
      <p className="text-amber-50 mt-2 animate-pulse">Загрузка...</p>
    </div>
  );
}

export default Spiner;
