"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const GrowthChart = ({ chartData }) => {

  const {lesson, user} = chartData

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formattedData  = months.map((month, index) => ({
    month,
    users: user[index],
    lessons: lesson[index],
  }));
  // console.log(formattedData );

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-default-200 dark:border-zinc-800 p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          Platform Growth Analytics
        </h2>
        <p className="text-sm text-default-500">
          User registrations and lesson publications over time
        </p>
      </div>

      <div className="h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />

            <XAxis dataKey="month" tick={{ fontSize: 12 }} />

            <YAxis tick={{ fontSize: 12 }} />

            <Tooltip
              contentStyle={{
                borderRadius: "16px",
                border: "none",
                boxShadow: "0 10px 30px rgba(0,0,0,.12)",
              }}
            />

            <Legend />

            <Line
              type="monotone"
              dataKey="users"
              name="New Users"
              stroke="#4F46E5"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />

            <Line
              type="monotone"
              dataKey="lessons"
              name="New Lessons"
              stroke="#06B6D4"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GrowthChart;
