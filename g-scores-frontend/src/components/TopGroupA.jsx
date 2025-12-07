import { useState, useEffect } from "react";
import scoreApi from "../api/scoresApi";

function TopGroupA() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await scoreApi.getTopGroupA();
        setList(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchList();
  }, []);

  const getScoreColor = (score) => {
    if (score === null || score === undefined) return "";
    if (score >= 8) return "text-blue-600 font-semibold";
    if (score >= 6) return "text-green-600 font-semibold";
    if (score >= 4) return "text-yellow-600 font-semibold";
    return "text-red-600 font-semibold";
  };

  return (
    <div className="col-span-12 lg:col-start-6 lg:col-end-12 grid grid-cols-12 rounded-2xl">
      <div className="col-start-1 col-end-13 mb-10 shadow-lg rounded-2xl bg-white">
        <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-4">
          <div className="md:col-span-3">
            <h2 className="font-bold text-xl md:text-2xl">Bảng xếp hạng</h2>
            <p className="text-gray-500 text-sm">
              Danh sách 10 thí sinh điểm Toán - Lý - Hóa cao nhất
            </p>
          </div>
        </div>

        <section className="px-6 md:px-10 pb-10 bg-white rounded-b-2xl">
          <div className="rounded-2xl overflow-x-auto">
            <table className="min-w-max md:min-w-full text-left">
              <thead className="text-gray-400 whitespace-nowrap">
                <tr>
                  <th className="px-4 py-3 font-semibold">SBD</th>
                  <th className="px-4 py-3 font-semibold text-center">Toán</th>
                  <th className="px-4 py-3 font-semibold text-center">Lý</th>
                  <th className="px-4 py-3 font-semibold text-center">Hóa</th>
                  <th className="px-4 py-3 font-semibold text-center">
                    Điểm TB
                  </th>
                </tr>
              </thead>

              <tbody>
                {list.length > 0 ? (
                  list.map((item, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 font-medium">
                        {item.registrationNumber}
                      </td>
                      <td
                        className={`px-4 py-3 text-center ${getScoreColor(
                          item.math
                        )}`}
                      >
                        {item.math}
                      </td>
                      <td
                        className={`px-4 py-3 text-center ${getScoreColor(
                          item.physics
                        )}`}
                      >
                        {item.physics}
                      </td>
                      <td
                        className={`px-4 py-3 text-center ${getScoreColor(
                          item.chemistry
                        )}`}
                      >
                        {item.chemistry}
                      </td>
                      <td
                        className={`px-4 py-3 text-center ${getScoreColor(
                          item.totalScore / 3
                        )}`}
                      >
                        {(item.totalScore / 3).toFixed(2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="py-6 text-center text-gray-500" colSpan="5">
                      Đang tải dữ liệu ...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TopGroupA;
