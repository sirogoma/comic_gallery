/* eslint-disable react-refresh/only-export-components */
import toraViewer from "@toralab/tora-viewer";
import ReactGA from "react-ga4";
import React, { useMemo, useState } from "react";
import { comicData } from "./ComicCardData"; // 既存データ

interface ComicCardProps {
  comic: Comic;
  onClick: () => void;
}

export type BadgeType = "sample" | "full" | "zatta" | null;
export type Comic = {
  id: string;
  cover: string;
  cardCoverPosition?: string;
  title: string;
  pageSize?: {
    width: number;
    height: number;
  };
  badge: BadgeType;
  description: string;
  pages: string[];
  lastPageElement?: HTMLElement | null; // 最終ページエレメント
  publicationOrder: number; // 発行順 -> publicationOrder
  chronologicalOrder: number; // 時系列 -> chronologicalOrder
  recommendedOrder: number; // おすすめ順 -> recommendedOrder
  spikeText?: string; // チクチク表示テキスト
};

const openToraViewer = (comic: Comic) => {
  ReactGA.send({ hitType: "pageview", page: "/" + comic.id });

  // 履歴を追加して、ブラウザバックで閉じられるようにする
  window.history.pushState({ viewerOpen: true }, "", "");

  // とらビューワ
  toraViewer(comic.pages, {
    title: comic.title,
    pageSize: {
      width: 840, // デフォルト値: 840
      height: 1188, // デフォルト値: 1188
    },
    pageStyle: "auto",
    direction: "horizontal-rtl",
    controlShowTime: 3000,
    useRawImage: true,
  });
};

const Badge: React.FC<{ type: BadgeType }> = ({ type }) => {
  if (!type) return null;
  let label = "";
  let bg = "";

  switch (type) {
    case "sample":
      label = "サンプル";
      bg = "bg-cyan-300";
      break;

    case "full":
      label = "漫画本文";
      bg = "bg-yellow-300";
      break;

    case "zatta":
      label = "雑多";
      bg = "bg-green-300";
      break;

    default:
      return null;
  }

  return (
    <div
      className={`badge absolute top-2 right-2 font-extrabold [border-width:3px] border-black px-2 py-1 shadow-[2px_2px_0_#000] ${bg} text-black`}
    >
      {label}
    </div>
  );
};

function generateStarPoints(
  numPoints = 32,
  outerR = 50,
  innerR = 35,
  cx = 50,
  cy = 50
) {
  const step = (2 * Math.PI) / numPoints;
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const x = cx + r * Math.cos(i * step - Math.PI / 2);
    const y = cy + r * Math.sin(i * step - Math.PI / 2);
    points.push(`${x},${y}`);
  }
  return points.join(" ");
}


function SpikyBadge({ text = "Web初" }) {
  const points = generateStarPoints(32, 50, 35, 50, 50); // 32チクチク
  const lines = text.split("\n");

  return (
    <div className="absolute top-[-16px] left-[-16px] w-16 h-16 md:w-22 md:h-22 md:top-[-10px] md:left-[-10px] block">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon
          points={points}
          className="fill-orange-600 stroke-black stroke-[3]"
        />
        <text
          x="50"
          y={lines.length > 1 ? "42" : "55"}
          textAnchor="middle"
          fontSize="20"
          className="fill-white font-bold"
        >
          {lines.map((line, i) => (
            <tspan x="50" dy={i === 0 ? 0 : "1.2em"} key={i}>
              {line}
            </tspan>
          ))}
        </text>
      </svg>
    </div>
  );
}


export default function ComicCard({ comic, onClick }: ComicCardProps) {
  return (
    <article
      onClick={onClick}
      className="comic-card relative bg-white border-4 border-black shadow-[6px_6px_0_#000] grid grid-cols-[40%_60%] grid-rows-[auto_1fr] h-[160px] w-full md:h-auto before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-[40%] before:border-l-[4px] before:border-black before:pointer-events-none md:before:hidden md:aspect-[3/4] md:grid-cols-1 md:grid-rows-1 md:shadow-[8px_8px_0_#000] hover:cursor-pointer hover:shadow-[0px_0px_0_#000] hover:translate-x-[6px] hover:translate-y-[6px] active:translate-x-[6px] active:translate-y-[6px] transition-all"
    >
      {/* ギザギザマーク */}
      {comic.spikeText && <SpikyBadge text={comic.spikeText} />}

      {/* PCレイアウト時の縦並びラッパー */}
      <div className="hidden md:flex md:flex-col md:h-full md:w-full">
        <img
          src={comic.cover}
          alt={comic.title}
          className="md:w-full md:h-[70%] md:object-cover"
          style={{ objectPosition: comic.cardCoverPosition || "center" }}
        />
        <div className="pc-card-title-and-desc md:block absolute md:static left-0 top-0 w-full md:h-[30%] pointer-events-none md:bg-white md:border-t-[3px] md:border-black md:px-4 md:py-3">
          <div className="font-extrabold text-black md:text-base md:leading-[1.3]">
            {comic.title}
          </div>
          <div className="text-sm leading-6">{comic.description}</div>
        </div>
      </div>

      {/* モバイルレイアウト用（md未満） */}
      <img
        src={comic.cover}
        alt={comic.title}
        className={`col-start-1 row-span-2 w-full h-full object-cover md:hidden`}
        style={{ objectPosition: comic.cardCoverPosition || "center" }}
      />

      <Badge type={comic.badge} />

      <div className="card-title col-start-2 row-start-1 mt-14 ml-4 mr-2 text-left text-sm font-extrabold text-black md:hidden">
        {comic.title}
      </div>

      <div className="card-desc col-start-2 row-start-2 ml-2 p-2 text-xs text-left leading-5 md:hidden">
        {comic.description}
      </div>
    </article>
  );
}

// ここから追加: 一覧表示＋ソート UI（発行順 / 時系列 ＋ 新しい順/古い順）
type SortField = "recommended" | "publication" | "chronological";
type SortDir = "desc" | "asc"; // desc = 新しい順, asc = 古い順

export function ComicsGallery() {
  const [sortField, setSortField] = useState<SortField>("recommended");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const filtered = useMemo(() => {
    const list = [...comicData];
    if (sortField !== "recommended" || sortDir !== "desc") {
      const mul = sortDir === "asc" ? 1 : -1;
      if (sortField === "publication") {
        list.sort(
          (a, b) =>
            ((a.publicationOrder ?? 0) - (b.publicationOrder ?? 0)) * mul
        );
      } else if (sortField === "chronological") {
        list.sort(
          (a, b) =>
            ((a.chronologicalOrder ?? 0) - (b.chronologicalOrder ?? 0)) * mul
        );
      } else if (sortField === "recommended") {
        list.sort(
          (a, b) =>
            ((a.recommendedOrder ?? 0) - (b.recommendedOrder ?? 0)) * mul
        );
      }
    }
    return list;
  }, [sortField, sortDir]);

  return (
    <section className="comics-gallery">
      <div className="controls mb-4 flex flex-wrap gap-2 items-center justify-center flex-col">
        {/* ソート基準: トグル3ボタン */}
        <div
          role="tablist"
          aria-label="ソート基準"
          className="inline-flex rounded-md overflow-hidden"
        >
          <button
            type="button"
            onClick={() => {
              setSortField("recommended");
              setSortDir("asc"); // おすすめ順は常に古いのが上
            }}
            aria-pressed={sortField === "recommended"}
            className={`px-3 py-1 rounded-l-full focus:outline-none focus:ring-0 ${sortField === "recommended"
              ? "bg-gray-800 border-t-4 border-black text-white"
              : "bg-white border-b-4 border-gray-400 text-gray-800 "
              }`}
          >
            おすすめ順
          </button>
          <button
            type="button"
            onClick={() => {
              setSortField("publication");
            }}
            aria-pressed={sortField === "publication"}
            className={`px-3 py-1 focus:outline-none focus:ring-0 ${sortField === "publication"
              ? "bg-gray-800 border-t-4 border-black text-white"
              : "bg-white border-b-4 border-gray-400 text-gray-800 "
              }`}
          >
            発行順
          </button>
          <button
            type="button"
            onClick={() => setSortField("chronological")}
            aria-pressed={sortField === "chronological"}
            className={`px-3 py-1 rounded-r-full focus:outline-none focus:ring-0 ${sortField === "chronological"
              ? "bg-gray-800 border-t-4 border-black text-white"
              : "bg-white border-b-4 border-gray-400 text-gray-800 "
              }`}
          >
            時系列
          </button>
        </div>

        {/* ソート順: トグル2ボタン（基準が none のとき無効） */}
        <div className="inline-flex rounded-md overflow-hidden">
          <button
            type="button"
            onClick={() => setSortDir("desc")}
            aria-pressed={sortDir === "desc"}
            disabled={sortField === "recommended"}
            className={`px-3 py-1 rounded-l-full focus:outline-none focus:ring-0 ${sortDir === "desc"
              ? "bg-gray-800 border-t-4 border-black text-white"
              : "bg-white border-b-4 border-gray-400 text-gray-800 "
              } ${sortField === "recommended"
                ? "opacity-50 pointer-events-none"
                : ""
              }`}
          >
            {sortField === "publication" ? "新しいのが上" : ""}
            {sortField === "chronological" ? "未来が上" : ""}
            {sortField === "recommended" ? "-" : ""}
          </button>
          <button
            type="button"
            onClick={() => setSortDir("asc")}
            aria-pressed={sortDir === "asc"}
            disabled={sortField === "recommended"}
            className={`px-3 py-1 rounded-r-full focus:outline-none focus:ring-0 ${sortDir === "asc"
              ? "bg-gray-800 border-t-4 border-black text-white"
              : "bg-white border-b-4 border-gray-400 text-gray-800 "
              } ${sortField === "recommended"
                ? "opacity-50 pointer-events-none"
                : ""
              }`}
          >
            {sortField === "publication" ? "古いのが上" : ""}
            {sortField === "chronological" ? "過去が上" : ""}
            {sortField === "recommended" ? "-" : ""}
          </button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((comic) => (
          <div key={comic.id}>
            <ComicCard
              comic={comic}
              onClick={() => {
                openToraViewer(comic);
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export { ComicCard, openToraViewer };
