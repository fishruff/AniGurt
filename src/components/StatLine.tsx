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
    <div className="flex flex-col gap-2 w-full">
      {stats.map((stat, index) => {
        const key = Object.keys(stat)[0]; // Название параметра
        const value = stat[key]; // Значение
        const percentage = (value / maxStat) * 100;

        return (
          <div key={key} className="flex items-center">
            <span className="w-20 text-white">{key}</span>{" "}
            {/* Название параметра */}
            <div
              className={`relative h-8 rounded-md ${colors[index]} flex items-center justify-center text-white font-bold`}
              style={{ width: `${percentage}%`, minWidth: "40px" }}
            >
              {value}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatLine;
