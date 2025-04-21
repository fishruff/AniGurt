interface Stat {
  status: string;
  count: number;
}

const StatLine = ({ stats }: { stats: Stat[] }) => {
  const maxStat = Math.max(...stats.map((stat) => stat.count));

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
        const percentage = (stat.count / maxStat) * 100;

        return (
          <div
            key={stat.status}
            className={`flex items-center justify-center text-white font-bold hover:outline-1 hover:outline-amber-50 transition-all duration-300 ${colors[index]}`}
            style={{ width: `${percentage}%`, minWidth: "40px" }}
            title={stat.status}
          >
            {stat.count}
          </div>
        );
      })}
    </div>
  );
};

export default StatLine;
