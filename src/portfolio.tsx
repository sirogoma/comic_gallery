import { ComicsGallery } from "./components/ComicCard";
import ReactGA from "react-ga4";
import { useEffect } from "react";

export default function Portfolio() {
  useEffect(() => {
    // Google Analytics 測定 ID を入力して設定
    ReactGA.initialize("G-DUMMY");
    // ページビューイベントを処理
    ReactGA.send("pageview");
  }, []);

  return (
    <div
      className="min-h-screen antialiased text-gray-800 font-zen-maru"
      style={{ backgroundColor: "#f3f4f6" }}
    >
      <header className="relative flex flex-col items-center bg-white/30">
        <div
          className="h-screen md:h-[70vh] w-full flex flex-col justify-center items-center px-4"
          style={{
            backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(243, 244, 246, 1) 100%), url("/hero.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="bg-white p-8 md:p-12 border-4 border-black shadow-[8px_8px_0_#000] text-center max-w-[90%] md:max-w-2xl">
            <h1
              className="font-extrabold text-gray-900 flex flex-col items-center mb-6"
            >
              <span className="text-4xl md:text-6xl mb-3 tracking-tight">Web Comic Viewer</span>
              <span className="text-xl md:text-2xl font-bold tracking-widest text-gray-700 mt-2 border-t-2 border-black pt-2">PORTFOLIO SYSTEM</span>
            </h1>
            <p
              className="text-sm md:text-base leading-relaxed text-gray-800 font-bold"
            >
              漫画ビューワーのデモサイト
            </p>
          </div>

          {/* スマホ用 スクロール喚起アイコン */}
          <div className="absolute bottom-10 flex flex-col items-center md:hidden animate-bounce text-gray-800">
            <span className="text-xs font-bold mb-2 tracking-widest text-shadow-sm">SCROLL</span>
            <svg
              className="w-6 h-6 drop-shadow-sm"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </header>

      <section className="booth text-center pt-14 pb-10 px-5 flex items-center flex-col">
        <a
          href="https://github.com/sirogoma"
          target="_blank"
          className="inline-block px-8 py-3 mb-10 bg-blue-600 text-white font-extrabold border-4 border-black shadow-[6px_6px_0_#000] hover:cursor-pointer hover:shadow-[0px_0px_0_#000] hover:translate-x-[6px] hover:translate-y-[6px] active:translate-x-[6px] active:translate-y-[6px] transition-all"
        >
          View Source on GitHub
        </a>
      </section>

      {/* 漫画カードセクション */}
      <section className="pt-10 pb-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2
            className="text-4xl md:text-4xl font-extrabold text-center text-gray-900 mb-6"
            style={{ textShadow: "2px 2px #fff" }}
          >
            SYSTEM DEMO
          </h2>
          <p
            className="mb-6 text-sm font-bold"
            style={{ textShadow: "1px 1px #fff" }}
          >
            ダミーデータを使用したビューワーの動作デモです
          </p>
          <ComicsGallery />
        </div>
      </section>

      <section className="booth text-center pt-1 pb-20 px-5 flex items-center flex-col">
        <a
          href="https://github.com/sirogoma"
          target="_blank"
          className="inline-block px-8 py-3 mb-10 bg-blue-600 text-white font-extrabold border-4 border-black shadow-[6px_6px_0_#000] hover:cursor-pointer hover:shadow-[0px_0px_0_#000] hover:translate-x-[6px] hover:translate-y-[6px] active:translate-x-[6px] active:translate-y-[6px] transition-all"
        >
          View Source on GitHub
        </a>
      </section>

      {/* フッター */}
      <footer className="relative text-center pt-10 pb-20 px-5 bg-white/70">
        <div className="mx-auto text-center px-6">
          <p className="mb-4">
            Author / GitHub：
            <a
              href="https://github.com/sirogoma"
              target="_blank"
              className="underline text-blue-700 hover:text-blue-500"
            >
              @sirogoma
            </a>
          </p>
          <p className="flex justify-center items-center mb-10">
            <a
              href="#top"
              className="underline text-blue-700 hover:text-blue-500"
            >
              <span className="w-48 h-48 bg-white rounded-full flex items-center justify-center overflow-hidden border-4 border-gray-200">
                <img src="https://placehold.co/200x200/EEE/31343C?text=Profile" alt="Profile Icon" className="w-full h-full object-cover" />
              </span>
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
