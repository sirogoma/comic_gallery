// 一時スクリプト: comicHeaderDataをMarkdown表に変換
const comicHeaderData = [
  {
    id: "ryu",
    cover: "./images/comic/ryu/ryu_thum.jpg",
    title: "若き龍は青天にのぼる",
    badge: "full",
    description:
      "転♂たつひこ　入学前のお話　同名同人誌作品、WLL3限定全文公開です",
    publicationOrder: 1,
    chronologicalOrder: 1,
    recommendedOrder: 2,
    cardCoverPosition: "top",
    spikeText: "Web初",
  },
  {
    id: "tenimelog",
    cover: "./images/comic/tenimelog/tenimelog_cover.jpg",
    title: "転♂イメ　単発まんが・らくがき",
    badge: "zatta",
    description: "転♂イメ　Xに掲載した過去の単発まんが・らくがき",
    publicationOrder: 3,
    chronologicalOrder: 9,
    recommendedOrder: 9,
    cardCoverPosition: "top",
  },
  {
    id: "sep1",
    cover: "./images/comic/sep1/sep1_cover.jpg",
    title: "6年生の9月1日",
    badge: "full",
    description: "転♂イメ　昨年9月1日オンリー日付合わせのif話",
    publicationOrder: 2,
    chronologicalOrder: 10,
    recommendedOrder: 10,
    cardCoverPosition: "bg-center",
  },
  {
    id: "kakolog",
    cover: "./images/comic/kakolog/kakolog_cover.jpg",
    title: "単発まんが・らくがきまとめ",
    badge: "zatta",
    description: "オールキャラ　Xに掲載した過去の単発まんが・らくがき",
    publicationOrder: 4,
    chronologicalOrder: 2,
    recommendedOrder: 8,
    cardCoverPosition: "top",
  },
  {
    id: "mia",
    cover: "./images/comic/mia/MIA_cover.jpg",
    title: "Milk in After",
    badge: "sample",
    description:
      "転♂イメ　なりゆきで必要の部屋デートする話　同名同人誌冒頭サンプルです",
    publicationOrder: 5,
    chronologicalOrder: 3,
    recommendedOrder: 7,
    cardCoverPosition: "top",
  },
  {
    id: "aitu",
    cover: "./images/comic/aitu/aitu_cover.jpg",
    title: "あいつなんか",
    badge: "full",
    description:
      "転♂イメ　気になるあいつのヤなところ　同人誌「It's not LOVE,Just MAGIC!!」収録",
    publicationOrder: 6,
    chronologicalOrder: 5,
    recommendedOrder: 6,
    cardCoverPosition: "top",
  },
  {
    id: "mori",
    cover: "./images/comic/mori/mori_cover.jpg",
    title: "わるくないかも",
    badge: "sample",
    description:
      "転♂イメ「あいつなんか」の続き　同人誌「It's not LOVE,Just MAGIC!!」収録サンプル",
    publicationOrder: 7,
    chronologicalOrder: 6,
    recommendedOrder: 4,
    cardCoverPosition: "top",
  },
  {
    id: "ror",
    cover: "./images/comic/ror/ror_cover.jpg",
    title: "転入生たちのティールーム",
    badge: "full",
    description:
      "転♂イメ　とある転入生たちが集まる必要の部屋で…　ゲスト転入生いろいろ",
    publicationOrder: 9,
    chronologicalOrder: 4,
    recommendedOrder: 3,
    cardCoverPosition: "top",
    spikeText: "Web初",
  },
  {
    id: "aoharu",
    cover: "./images/comic/aoharu/aoharu_cover.jpg",
    title: "学園思春期お下品漫画",
    badge: "full",
    description: "転♂イメ　思春期シモネタコメディ",
    publicationOrder: 8,
    chronologicalOrder: 7,
    recommendedOrder: 5,
    cardCoverPosition: "bg-center",
  },
  {
    id: "kininaru",
    cover: "./images/comic/kininaru/kininaru_cover.jpg",
    title: "気になる理由",
    badge: "full",
    description: "転♂イメ　WLL3新作　気になることは尽きない",
    publicationOrder: 10,
    chronologicalOrder: 8,
    recommendedOrder: 1,
    cardCoverPosition: "top",
    spikeText: "新作",
  },
];

// Markdown表のセル値をエスケープ（パイプ文字や改行を処理）
function escapeMarkdownCell(value) {
  if (value === undefined || value === null) {
    return "-";
  }
  return String(value)
    .replace(/\|/g, "\\|")
    .replace(/\n/g, " ");
}

// Markdown表を生成
function generateMarkdownTable(data) {
  if (data.length === 0) {
    return "";
  }

  // フィールド名を取得
  const fields = [
    "id",
    "cover",
    "title",
    "badge",
    "description",
    "publicationOrder",
    "chronologicalOrder",
    "recommendedOrder",
    "cardCoverPosition",
    "spikeText",
  ];

  // ヘッダー行
  const header = "| " + fields.map((f) => f).join(" | ") + " |";

  // 区切り行
  const separator = "| " + fields.map(() => "---").join(" | ") + " |";

  // データ行
  const rows = data.map((item) => {
    return (
      "| " +
      fields
        .map((field) => escapeMarkdownCell(item[field]))
        .join(" | ") +
      " |"
    );
  });

  return [header, separator, ...rows].join("\n");
}

// 表を生成して出力
const markdownTable = generateMarkdownTable(comicHeaderData);
console.log(markdownTable);
