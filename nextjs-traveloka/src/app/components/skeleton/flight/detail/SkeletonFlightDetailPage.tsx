export default function SkeletonFlightDetailPage() {
  return (
    <div className="bg-blue-950 w-full min-h-screen flex flex-col gap-4 justify-between items-start pt-36 px-20 pb-5">
      <div className="bg-gray-400 w-20 h-8 rounded-2xl animate-pulse"></div>
      {/* Awal Flight */}
      <div className="w-full h-full flex justify-center ">
        <div className="bg-gray-400 w-96 h-8 rounded-2xl animate-pulse "></div>
      </div>
      {/* Akhir FLight */}
      {/* Awal Card */}
      <div className="w-full h-full flex justify-between items-start gap-4">
        <div className="w-2/3 flex flex-col gap-2 justify-between items-start h-full">
          <div className="bg-gray-400 w-full h-32 rounded-2xl animate-pulse"></div>
          <div className="bg-gray-400 w-full h-48 rounded-2xl animate-pulse"></div>
        </div>
        <div className="bg-gray-400 w-1/3 h-32 rounded-2xl animate-pulse"></div>
      </div>
      {/* Akhir Card */}
    </div>
  );
}
