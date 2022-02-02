import Link from "next/link";

const AppBar = () => {
  return (
    <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg rounded-lg bg-red-500">
      <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
        <div className="container-fluid">
          <Link href="/">
            <a>
              <div className="text-xl text-black font-semibold">
                <div className="flex flex-col justify-center items-center text-white">
                  <span>The</span>
                  <span>Trade Game</span>
                </div>
              </div>
            </a>
          </Link>
        </div>
        <div className="container-fluid">
          <Link href={"/high-score"}>
            <a className="text-xl text-black font-semibold text-white">
              High scores
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AppBar;
