export default function SkeletonPayment() {
  return (
    <div className="bg-blue-950 w-full min-h-screen flex flex-col  gap-6 justify-start items-center pt-36 px-20 pb-5  ">
      {/* Awal Judul, Gambar dll */}
      <div className=" w-full h-fit flex flex-col justify-start items-center gap-2">
        <div className="bg-gray-400 w-28 h-28 rounded-full animate-pulse"></div>
        <div className="bg-gray-400 w-56 h-9 rounded-full animate-pulse"></div>
        <div className="bg-gray-400 w-80 h-5 rounded-full animate-pulse"></div>
      </div>
      {/* Akhir Judul, Gambar dll */}

      {/* Awal Card Kanan dan Kiri */}
      <div className=" w-3/4 h-fit flex justify-between items-start gap-6">
        {/* Awal Card Kanan */}
        <div className=" w-2/3 h-fit flex flex-col justify-start items-center gap-4">
          <div className="bg-gray-400 w-full h-60 rounded-2xl animate-pulse"></div>
          <div className="bg-gray-400 w-full h-32 rounded-2xl animate-pulse"></div>
        </div>
        {/* Akhir Card Kanan */}

        {/* Awal Card Kiri */}
        <div className=" w-1/3 h-fit flex flex-col justify-start items-center gap-4">
          <div className="bg-gray-400 w-full h-64 rounded-2xl animate-pulse"></div>
          <div className="bg-gray-400 w-full h-32 rounded-2xl animate-pulse"></div>
        </div>
        {/* Akhir Card Kiri */}
      </div>
      {/* Akhir Card Kanan dan Kiri */}
    </div>
  );
}
