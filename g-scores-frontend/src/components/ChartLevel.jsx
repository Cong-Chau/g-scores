import { useState, useEffect } from "react";
import scoreApi from "../api/scoresApi";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const subjects = [
  { id: "math" },
  { id: "literature" },
  { id: "foreignLanguage" },
  { id: "physics" },
  { id: "chemistry" },
  { id: "biology" },
  { id: "history" },
  { id: "geography" },
  { id: "civicEducation" },
];

const COLORS = ["#4f46e5", "#06b6d4", "#10b981", "#f59e0b"];

function ChartLevel() {
  const [subject, setSubject] = useState("math");
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await scoreApi.getReportBySubject(subject);
        setReport(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReport();
  }, [subject]);

  const chartData = report
    ? [
        { name: ">= 8 điểm", value: report.levelA },
        { name: "6-8 điểm", value: report.levelB },
        { name: "4-6 điểm", value: report.levelC },
        { name: "> 4 điểm", value: report.levelD },
      ]
    : [];

  return (
    <div
      className="
    col-span-12
    lg:col-start-2 lg:col-end-6 
    grid grid-cols-12
  "
    >
      <div className="col-start-1 col-end-13 mb-10 shadow-lg rounded-2xl bg-white">
        <div className="p-6 md:p-10 rounded-t-2xl grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <h2 className="font-bold text-xl md:text-2xl">Báo cáo theo môn</h2>
            <p className="text-gray-500 text-sm">Thống kê cho từng môn thi</p>
          </div>

          <div className="flex items-center gap-3 md:col-span-1">
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded w-full"
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.id}
                </option>
              ))}
            </select>
          </div>
        </div>

        <section className="px-6 md:px-10 pb-10 bg-white rounded-b-2xl">
          <div className="rounded-xl overflow-hidden">
            {report ? (
              <div className="w-full h-[320px] md:h-[420px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      md:outerRadius={130}
                      dataKey="value"
                      label
                    >
                      {chartData.map((_, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="py-6 text-center text-gray-500">
                Đang tải dữ liệu ...
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ChartLevel;
