export default function SkeletonHomePage() {
  return (
    <div className="bg-blue-950 w-full min-h-screen flex flex-col  justify-between items-center pt-36 px-20 pb-5">
      <div className="bg-gray-400 w-[800px] h-12 rounded-2xl animate-pulse"></div>
      <div className="bg-gray-400 w-96 h-8 rounded-2xl animate-pulse"></div>
      <div className="bg-gray-400 w-[1000px] h-1 rounded-2xl animate-pulse"></div>
      <div className="bg-gray-400 w-[1000px] h-44 rounded-2xl animate-pulse"></div>
      <div className="bg-gray-400 w-60 h-12 rounded-2xl animate-pulse"></div>
    </div>
  );
}
