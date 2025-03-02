function NotFound() {
  return (
    <div className="text-2xl text-amber-50 text-center relative z-10">
        <img src="./404.webp" alt="" className="h-screen w-full object-cover" />
        <div className="absolute top-[50%] inset-x-0 mx-auto bg-gray-900/90 w-1/5 rounded-2xl  p-5">

      <h2>404 error</h2>
      <p>разраб пидорас</p>
      <a href="/" className="text-blue-500">
        вернуться на главную
      </a>
        </div>
    </div>
  );
}

export default NotFound;
