import { albert } from "@/styles/fonts";

export default function Box() {
  return (
    <>
      <div
        className={`${albert.className} min-h-screen flex justify-center bg-gradient-to-b from-blue-900 to-black text-white`}
      >
        <div className="mt-32 w-full p-12">
          <div className="flex flex-col gap-12">
            <div className="font-semibold text-4xl text-left ">My Projects</div>
            <div className="flex flex-row">
              <div className="w-[400px] h-[300px] mx-auto p-5 bg-white rounded-xl shadow-lg shadow-gray-600">
                <div className="flex flex-col lg:flex-row items-center gap-10"></div>
              </div>
              <div className="w-[400px] h-[300px] mx-auto p-5 bg-red-600 rounded-xl shadow-lg shadow-gray-600">
                <div className="flex flex-col lg:flex-row items-center gap-10"></div>
              </div>
              <div className="w-[400px] h-[300px] mx-auto p-5 bg-red-800 rounded-xl shadow-lg shadow-gray-600">
                <div className="flex flex-col lg:flex-row items-center gap-10"></div>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="w-[400px] h-[300px] mx-auto p-5 bg-blue-200 rounded-xl shadow-lg shadow-gray-600">
                <div className="flex flex-col lg:flex-row items-center gap-10"></div>
              </div>
              <div className="w-[400px] h-[300px] mx-auto p-5 bg-blue-500 rounded-xl shadow-lg shadow-gray-600">
                <div className="flex flex-col lg:flex-row items-center gap-10"></div>
              </div>
              <div className="w-[400px] h-[300px] mx-auto p-5 bg-blue-800 rounded-xl shadow-lg shadow-gray-600">
                <div className="flex flex-col lg:flex-row items-center gap-10"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
