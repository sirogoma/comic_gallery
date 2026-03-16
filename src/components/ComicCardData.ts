// ComicCardData.ts
import type { Comic, BadgeType } from "./ComicCard";
import { recommendedOrder, publicationOrder, chronologicalOrder } from "../comics/sort-order";

// Frontmatter（マークダウン上部のメタデータ）の型定義
interface ComicFrontmatter {
  id: string; // 漫画データID
  title: string; // 漫画タイトル
  badge: BadgeType; // 分類アイコン（四角形）
  description: string; // 概要文
  cover: { // 表紙画像
    src: string; // 画像ファイル名
    position?: string; // 画像の表示位置
  };
  pages: Array<string | { type: "seq"; prefix: string; range: [number, number]; pad: number; ext?: string } | { type: "blank" }>;
  spikeText?: string; // 強調アイコン（とげとげ）
}

// Viteの機能を使って、全ての.mdファイルを文字列として一括読み取り（?rawを使用）
// 外部ライブラリへの依存を減らすため、rawデータとして読み込んで自前でパースします
const modules = import.meta.glob("../comics/*.md", { query: "?raw", eager: true }) as Record<string, { default: string }>;

// 簡易的なYAMLフロントマター解析関数（形式固定のため簡易実装）
function parseFrontmatter(md: string): ComicFrontmatter {
  const match = md.match(/^---([\s\S]+?)---/);
  // フロントマターが見つからない場合は最低限のデータを返す
  if (!match) {
    return {
      id: "unknown",
      title: "読み込みエラー",
      badge: null,
      description: "データの解析に失敗しました",
      cover: { src: "" },
      pages: []
    };
  }

  const content = match[1];
  const obj: Record<string, unknown> & { pages: unknown[]; cover: { src: string; position: string } } = {
    pages: [],
    cover: { src: "", position: "center" }
  };

  // シンプルなキー・値の抽出（1行単位）
  const lines = content.split("\n");

  const getValue = (key: string) => {
    const line = lines.find(l => l.trim().startsWith(`${key}:`));
    if (!line) return "";
    const val = line.split(":").slice(1).join(":").trim();
    return val.replace(/^["'](.*)["']$/, "$1"); // 引用符を削除
  };

  obj.id = getValue("id");
  obj.title = getValue("title");
  obj.badge = getValue("badge") as BadgeType;
  obj.description = getValue("description");
  obj.spikeText = getValue("spikeText") || undefined;

  // ページ情報の抽出
  const pagesStart = content.indexOf("pages:");
  if (pagesStart !== -1) {
    // 次の「キー:」が現れる点を探す（インデントされていない行）
    const tail = content.slice(pagesStart + 6);
    const nextKeyMatch = tail.match(/\n\w+:/);
    const pagesSection = nextKeyMatch ? tail.slice(0, nextKeyMatch.index) : tail;

    obj.pages = pagesSection.split("\n")
      .map(line => line.trim())
      .filter(line => line.startsWith("-"))
      .map(line => {
        const val = line.slice(1).trim();
        if (val.startsWith("{") && val.endsWith("}")) {
          // JSONライクなオブジェクトをパース
          try {
            const jsonStr = val.replace(/(\w+):/g, '"$1":').replace(/'/g, '"');
            return JSON.parse(jsonStr);
          } catch {
            return val;
          }
        }
        return val.replace(/^["'](.*)["']$/, "$1");
      });
  }

  // カバー画像の抽出（入れ子構造への対応）
  const coverStart = content.indexOf("cover:");
  if (coverStart !== -1) {
    const tail = content.slice(coverStart + 6);
    const nextKeyMatch = tail.match(/\n\w+:/);
    const coverSection = nextKeyMatch ? tail.slice(0, nextKeyMatch.index) : tail;

    const srcMatch = coverSection.match(/src:\s*["']?(.*?)["']?(\s|$)/);
    const posMatch = coverSection.match(/position:\s*["']?(.*?)["']?(\s|$)/);

    if (srcMatch) obj.cover.src = srcMatch[1];
    if (posMatch) obj.cover.position = posMatch[1];
  }

  return obj as unknown as ComicFrontmatter;
}

// 連番ページ生成ヘルパー
function generateSeq(
  prefix: string,
  start: number,
  end: number,
  pad = 0,
  ext = ".jpg"
) {
  const arr: string[] = [];
  for (let i = start; i <= end; i++) {
    const s = pad > 0 ? String(i).padStart(pad, "0") : String(i);
    arr.push(`${prefix}${s}${ext}`);
  }
  return arr;
}

// データの生成工程を try-catch で保護
let finalComicData: Comic[] = [];

try {
  const rawComics = Object.values(modules).map(m => parseFrontmatter(m.default));

  finalComicData = rawComics.map(fm => {
    const pages: string[] = [];

    if (Array.isArray(fm.pages)) {
      fm.pages.forEach(p => {
        if (typeof p === "string") {
          pages.push(p);
        } else if (p && typeof p === "object") {
          if (p.type === "blank") {
            pages.push("./images/comic/blankpage.jpg");
          } else if (p.type === "seq" && p.range) {
            pages.push(...generateSeq(p.prefix, p.range[0], p.range[1], p.pad, p.ext || ".jpg"));
          }
        }
      });
    }

    return {
      id: fm.id || "unknown",
      title: fm.title || "Untitled",
      badge: fm.badge,
      description: fm.description || "",
      cover: fm.cover.src || "",
      cardCoverPosition: fm.cover.position || "center",
      pages: pages,
      spikeText: fm.spikeText,
      publicationOrder: publicationOrder.indexOf(fm.id) !== -1 ? publicationOrder.indexOf(fm.id) : 999,
      chronologicalOrder: chronologicalOrder.indexOf(fm.id) !== -1 ? chronologicalOrder.indexOf(fm.id) : 999,
      recommendedOrder: recommendedOrder.indexOf(fm.id) !== -1 ? recommendedOrder.indexOf(fm.id) : 999,
    };
  });
} catch (error) {
  console.error("ComicDataの生成中にエラーが発生しました:", error);
}

export const comicData = finalComicData;
