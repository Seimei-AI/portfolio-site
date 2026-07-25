// コツコツ成長ゲージ（Homeページ用）
(function () {
  var levels = [
    { emoji: "🥚", label: "Lv.1 ぺーぺー", threshold: 0 },
    { emoji: "🐣", label: "Lv.2 見習い", threshold: 10 },
    { emoji: "🐥", label: "Lv.3 修行中", threshold: 30 },
    { emoji: "🦅", label: "Lv.4 一人前？", threshold: 60 },
    { emoji: "🏆", label: "Lv.5 まだまだ伸びしろあり", threshold: 100 }
  ];
  var STORAGE_KEY = "kotsukotsu-clicks";

  var button = document.getElementById("kotsukotsu-button");
  if (!button) return;

  var avatarEl = document.getElementById("level-avatar");
  var labelEl = document.getElementById("level-label");
  var barFillEl = document.getElementById("level-bar-fill");
  var countEl = document.getElementById("click-count");
  var messageEl = document.getElementById("level-message");

  var clicks = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);

  function getLevelIndex(count) {
    var idx = 0;
    for (var i = 0; i < levels.length; i++) {
      if (count >= levels[i].threshold) idx = i;
    }
    return idx;
  }

  function render(showLevelUp) {
    var idx = getLevelIndex(clicks);
    var current = levels[idx];
    var next = levels[idx + 1];

    avatarEl.textContent = current.emoji;
    labelEl.textContent = current.label;
    countEl.textContent = clicks;

    if (next) {
      var range = next.threshold - current.threshold;
      var progress = clicks - current.threshold;
      barFillEl.style.width = Math.min(100, (progress / range) * 100) + "%";
    } else {
      barFillEl.style.width = "100%";
    }

    if (showLevelUp) {
      messageEl.textContent = "レベルアップ！ " + current.label + " になりました！";
      messageEl.classList.add("show");
      setTimeout(function () {
        messageEl.classList.remove("show");
      }, 2200);
    }
  }

  button.addEventListener("click", function () {
    var beforeIdx = getLevelIndex(clicks);
    clicks += 1;
    localStorage.setItem(STORAGE_KEY, String(clicks));
    var afterIdx = getLevelIndex(clicks);
    render(afterIdx > beforeIdx);
  });

  render(false);
})();

// Web制作格言ガチャ（gachaページ用）
(function () {
  var quotes = [
    { emoji: "🛠️", text: "まずは動くものを作れ。完璧は後からでいい。" },
    { emoji: "🌊", text: "CSSは沼。でも沼にハマるのも悪くない。" },
    { emoji: "📱", text: "スマホで見て崩れてたら、それはまだ完成じゃない。" },
    { emoji: "✉️", text: "コミットメッセージは未来の自分への手紙。" },
    { emoji: "🌌", text: "余白は敵じゃない、むしろ主役。" },
    { emoji: "🌱", text: "1日1コミット、されど1コミット。" },
    { emoji: "🐛", text: "エラーメッセージは友達。ちゃんと読もう。" },
    { emoji: "✂️", text: "デザインに迷ったら、まず要素を減らす。" },
    { emoji: "💾", text: "保存を忘れずに。二度と戻らないコードもある。" },
    { emoji: "🐢", text: "コツコツやってれば、いつか動く。" }
  ];

  var button = document.getElementById("gacha-button");
  if (!button) return;

  var card = document.getElementById("gacha-card");
  var emojiEl = document.getElementById("gacha-emoji");
  var quoteEl = document.getElementById("gacha-quote");

  button.addEventListener("click", function () {
    var pick = quotes[Math.floor(Math.random() * quotes.length)];
    card.classList.remove("pop");
    void card.offsetWidth; // アニメーションを再生させるための強制リフロー
    emojiEl.textContent = pick.emoji;
    quoteEl.textContent = pick.text;
    card.classList.add("pop");
  });
})();
