import { useEffect, useState } from "react";
import scoreApi from "../api/scoresApi";

function ListScrore() {
  const [scores, setScores] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  useEffect(() => {
    fetchScores(1);
  }, []);

  const getScoreColor = (score) => {
    if (score === null || score === undefined) return "";
    if (score >= 8) return "text-blue-600 font-semibold";
    if (score >= 6) return "text-green-600 font-semibold";
    if (score >= 4) return "text-yellow-600 font-semibold";
    return "text-red-600 font-semibold";
  };

  const fetchScores = async (page = 1) => {
    try {
      const res = await scoreApi.getAllScores(page, 10);

      setScores(res.data.items);

      setPagination({
        currentPage: res.data.currentPage,
        totalPages: res.data.totalPages,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    if (!searchText.trim()) {
      fetchScores(1);
      return;
    }

    try {
      const res = await scoreApi.getScoresByRegistrationNumber(
        searchText.trim()
      );
      setScores(res.data);
      setPagination({ currentPage: 1, totalPages: 1 });
    } catch (error) {
      console.error(error);
      setScores([]);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchScores(newPage);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6 md:gap-10  px-6 md:px-10">
      <div className=" col-start-1 col-end-13 lg:col-start-2 lg:col-end-12 my-8 shadow-lg rounded-b-2xl">
        <div className="bg-white p-6 md:p-10 rounded-t-2xl grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <h2 className="font-bold text-xl md:text-2xl">
              Danh sách thí sinh
            </h2>
            <p className="text-gray-500 text-sm">
              Số báo danh và điểm thi của tất cả thí sinh
            </p>
          </div>

          <div className="md:col-start-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <input
              type="text"
              placeholder="Nhập SBD..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="px-4 py-2 border border-gray-400 rounded w-full"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-600 text-white rounded w-full sm:w-fit cursor-pointer"
            >
              Tìm
            </button>
          </div>
        </div>

        <section className="px-4 md:px-10 pb-10 bg-white rounded-b-2xl">
          {/* scroll ngang ở mobile */}
          <div className="rounded-2xl overflow-x-auto">
            <table className="min-w-max md:min-w-full text-left">
              <thead className="text-gray-400 whitespace-nowrap">
                <tr>
                  <th className="px-4 py-3 font-semibold">SBD</th>
                  <th className="px-4 py-3 font-semibold">Toán</th>
                  <th className="px-4 py-3 font-semibold">Văn</th>
                  <th className="px-4 py-3 font-semibold">Anh</th>
                  <th className="px-4 py-3 font-semibold">Vật lý</th>
                  <th className="px-4 py-3 font-semibold">Hóa</th>
                  <th className="px-4 py-3 font-semibold">Sinh</th>
                  <th className="px-4 py-3 font-semibold">Lịch sử</th>
                  <th className="px-4 py-3 font-semibold">Địa lý</th>
                  <th className="px-4 py-3 font-semibold">GDCD</th>
                  <th className="px-4 py-3 font-semibold">Mã NN</th>
                </tr>
              </thead>

              <tbody>
                {scores?.length > 0 ? (
                  scores.map((item, index) => (
                    <tr
                      key={`${item.registrationNumber}-${index}`}
                      className="border-t border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 font-medium">
                        {item.registrationNumber}
                      </td>

                      <td className={`px-4 py-3 ${getScoreColor(item.math)}`}>
                        {item.math}
                      </td>
                      <td
                        className={`px-4 py-3 ${getScoreColor(
                          item.literature
                        )}`}
                      >
                        {item.literature}
                      </td>
                      <td
                        className={`px-4 py-3 ${getScoreColor(
                          item.foreignLanguage
                        )}`}
                      >
                        {item.foreignLanguage}
                      </td>
                      <td
                        className={`px-4 py-3 ${getScoreColor(item.physics)}`}
                      >
                        {item.physics}
                      </td>
                      <td
                        className={`px-4 py-3 ${getScoreColor(item.chemistry)}`}
                      >
                        {item.chemistry}
                      </td>
                      <td
                        className={`px-4 py-3 ${getScoreColor(item.biology)}`}
                      >
                        {item.biology}
                      </td>
                      <td
                        className={`px-4 py-3 ${getScoreColor(item.history)}`}
                      >
                        {item.history}
                      </td>
                      <td
                        className={`px-4 py-3 ${getScoreColor(item.geography)}`}
                      >
                        {item.geography}
                      </td>
                      <td
                        className={`px-4 py-3 ${getScoreColor(
                          item.civicEducation
                        )}`}
                      >
                        {item.civicEducation}
                      </td>

                      <td className="px-4 py-3">{item.foreignLanguageCode}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="py-6 text-center text-gray-500">
                      Đang tải dữ liệu ...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* --- PAGINATION --- */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              >
                ←
              </button>

              <span className="px-4 py-2 bg-white border border-gray-200 rounded shadow">
                Trang {pagination.currentPage} / {pagination.totalPages}
              </span>

              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              >
                →
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default ListScrore;
