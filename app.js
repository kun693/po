const games = [
  {
    id: "tcg-pocket",
    title: "宝可梦集换式卡牌游戏 Pocket",
    shortTitle: "TCG Pocket",
    platform: "mobile",
    platformLabel: "手机 · iOS / Android",
    year: 2024,
    rating: "4.8",
    accent: "cyan",
    pokemon: 150,
    kicker: "COLLECT · TRADE",
    description: "每天打开几分钟就能收集数字卡牌，体验立体卡牌和轻量对战。适合想从卡牌入门的人。",
    tags: ["卡牌", "收集", "轻对战"],
    link: "https://tcgpocket.pokemon.com/"
  },
  {
    id: "unite",
    title: "宝可梦大集结",
    shortTitle: "Pokémon UNITE",
    platform: "mobile",
    platformLabel: "手机 · iOS / Android",
    year: 2021,
    rating: "4.5",
    accent: "yellow",
    pokemon: 448,
    kicker: "5V5 · ACTION",
    description: "五对五团队对战，单局节奏快，适合喜欢配合队友和即时操作的玩家。",
    tags: ["MOBA", "5v5", "对战"],
    link: "https://unite.pokemon.com/"
  },
  {
    id: "masters-ex",
    title: "宝可梦大师 EX",
    shortTitle: "Masters EX",
    platform: "mobile",
    platformLabel: "手机 · iOS / Android",
    year: 2019,
    rating: "4.4",
    accent: "coral",
    pokemon: 384,
    kicker: "TRAINER · STORY",
    description: "训练家与宝可梦组成拍档登场，主打剧情、收集和三人小队回合制战斗。",
    tags: ["剧情", "养成", "回合制"],
    link: "https://pokemonmasters-game.com/en-US"
  },
  {
    id: "pokemon-go",
    title: "Pokémon GO",
    shortTitle: "Pokémon GO",
    platform: "mobile",
    platformLabel: "手机 · iOS / Android",
    year: 2016,
    rating: "4.3",
    accent: "blue",
    pokemon: 25,
    kicker: "REAL WORLD · CATCH",
    description: "把地图变成冒险场，在现实世界移动、捕捉、对战并参加社区活动。",
    tags: ["实景", "探索", "社交"],
    link: "https://pokemongolive.com/"
  },
  {
    id: "sleep",
    title: "Pokémon Sleep",
    shortTitle: "Pokémon Sleep",
    platform: "mobile",
    platformLabel: "手机 · iOS / Android",
    year: 2023,
    rating: "4.1",
    accent: "purple",
    pokemon: 143,
    kicker: "SLEEP · RESEARCH",
    description: "记录睡眠并观察宝可梦的睡姿，适合想要轻松收集、不追求高强度操作的玩家。",
    tags: ["睡眠", "收集", "休闲"],
    link: "https://www.pokemonsleep.net/"
  },
  {
    id: "tcg-live",
    title: "Pokémon TCG Live",
    shortTitle: "TCG Live",
    platform: "desktop",
    platformLabel: "笔记本 · Windows / macOS",
    year: 2023,
    rating: "4.2",
    accent: "green",
    pokemon: 724,
    kicker: "DESKTOP · CARD BATTLE",
    description: "在电脑上构筑卡组、练习对战并与玩家在线切磋，官方支持 Windows 和 macOS。",
    tags: ["卡牌", "在线", "构筑"],
    link: "https://tcg.pokemon.com/en-us/tcglive/"
  },
  {
    id: "arceus",
    title: "宝可梦传说 阿尔宙斯",
    shortTitle: "传说 阿尔宙斯",
    platform: "console",
    platformLabel: "主机 · Nintendo Switch",
    year: 2022,
    rating: "4.7",
    accent: "yellow",
    pokemon: 487,
    kicker: "OPEN WORLD · RPG",
    description: "在古代神奥地区调查、捕捉和研究宝可梦，动作探索感更强，适合喜欢单人冒险。",
    tags: ["RPG", "探索", "单人"],
    link: "https://www.nintendo.com/us/store/products/pokemon-legends-arceus-switch/"
  },
  {
    id: "scarlet-violet",
    title: "宝可梦 朱／紫",
    shortTitle: "朱／紫",
    platform: "console",
    platformLabel: "主机 · Nintendo Switch",
    year: 2022,
    rating: "4.4",
    accent: "coral",
    pokemon: 1000,
    kicker: "OPEN WORLD · MAINLINE",
    description: "帕底亚地区的开放世界正统 RPG，支持多人联机和持续更新内容。",
    tags: ["RPG", "开放世界", "联机"],
    link: "https://www.nintendo.com/us/store/products/pokemon-scarlet-switch/"
  }
];

const grid = document.querySelector("#game-grid");
const searchInput = document.querySelector("#search-input");
const sortSelect = document.querySelector("#sort-select");
const emptyState = document.querySelector("#empty-state");
const resultCount = document.querySelector("#result-count");
const dialog = document.querySelector("#detail-dialog");
let activeFilter = "all";

function imageUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

function getFilteredGames() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = games.filter((game) => {
    const matchesFilter = activeFilter === "all" || game.platform === activeFilter;
    const haystack = [game.title, game.shortTitle, game.platformLabel, game.kicker, ...game.tags].join(" ").toLowerCase();
    return matchesFilter && (!query || haystack.includes(query));
  });
  return filtered.sort((a, b) => {
    if (sortSelect.value === "newest") return b.year - a.year;
    if (sortSelect.value === "rating") return Number(b.rating) - Number(a.rating);
    return games.indexOf(a) - games.indexOf(b);
  });
}

function renderGames() {
  const filtered = getFilteredGames();
  resultCount.textContent = String(filtered.length).padStart(2, "0");
  emptyState.hidden = filtered.length > 0;
  grid.innerHTML = filtered.map((game) => `
    <article class="game-card">
      <div class="game-cover cover-${game.accent}">
        <span class="platform-badge">${game.platformLabel.split(" · ")[0]}</span>
        <span class="game-score">★ ${game.rating}</span>
        <img src="${imageUrl(game.pokemon)}" alt="${game.shortTitle} 视觉图" loading="lazy" />
      </div>
      <div class="game-body">
        <div class="game-kicker">${game.kicker} · ${game.year}</div>
        <h3>${game.title}</h3>
        <p>${game.description}</p>
        <div class="game-footer">
          <div class="tag-list">${game.tags.map((tag) => `<span class="game-tag">${tag}</span>`).join("")}</div>
          <button class="details-button" data-game-id="${game.id}">详情 <i data-lucide="arrow-up-right"></i></button>
        </div>
      </div>
    </article>
  `).join("");
  grid.querySelectorAll("[data-game-id]").forEach((button) => button.addEventListener("click", () => openDetails(button.dataset.gameId)));
  refreshIcons();
}

function openDetails(id) {
  const game = games.find((item) => item.id === id);
  if (!game) return;
  document.querySelector("#dialog-image").src = imageUrl(game.pokemon);
  document.querySelector("#dialog-image").alt = `${game.shortTitle} 视觉图`;
  document.querySelector("#dialog-platform").textContent = game.platformLabel;
  document.querySelector("#dialog-eyebrow").textContent = `${game.kicker} · ${game.year}`;
  document.querySelector("#dialog-title").textContent = game.title;
  document.querySelector("#dialog-description").textContent = game.description;
  document.querySelector("#dialog-meta").innerHTML = [game.platformLabel, `推荐指数 ${game.rating}`, ...game.tags].map((item) => `<span>${item}</span>`).join("");
  document.querySelector("#dialog-link").href = game.link;
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
  refreshIcons();
}

function refreshIcons() {
  if (window.lucide) window.lucide.createIcons({ attrs: { "stroke-width": 1.8 } });
}

document.querySelectorAll(".filter-chip").forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll(".filter-chip").forEach((chip) => chip.classList.toggle("active", chip === button));
    renderGames();
  });
});
document.querySelectorAll("[data-route-filter]").forEach((link) => {
  link.addEventListener("click", () => {
    const target = document.querySelector(`[data-filter="${link.dataset.routeFilter}"]`);
    if (target) target.click();
  });
});
searchInput.addEventListener("input", renderGames);
sortSelect.addEventListener("change", renderGames);
document.querySelector("#clear-search").addEventListener("click", () => {
  searchInput.value = "";
  activeFilter = "all";
  document.querySelectorAll(".filter-chip").forEach((chip) => chip.classList.toggle("active", chip.dataset.filter === "all"));
  renderGames();
});
document.querySelector("#dialog-close").addEventListener("click", () => dialog.close());
document.querySelector("#dialog-dismiss").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && document.activeElement !== searchInput) { event.preventDefault(); searchInput.focus(); }
});

renderGames();
refreshIcons();
