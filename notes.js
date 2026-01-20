// notes.js (for timeline.html)
// - window.NOTES の辞書を提供
// - data-note-key="..." を持つ要素に hover するとツールチップを出す
// - 代替として title="..." が NOTES のキーと一致する場合も拾う（HTML変更を最小化）

window.NOTES = {
  iliad: {
    title: "イリアス",
    note: "ホメロスによる叙事詩。\nトロイア戦争を背景に、英雄アキレウスの怒りを軸として、名誉、暴力、死をめぐる人間の在り方を描く。"
  },
  odyssey: {
    title: "オデュッセイア",
    note: "ホメロスによる叙事詩。\n戦後の遍歴と帰還を主題とし、知恵、試練、家庭への回帰を通して人間の生を描く。"
  },
  theogony: {
    title: "神統記",
    note: "ヘシオドスによる神話叙事詩。\n神々の系譜と抗争を通して、世界秩序の成立過程を描く。"
  },
  timaeus: {
    title: "ティマイオス",
    note: "プラトンによる対話篇。\n宇宙の生成と秩序を、数、比例、魂の構造から描く。"
  },
  metaphysics: {
    title: "形而上学",
    note: "アリストテレスの著作。\n存在を存在として捉え、実体、原因、形相と質料の関係を体系的に描く。"
  },
  republic: {
    title: "国家",
    note: "プラトンの対話篇。\n正義とは何かを問い、理想国家の構造と魂の秩序を描く。"
  },
  principia: {
    title: "プリンキピア",
    note: "ニュートンによる自然哲学の著作。\n運動の法則と万有引力の法則を示し、自然現象を数学的秩序として描く。"
  },
  critique_pure_reason: {
    title: "純粋理性批判",
    note: "カントの著作。\n人間の認識能力の限界と条件を分析し、経験が成立する構造を描く。"
  },
  critique_judgment: {
    title: "判断力批判",
    note: "カントの著作。\n美と目的性をめぐる判断を分析し、自然と自由の関係を描く。"
  },
  phenomenology_spirit: {
    title: "精神現象学",
    note: "ヘーゲルの著作。\n意識が感覚的確信から絶対知に至るまでの運動を、経験の連なりとして描く。"
  },
  science_logic_v1: {
    title: "論理学（第一巻）",
    note: "ヘーゲルの著作。\n存在の論理を扱い、思考が最も抽象的な規定から展開していく過程を描く。"
  },
  econ_philo_1844: {
    title: "経済学・哲学草稿",
    note: "マルクスの初期草稿。\n労働と疎外の問題を通して、人間の本質と社会の構造を描く。"
  },
  origin_species: {
    title: "種の起源",
    note: "ダーウィンの著作。\n自然選択の理論を提示し、生物種の変化と多様性の過程を描く。"
  },
  beyond_good_evil: {
    title: "善悪の彼岸",
    note: "ニーチェの著作。\n道徳の起源と価値判断を批判し、従来の善悪観を問い直す過程を描く。"
  },
  tractatus_draft: {
    title: "論理哲学論考（草）",
    note: "ウィトゲンシュタインの著作。\n世界、言語、論理の関係を命題の形式として描く。"
  },
  principia_mathematica_excerpt: {
    title: "数学原理（抄）",
    note: "ラッセルとホワイトヘッドによる著作。\n数学を論理から基礎づける試みを体系的に描く。"
  },
  being_time: {
    title: "存在と時間",
    note: "ハイデガーの著作。\n存在の意味を問い、人間存在を時間性の中で分析し描く。"
  },
  process_reality: {
    title: "過程と実在",
    note: "ホワイトヘッドの著作。\n実在を固定的実体ではなく、出来事と過程として捉える形而上学を描く。"
  },
  work_art_mechanical_repro: {
    title: "芸術作品の複製技術時代",
    note: "ベンヤミンの論考。\n複製技術が芸術の価値と知覚の在り方を変える過程を描く。"
  },
  structure_scientific_revolutions_draft: {
    title: "科学革命の構造（草）",
    note: "クーンの著作。\n科学の発展を連続的進歩ではなく、パラダイム転換として描く。"
  },
  philosophical_investigations: {
    title: "哲学探究",
    note: "ウィトゲンシュタインの著作。\n言語の使用と意味を、日常的実践の中で分析し描く。"
  },
  discourse_method_reread: {
    title: "方法序説（再読）",
    note: "デカルトの著作。\n確実な知に至るための思考方法を提示し、近代哲学の出発点を描く。"
  },
  physics_philosophy: {
    title: "物理学と哲学",
    note: "ハイゼンベルクの著作。\n現代物理学の成果が哲学的思考に与える影響を描く。"
  }
};

(() => {
  "use strict";

  // ========== どの要素で説明を出すか ==========
  // 推奨： data-note-key="iliad" のように NOTES のキーを指定
  const KEY_ATTR = "data-note-key";

  // 代替：HTMLを変えにくい場合、title="iliad" をキーとして扱う（NOTESに一致するもののみ）
  const FALLBACK_TITLE_AS_KEY = true;

  // ========== ツールチップDOM ==========
  const tooltip = document.createElement("div");
  tooltip.id = "note-tooltip";
  tooltip.style.position = "fixed";
  tooltip.style.left = "0px";
  tooltip.style.top = "0px";
  tooltip.style.transform = "translate(-9999px,-9999px)";
  tooltip.style.maxWidth = "520px";
  tooltip.style.padding = "10px 12px";
  tooltip.style.borderRadius = "10px";
  tooltip.style.boxShadow = "0 8px 24px rgba(0,0,0,.18)";
  tooltip.style.background = "rgba(20,20,20,.92)";
  tooltip.style.color = "#fff";
  tooltip.style.fontSize = "13px";
  tooltip.style.lineHeight = "1.6";
  tooltip.style.zIndex = "999999";
  tooltip.style.pointerEvents = "none";
  tooltip.style.whiteSpace = "pre-line"; // \n を改行として表示
  tooltip.style.opacity = "0";
  tooltip.style.transition = "opacity .12s ease";

  let activeEl = null;

  const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

  const resolveKeyFromElement = (el) => {
    if (!el) return null;

    // 1) data-note-key
    const k = el.getAttribute(KEY_ATTR);
    if (k && window.NOTES && window.NOTES[k]) return k;

    // 2) fallback: title をキーとして扱う（NOTESに一致する場合だけ）
    if (FALLBACK_TITLE_AS_KEY) {
      const t = el.getAttribute("title");
      if (t && window.NOTES && window.NOTES[t]) return t;
    }

    return null;
  };

  const formatText = (entry) => {
    if (!entry) return "";
    const title = entry.title ? String(entry.title) : "";
    const note = entry.note ? String(entry.note) : "";
    // タイトルがある場合は先頭に出す（あなたのUIに合わせた最小の装飾）
    if (title && note) return `${title}\n${note}`;
    return title || note || "";
  };

  const show = (el, key) => {
    const entry = window.NOTES?.[key];
    if (!entry) return;

    activeEl = el;
    tooltip.textContent = formatText(entry);
    tooltip.style.opacity = "1";
  };

  const hide = () => {
    activeEl = null;
    tooltip.style.opacity = "0";
    tooltip.style.transform = "translate(-9999px,-9999px)";
  };

  const position = (clientX, clientY) => {
    // カーソルの少し右下に表示
    const pad = 14;

    // 先に表示してからサイズ取得（opacityで制御）
    const rect = tooltip.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;

    let x = clientX + pad;
    let y = clientY + pad;

    x = clamp(x, 8, vw - rect.width - 8);
    y = clamp(y, 8, vh - rect.height - 8);

    tooltip.style.transform = `translate(${x}px, ${y}px)`;
  };

  const init = () => {
    document.body.appendChild(tooltip);

    // document 全体で拾う（後から生成される要素にも強い）
    document.addEventListener("mouseover", (e) => {
      const el = e.target?.closest?.(`[${KEY_ATTR}], [title]`);
      if (!el) return;

      const key = resolveKeyFromElement(el);
      if (!key) return;

      show(el, key);
    }, { passive: true });

    document.addEventListener("mousemove", (e) => {
      if (!activeEl) return;
      position(e.clientX, e.clientY);
    }, { passive: true });

    document.addEventListener("mouseout", (e) => {
      if (!activeEl) return;

      const related = e.relatedTarget;
      // まだ同じ要素内にいるなら消さない
      if (related && activeEl.contains(related)) return;

      // 次のhover先が別の説明対象なら、mouseover側で更新されるのでここでは消さない
      const next = related?.closest?.(`[${KEY_ATTR}], [title]`);
      if (next) return;

      hide();
    }, { passive: true });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
