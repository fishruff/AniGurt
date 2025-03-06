const AnimeCardSkeleton = () => {
    return (
      <div className="bg-gray-800 p-2 rounded-lg shadow-md w-full animate-pulse">
        <div className="w-full h-52 bg-gray-700 rounded-lg"></div>
        <div className="w-3/4 h-5 bg-gray-700 mt-2 rounded"></div>
        <div className="w-1/2 h-4 bg-gray-700 mt-1 rounded"></div>
      </div>
    );
  };
export default AnimeCardSkeleton;  