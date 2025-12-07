import ListScrore from "../components/ListScores";
import ChartLevel from "../components/ChartLevel";
import TopGroupA from "../components/TopGroupA";
function HomePage() {
  return (
    <main className="bg-gray-100 w-full min-h-screen">
      <header className="grid grid-cols-12 gap-10 min-h-24 bg-white border-b border-gray-300 py-6 px-4">
        <div className="col-span-12 flex flex-col items-center text-center md:col-start-2 md:col-span-6 md:items-start md:text-left lg:col-start-2 lg:col-span-4">
          <h1 className="font-bold text-2xl md:text-3xl text-blue-600">
            Điểm thi THPT 2024
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            Tổng quan về kết quả thi THPT 2024
          </p>
        </div>
      </header>

      <div>
        <ListScrore />
        <div className="grid grid-cols-12 gap-6 md:gap-10 px-6 md:px-10">
          <ChartLevel />
          <TopGroupA />
        </div>
      </div>
    </main>
  );
}

export default HomePage;
