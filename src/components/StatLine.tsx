const StatLine = ({ stats }: { stats: Record<string, number>[] }) => {
  const maxStat = Math.max(...stats.map((stat) => Object.values(stat)[0]));

  const colors = [
    "bg-purple-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
  ];

  return (
    <div className="flex w-full h-8 rounded-md overflow-hidden border border-gray-700">
      {stats.map((stat, index) => {
        const key = Object.keys(stat)[0]; // Название параметра
        const value = stat[key]; // Значение
        const percentage = (value / maxStat) * 100;

        return (
          <div
            key={key}
            className={`flex hover:outline-1 hover:outline-amber-50  transition-all duration-30 items-center justify-center text-white font-bold ${colors[index]}`}
            style={{ width: `${percentage}%`, minWidth: "40px" }}
          >
            {value}
          </div>
        );
      })}
    </div>
  );
};

export default StatLine;
