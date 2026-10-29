const STORAGE_KEYS = {
  recipes: "cookingAppRecipes",
  favorites: "cookingAppFavorites",
  requests: "cookingAppRequests",
  accounts: "cookingAppAccounts"
};

const seedRecipes = [
  {
    id: 1,
    title: "和風玉子焼き",
    category: "和食",
    time: "15分",
    difficulty: "初級",
    description: "ふわっとした卵とおかず野菜を合わせた、朝食にぴったりの定番料理です。",
    servings: 2,
    ingredients: "卵: 3個\nだし: 大さじ2\n砂糖: 小さじ1\n塩: 少々",
    instructions: "1. 卵を溶き、だしと調味料を混ぜます。\n2. 卵焼き器で数回に分けて焼き、巻きます。\n3. 食べやすく切って盛り付けます。",
    icon: "🍳",
    color: "linear-gradient(135deg, #ffe8a8, #ffbb57 58%, #f29b2e)"
  },
  {
    id: 2,
    title: "豚キムチ炒め",
    category: "中華",
    time: "20分",
    difficulty: "中級",
    description: "キムチのピリッとした香りと豚肉のうまみが広がる一品です。",
    servings: 2,
    ingredients: "豚肉: 200g\nキムチ: 150g\nごま油: 大さじ1\nねぎ: 適量",
    instructions: "1. 豚肉を食べやすい大きさに切ります。\n2. フライパンで豚肉を炒め、火が通ったらキムチを加えます。\n3. 調味料で味を整え、ねぎを散らします。",
    icon: "🥢",
    color: "linear-gradient(135deg, #f9d9ba, #f59b7d 50%, #d96347)"
  },
  {
    id: 3,
    title: "トマトパスタ",
    category: "イタリアン",
    time: "25分",
    difficulty: "初級",
    description: "ガーリックとトマトの香りで、シンプルなのに満足感のあるパスタです。",
    servings: 2,
    ingredients: "パスタ: 200g\nトマトソース: 300g\nにんにく: 1片\nオリーブオイル: 大さじ1",
    instructions: "1. パスタを表示時間どおりにゆでます。\n2. にんにくを炒め、トマトソースを加えて煮ます。\n3. パスタをソースと和えて盛り付けます。",
    icon: "🍝",
    color: "linear-gradient(135deg, #f7d3b2, #f58d66 55%, #d24e34)"
  },
  {
    id: 4,
    title: "苺ヨーグルトパフェ",
    category: "デザート",
    time: "10分",
    difficulty: "初級",
    description: "甘酸っぱくて軽い食感の、簡単に作れるデザートです。",
    servings: 2,
    ingredients: "いちご: 6個\nヨーグルト: 200g\nグラノーラ: 40g",
    instructions: "1. いちごを食べやすい大きさに切ります。\n2. 器にヨーグルトとグラノーラを重ねます。\n3. いちごを飾って完成です。",
    icon: "🍓",
    color: "linear-gradient(135deg, #ffd5e5, #ff9ec1 55%, #db5d8c)"
  },
  {
    id: 5,
    title: "チキンカレー",
    category: "和食",
    time: "35分",
    difficulty: "中級",
    description: "家庭で作る定番カレー。とろみのあるスープがご飯とよく合います。",
    servings: 2,
    ingredients: "鶏肉: 200g\n玉ねぎ: 1個\nにんじん: 1/2本\nカレールウ: 2皿分\n水: 300ml",
    instructions: "1. 鶏肉と野菜を食べやすい大きさに切ります。\n2. 鍋で具材を炒め、水を加えて煮込みます。\n3. 火を止めてルウを溶かし、再び煮込んでご飯にかけます。",
    icon: "🍛",
    color: "linear-gradient(135deg, #fbe6b3, #efb063 60%, #d77b33)"
  },
  {
    id: 6,
    title: "海老チリ",
    category: "中華",
    time: "18分",
    difficulty: "中級",
    description: "海老のぷりっとした食感と、甘辛いソースがとても魅力的です。",
    servings: 2,
    ingredients: "海老: 200g\n片栗粉: 大さじ1\nチリソース: 大さじ3\nねぎ: 適量",
    instructions: "1. 海老の下処理をして、片栗粉をまぶします。\n2. 海老を焼いて取り出します。\n3. ソースを煮立て、海老を戻して全体を絡めます。",
    icon: "🦐",
    color: "linear-gradient(135deg, #ffd9bd, #ff9f7c 58%, #d85348)"
  }
];

const recipeList = document.getElementById("recipeList");
const template = document.getElementById("recipeCardTemplate");
const searchInput = document.getElementById("searchInput");
const resultCount = document.getElementById("resultCount");
const randomRecipeBtn = document.getElementById("randomRecipeBtn");
const categoryFilters = document.getElementById("categoryFilters");
const heroSlider = document.getElementById("heroSlider");
const heroSlides = Array.from(document.querySelectorAll(".hero-slide"));
const favoriteList = document.getElementById("favoriteList");
const favoriteBadge = document.getElementById("favoriteBadge");
const requestForm = document.getElementById("requestForm");
const requestList = document.getElementById("requestList");
const recipeModal = document.getElementById("recipeModal");
const recipeForm = document.getElementById("recipeForm");
const detailModal = document.getElementById("detailModal");
const detailContent = document.getElementById("detailContent");
const favoriteModal = document.getElementById("favoriteModal");
const favoriteForm = document.getElementById("favoriteForm");
const favoriteNameInput = document.getElementById("favoriteNameInput");
const recipeImageInput = document.getElementById("recipeImageInput");
const manageRecipeBtn = document.getElementById("manageRecipeBtn");
const authScreen = document.getElementById("authScreen");
const appShell = document.getElementById("appShell");
const authForm = document.getElementById("authForm");
const authTitle = document.getElementById("authTitle");
const authDescription = document.querySelector(".auth-description");
const authSubmitBtn = document.getElementById("authSubmitBtn");
const passwordInput = document.getElementById("passwordInput");
const togglePasswordBtn = document.getElementById("togglePasswordBtn");
const authMessage = document.getElementById("authMessage");
const authTabs = document.querySelector(".auth-tabs");
const passwordResetPanel = document.getElementById("passwordResetPanel");
const passwordResetForm = document.getElementById("passwordResetForm");
const passwordResetMessage = document.getElementById("passwordResetMessage");
const recoveryCodePanel = document.getElementById("recoveryCodePanel");
const recoveryCodeOutput = document.getElementById("recoveryCodeOutput");
const recoveryCodeSaved = document.getElementById("recoveryCodeSaved");
const continueAfterRecoveryBtn = document.getElementById("continueAfterRecoveryBtn");
const demoNotice = document.getElementById("demoNotice");
const nameField = document.getElementById("nameField");
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const guestBtn = document.getElementById("guestBtn");
const forgotPasswordBtn = document.getElementById("forgotPasswordBtn");
const cancelPasswordResetBtn = document.getElementById("cancelPasswordResetBtn");
const logoutBtn = document.getElementById("logoutBtn");
const signedInUser = document.getElementById("signedInUser");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelRecipeBtn = document.getElementById("cancelRecipeBtn");
const closeDetailModalBtn = document.getElementById("closeDetailModalBtn");
const closeFavoriteModalBtn = document.getElementById("closeFavoriteModalBtn");
const cancelFavoriteBtn = document.getElementById("cancelFavoriteBtn");

let recipes = JSON.parse(localStorage.getItem(STORAGE_KEYS.recipes) || "null") || seedRecipes;
let favorites = JSON.parse(localStorage.getItem(STORAGE_KEYS.favorites) || "[]");
let requests = JSON.parse(localStorage.getItem(STORAGE_KEYS.requests) || "[]");
let accounts = JSON.parse(localStorage.getItem(STORAGE_KEYS.accounts) || "[]");
let selectedCategory = "all";
let isSignupMode = false;

recipes = recipes.map((recipe) => {
  const seedRecipe = seedRecipes.find((item) => item.id === recipe.id);
  return {
    ...recipe,
    instructions: recipe.instructions || seedRecipe?.instructions || "",
    servings: recipe.servings || seedRecipe?.servings || 2,
    ingredients: recipe.ingredients ?? seedRecipe?.ingredients ?? ""
  };
});

function normalizeFavorites() {
  favorites = favorites.map((item) => {
    if (typeof item === "number") {
      return { recipeId: item, name: "家族" };
    }
    return {
      recipeId: item.recipeId,
      name: item.name || "家族"
    };
  });
}

function saveRecipes() {
  localStorage.setItem(STORAGE_KEYS.recipes, JSON.stringify(recipes));
}

function saveFavorites() {
  localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
}

function saveRequests() {
  localStorage.setItem(STORAGE_KEYS.requests, JSON.stringify(requests));
}

function startHeroSlider() {
  if (!heroSlider || !heroSlides.length) return;

  let currentIndex = 0;

  window.setInterval(() => {
    currentIndex = (currentIndex + 1) % heroSlides.length;
    heroSlides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentIndex);
    });
  }, 2200);
}

function renderFavorites() {
  normalizeFavorites();
  const favoriteEntries = recipes
    .map((recipe) => {
      const names = favorites
        .filter((item) => item.recipeId === recipe.id)
        .map((item) => item.name);

      if (!names.length) {
        return null;
      }

      return {
        recipe,
        names
      };
    })
    .filter(Boolean);

  favoriteBadge.textContent = String(favoriteEntries.length);

  if (!favoriteEntries.length) {
    favoriteList.innerHTML = "<li>まだお気に入りがありません</li>";
    return;
  }

  favoriteList.innerHTML = favoriteEntries
    .map(
      ({ recipe, names }) => `
        <li>
          <strong>${recipe.icon} ${recipe.title}</strong><br />
          ${recipe.category} / ${recipe.time}<br />
          <span class="favorite-owner">いいね: ${names.join("、")}</span>
        </li>
      `
    )
    .join("");
}

function renderRequests() {
  if (!requests.length) {
    requestList.innerHTML = "<li>まだリクエストはありません</li>";
    return;
  }

  const displayRequests = [...requests].reverse();

  requestList.innerHTML = displayRequests
    .map((request, index) => {
      const actualIndex = requests.length - 1 - index;
      return `
        <li>
          <div class="request-item">
            <div>
              <strong>${request.requester}</strong>さんのリクエスト<br />
              ${request.recipeName}<br />
              <small>${request.message || "メモなし"}</small>
            </div>
            <button class="request-delete-btn" type="button" data-index="${actualIndex}">削除</button>
          </div>
        </li>
      `;
    })
    .join("");

  requestList.querySelectorAll(".request-delete-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      requests.splice(index, 1);
      saveRequests();
      renderRequests();
    });
  });
}

function getFilteredRecipes() {
  const keyword = searchInput.value.trim().toLowerCase();

  return recipes.filter((recipe) => {
    const matchesCategory = selectedCategory === "all" || recipe.category === selectedCategory;
    const text = `${recipe.title} ${recipe.category} ${recipe.description} ${recipe.time}`.toLowerCase();
    const matchesKeyword = text.includes(keyword);
    return matchesCategory && matchesKeyword;
  });
}

function renderRecipes() {
  const filtered = getFilteredRecipes();
  recipeList.innerHTML = "";

  if (!filtered.length) {
    recipeList.innerHTML = `
      <div class="empty-state">
        <h4>該当するレシピがありません</h4>
        <p>別のキーワードやカテゴリで検索してみてください。</p>
      </div>
    `;
    resultCount.textContent = "0件";
    renderFavorites();
    return;
  }

  filtered.forEach((recipe) => {
    const card = template.content.cloneNode(true);
    const image = card.querySelector(".recipe-image");
    const title = card.querySelector(".recipe-title");
    const description = card.querySelector(".recipe-description");
    const category = card.querySelector(".category-tag");
    const time = card.querySelector(".cook-time");
    const difficulty = card.querySelector(".difficulty");
    const favoriteBtn = card.querySelector(".favorite-btn");
    const editBtn = card.querySelector(".edit-btn");
    const deleteBtn = card.querySelector(".delete-btn");

    image.style.background = recipe.color || "linear-gradient(135deg, #ffddae, #ffb36d 58%, #f38543)";
    image.textContent = recipe.icon || "🍽️";
    if (recipe.image) {
      image.style.backgroundImage = `url("${recipe.image}")`;
      image.style.backgroundPosition = "center";
      image.style.backgroundSize = "cover";
      image.textContent = "";
    }
    title.textContent = recipe.title;
    description.textContent = recipe.description;
    category.textContent = recipe.category;
    time.textContent = recipe.time;
    difficulty.textContent = `難易度: ${recipe.difficulty}`;

    const myFavoriteEntries = favorites.filter((item) => item.recipeId === recipe.id);
    if (myFavoriteEntries.length) {
      favoriteBtn.classList.add("active");
      favoriteBtn.textContent = "♥";
    } else {
      favoriteBtn.textContent = "♡";
    }

    favoriteBtn.addEventListener("click", () => {
      const hasFavorite = favorites.some((item) => item.recipeId === recipe.id);

      if (hasFavorite) {
        favorites = favorites.filter((item) => item.recipeId !== recipe.id);
        saveFavorites();
        renderFavorites();
        renderRecipes();
        return;
      }

      const favoriteTarget = recipe;
      favoriteNameInput.value = "";
      favoriteForm.dataset.recipeId = String(favoriteTarget.id);
      favoriteModal.classList.remove("hidden");
      favoriteModal.setAttribute("aria-hidden", "false");
      favoriteNameInput.focus();
    });

    card.querySelector(".mini-btn").addEventListener("click", () => {
      openDetailModal(recipe);
    });

    editBtn.addEventListener("click", () => openRecipeModal(recipe));

    deleteBtn.addEventListener("click", () => {
      if (window.confirm(`${recipe.title} を削除しますか？`)) {
        recipes = recipes.filter((item) => item.id !== recipe.id);
        favorites = favorites.filter((item) => item.recipeId !== recipe.id);
        saveRecipes();
        saveFavorites();
        renderFavorites();
        renderRecipes();
      }
    });

    recipeList.appendChild(card);
  });

  resultCount.textContent = `${filtered.length}件`;
  renderFavorites();
}

function openRecipeModal(recipe = null) {
  recipeModal.classList.remove("hidden");
  recipeModal.setAttribute("aria-hidden", "false");

  const title = document.getElementById("recipeModalTitle");

  if (!recipe) {
    title.textContent = "レシピ追加";
    recipeForm.reset();
    recipeForm.elements.id.value = "";
    recipeForm.elements.category.value = "和食";
    recipeForm.elements.difficulty.value = "初級";
    recipeForm.elements.icon.value = "🍽️";
    recipeImageInput.value = "";
    return;
  }

  title.textContent = "レシピ編集";
  recipeForm.elements.id.value = recipe.id;
  recipeForm.elements.title.value = recipe.title;
  recipeForm.elements.category.value = recipe.category;
  recipeForm.elements.time.value = recipe.time;
  recipeForm.elements.difficulty.value = recipe.difficulty;
  recipeForm.elements.icon.value = recipe.icon;
  recipeImageInput.value = "";
  recipeForm.elements.description.value = recipe.description;
  recipeForm.elements.servings.value = recipe.servings || 2;
  recipeForm.elements.ingredients.value = recipe.ingredients || "";
  recipeForm.elements.instructions.value = recipe.instructions || "";
}

function closeRecipeModal() {
  recipeModal.classList.add("hidden");
  recipeModal.setAttribute("aria-hidden", "true");
}

function openDetailModal(recipe) {
  detailModal.classList.remove("hidden");
  detailModal.setAttribute("aria-hidden", "false");

  const owners = favorites
    .filter((item) => item.recipeId === recipe.id)
    .map((item) => item.name);

  const instructions = recipe.instructions || "作り方はまだ登録されていません。編集画面から追加できます。";
  const baseServings = Math.max(1, Number(recipe.servings) || 2);

  detailContent.innerHTML = `
    <div class="detail-hero">
      <div class="detail-icon detail-image">${recipe.icon || "🍽️"}</div>
      <div>
        <h4 class="detail-headline">${recipe.title}</h4>
        <div class="detail-meta">
          <span class="detail-chip">${recipe.category}</span>
          <span class="detail-chip">${recipe.time}</span>
          <span class="detail-chip">${recipe.difficulty}</span>
        </div>
      </div>
    </div>
    <p class="detail-text">${recipe.description}</p>
    <section class="ingredients-section">
      <div class="ingredients-header">
        <h4 class="detail-section-title">材料</h4>
        <label class="servings-control">
          人数
          <input class="detail-servings" type="number" min="1" max="100" value="${baseServings}" aria-label="何人分にするか" />
          人分
        </label>
      </div>
      <ul class="ingredient-list"></ul>
    </section>
    <section class="instructions-section">
      <h4 class="detail-section-title">作り方</h4>
      <p class="detail-text instructions-text">${instructions}</p>
    </section>
    <div class="detail-meta">
      <span class="detail-chip">いいね: ${owners.length ? owners.join("、") : "まだなし"}</span>
    </div>
  `;

  const servingsInput = detailContent.querySelector(".detail-servings");
  servingsInput.addEventListener("input", () => {
    const servings = Math.min(100, Math.max(1, Number(servingsInput.value) || 1));
    renderDetailIngredients(recipe, servings);
  });
  renderDetailIngredients(recipe, baseServings);

  const detailImage = detailContent.querySelector(".detail-image");
  if (recipe.image) {
    detailImage.style.backgroundImage = `url("${recipe.image}")`;
    detailImage.style.backgroundPosition = "center";
    detailImage.style.backgroundSize = "cover";
    detailImage.textContent = "";
  }
}

function closeDetailModal() {
  detailModal.classList.add("hidden");
  detailModal.setAttribute("aria-hidden", "true");
}

function closeFavoriteModal() {
  favoriteModal.classList.add("hidden");
  favoriteModal.setAttribute("aria-hidden", "true");
  favoriteNameInput.value = "";
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function formatIngredientLine(line, ratio) {
  const match = line.match(/^\s*(.+?)\s*[:：]\s*(.*?)\s*$/);
  if (!match) return escapeHtml(line);

  const [, name, amount] = match;
  const quantityMatch = amount.match(/^(\d+\/\d+|\d+(?:\.\d+)?)(.*)$/);
  if (!quantityMatch) {
    return `${escapeHtml(name)}: ${escapeHtml(amount)}`;
  }

  const [, quantity, unit] = quantityMatch;
  const numericQuantity = quantity.includes("/")
    ? (() => {
        const [numerator, denominator] = quantity.split("/").map(Number);
        return numerator / denominator;
      })()
    : Number(quantity);
  const scaledQuantity = numericQuantity * ratio;
  const displayQuantity = Number.isInteger(scaledQuantity)
    ? String(scaledQuantity)
    : String(Number(scaledQuantity.toFixed(2)));

  return `${escapeHtml(name)}: ${displayQuantity}${escapeHtml(unit)}`;
}

function renderDetailIngredients(recipe, servings) {
  const ingredients = (recipe.ingredients || "").split("\n").map((line) => line.trim()).filter(Boolean);
  const list = detailContent.querySelector(".ingredient-list");

  if (!ingredients.length) {
    list.innerHTML = "<li>材料はまだ登録されていません。レシピを編集して追加できます。</li>";
    return;
  }

  const baseServings = Math.max(1, Number(recipe.servings) || 2);
  const ratio = servings / baseServings;
  list.innerHTML = ingredients
    .map((line) => `<li>${formatIngredientLine(line, ratio)}</li>`)
    .join("");
}

function enterApp(name) {
  sessionStorage.setItem("cookingAppUser", name);
  signedInUser.textContent = `${name} さん`;
  authScreen.hidden = true;
  appShell.hidden = false;
}

function showAuthScreen() {
  sessionStorage.removeItem("cookingAppUser");
  appShell.hidden = true;
  authScreen.hidden = false;
}

function saveAccounts() {
  localStorage.setItem(STORAGE_KEYS.accounts, JSON.stringify(accounts));
}

async function hashPassword(password, salt) {
  const key = await window.crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await window.crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations: 120000 },
    key,
    256
  );
  return Array.from(new Uint8Array(bits), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function setPasswordVisibility(visible) {
  passwordInput.type = visible ? "text" : "password";
  togglePasswordBtn.classList.toggle("is-visible", visible);
  togglePasswordBtn.setAttribute("aria-label", visible ? "パスワードを隠す" : "パスワードを表示");
  togglePasswordBtn.setAttribute("aria-pressed", String(visible));
}

function showAuthPanel(panel) {
  authTabs.hidden = panel !== "form";
  authForm.hidden = panel !== "form";
  passwordResetPanel.hidden = panel !== "reset";
  recoveryCodePanel.hidden = panel !== "recovery";
  demoNotice.hidden = panel !== "form";
  guestBtn.hidden = panel !== "form";
  authMessage.textContent = "";
  passwordResetMessage.textContent = "";
}

function createRecoveryCode() {
  const bytes = window.crypto.getRandomValues(new Uint8Array(16));
  const code = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("").toUpperCase();
  return code.match(/.{1,8}/g).join("-");
}

async function addRecoveryCode(account) {
  const recoveryCode = createRecoveryCode();
  const recoverySalt = window.crypto.getRandomValues(new Uint8Array(16));
  account.recoverySalt = Array.from(recoverySalt, (byte) => byte.toString(16).padStart(2, "0")).join("");
  account.recoveryHash = await hashPassword(recoveryCode.replace(/-/g, "").toLowerCase(), recoverySalt);
  return recoveryCode;
}

function setAuthMode(signupMode) {
  showAuthPanel("form");
  isSignupMode = signupMode;
  nameField.classList.toggle("hidden", !signupMode);
  nameField.querySelector("input").required = signupMode;
  authTitle.textContent = signupMode ? "アカウントを作成" : "おかえりなさい";
  authSubmitBtn.textContent = signupMode ? "アカウントを作成" : "ログイン";
  passwordInput.autocomplete = signupMode ? "new-password" : "current-password";
  setPasswordVisibility(false);
  document.querySelectorAll(".login-only").forEach((element) => {
    element.hidden = signupMode;
  });
  authMessage.textContent = "";
  loginTab.classList.toggle("active", !signupMode);
  signupTab.classList.toggle("active", signupMode);
  loginTab.setAttribute("aria-pressed", String(!signupMode));
  signupTab.setAttribute("aria-pressed", String(signupMode));
}

function showRecoveryCode(code) {
  authTitle.textContent = "復旧コードを保存";
  authDescription.textContent = "パスワードを忘れたときに必要です。安全な場所に控えてください。";
  recoveryCodeOutput.value = code;
  recoveryCodeSaved.checked = false;
  continueAfterRecoveryBtn.disabled = true;
  showAuthPanel("recovery");
}

function hideRecoveryCode() {
  recoveryCodeOutput.value = "";
  recoveryCodeSaved.checked = false;
  showAuthPanel("form");
  authTitle.textContent = "おかえりなさい";
  authDescription.textContent = "ログインして、今日のレシピを見つけましょう。";
}

togglePasswordBtn.addEventListener("click", () => {
  setPasswordVisibility(passwordInput.type === "password");
});

forgotPasswordBtn.addEventListener("click", () => {
  passwordResetForm.reset();
  showAuthPanel("reset");
  passwordResetForm.elements.email.value = authForm.elements.email.value.trim();
  passwordResetForm.elements.email.focus();
});

cancelPasswordResetBtn.addEventListener("click", () => {
  showAuthPanel("form");
  passwordInput.focus();
});

recoveryCodeSaved.addEventListener("change", () => {
  continueAfterRecoveryBtn.disabled = !recoveryCodeSaved.checked;
});

continueAfterRecoveryBtn.addEventListener("click", () => {
  const name = recoveryCodePanel.dataset.accountName || "ユーザー";
  hideRecoveryCode();
  enterApp(name);
});

passwordResetForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(passwordResetForm);
  const email = formData.get("email").toString().trim().toLowerCase();
  const recoveryCode = formData.get("recoveryCode").toString().replace(/[^a-f0-9]/gi, "").toLowerCase();
  const newPassword = formData.get("newPassword").toString();

  passwordResetForm.querySelector('button[type="submit"]').disabled = true;
  passwordResetMessage.textContent = "復旧コードを確認しています…";

  try {
    const account = accounts.find((item) => item.email === email);
    if (!account || !account.recoverySalt || !account.recoveryHash) {
      passwordResetMessage.textContent = "アカウントまたは復旧コードが確認できません。入力内容をご確認ください。";
      return;
    }

    const recoverySalt = Uint8Array.from(account.recoverySalt.match(/.{2}/g), (byte) => Number.parseInt(byte, 16));
    const recoveryHash = await hashPassword(recoveryCode, recoverySalt);
    if (recoveryHash !== account.recoveryHash) {
      passwordResetMessage.textContent = "アカウントまたは復旧コードが確認できません。入力内容をご確認ください。";
      return;
    }

    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    account.salt = Array.from(salt, (byte) => byte.toString(16).padStart(2, "0")).join("");
    account.passwordHash = await hashPassword(newPassword, salt);
    saveAccounts();
    passwordResetForm.reset();
    showAuthPanel("form");
    setAuthMode(false);
    authMessage.textContent = "パスワードを変更しました。新しいパスワードでログインしてください。";
    authForm.elements.email.value = email;
    passwordInput.focus();
  } catch (error) {
    passwordResetMessage.textContent = `再設定に失敗しました: ${error.message}`;
  } finally {
    passwordResetForm.querySelector('button[type="submit"]').disabled = false;
  }
});

loginTab.addEventListener("click", () => setAuthMode(false));
signupTab.addEventListener("click", () => setAuthMode(true));
guestBtn.addEventListener("click", () => enterApp("ゲスト"));
logoutBtn.addEventListener("click", showAuthScreen);

authForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(authForm);
  const email = formData.get("email").toString().trim().toLowerCase();
  const password = formData.get("password").toString();
  const signupMode = isSignupMode;

  authSubmitBtn.disabled = true;
  loginTab.disabled = true;
  signupTab.disabled = true;
  authMessage.textContent = signupMode ? "アカウントを作成しています…" : "ログインしています…";

  try {
    if (signupMode) {
      if (accounts.some((account) => account.email === email)) {
        authMessage.textContent = "このメールアドレスは登録済みです。ログインしてください。";
        return;
      }

      const salt = window.crypto.getRandomValues(new Uint8Array(16));
      const name = formData.get("name").toString().trim();
      const account = {
        email,
        name,
        salt: Array.from(salt, (byte) => byte.toString(16).padStart(2, "0")).join(""),
        passwordHash: await hashPassword(password, salt)
      };
      const recoveryCode = await addRecoveryCode(account);
      accounts.push(account);
      saveAccounts();
      recoveryCodePanel.dataset.accountName = name;
      showRecoveryCode(recoveryCode);
      return;
    }

    const account = accounts.find((item) => item.email === email);
    if (!account) {
      authMessage.textContent = "アカウントが見つかりません。メールアドレスを確認するか、新規登録してください。";
      return;
    }

    const salt = Uint8Array.from(account.salt.match(/.{2}/g), (byte) => Number.parseInt(byte, 16));
    const passwordHash = await hashPassword(password, salt);
    if (passwordHash !== account.passwordHash) {
      authMessage.textContent = "パスワードが違います。入力内容をご確認ください。";
      return;
    }

    if (!account.recoverySalt || !account.recoveryHash) {
      const recoveryCode = await addRecoveryCode(account);
      saveAccounts();
      recoveryCodePanel.dataset.accountName = account.name || email.split("@")[0];
      showRecoveryCode(recoveryCode);
      return;
    }

    enterApp(account.name || email.split("@")[0]);
  } catch (error) {
    authMessage.textContent = `処理に失敗しました: ${error.message}`;
  } finally {
    authSubmitBtn.disabled = false;
    loginTab.disabled = false;
    signupTab.disabled = false;
  }
});

searchInput.addEventListener("input", renderRecipes);

categoryFilters.addEventListener("click", (event) => {
  const button = event.target.closest(".filter-btn");
  if (!button) return;

  selectedCategory = button.dataset.category;

  categoryFilters.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.toggle("active", btn === button);
  });

  renderRecipes();
});

randomRecipeBtn.addEventListener("click", () => {
  const random = recipes[Math.floor(Math.random() * recipes.length)];
  searchInput.value = random.title;
  selectedCategory = "all";
  categoryFilters.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.category === "all");
  });
  renderRecipes();
});

requestForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(requestForm);
  const request = {
    requester: (formData.get("requester") || "家族").toString().trim(),
    recipeName: (formData.get("recipeName") || "レシピ").toString().trim(),
    message: (formData.get("message") || "").toString().trim()
  };

  if (!request.requester || !request.recipeName) return;

  requests.push(request);
  saveRequests();
  renderRequests();
  requestForm.reset();
});

function readImageAsDataUrl(file) {
  if (!file) return Promise.resolve("");

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result.toString()));
    reader.addEventListener("error", reject);
    reader.readAsDataURL(file);
  });
}

recipeForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(recipeForm);
  const currentId = Number(formData.get("id") || Date.now());
  const existingRecipe = recipes.find((item) => item.id === currentId);
  const imageFile = formData.get("imageFile");

  if (imageFile instanceof File && imageFile.size > 5 * 1024 * 1024) {
    window.alert("写真は5MB以内にしてください。");
    return;
  }

  const selectedImage = imageFile instanceof File && imageFile.size
    ? await readImageAsDataUrl(imageFile)
    : existingRecipe?.image || "";

  const recipe = {
    id: currentId,
    title: formData.get("title").toString().trim(),
    category: formData.get("category").toString(),
    time: formData.get("time").toString().trim(),
    difficulty: formData.get("difficulty").toString(),
    icon: formData.get("icon").toString().trim() || "🍽️",
    description: formData.get("description").toString().trim(),
    servings: Number(formData.get("servings")),
    ingredients: formData.get("ingredients").toString().trim(),
    instructions: formData.get("instructions").toString().trim(),
    image: selectedImage,
    color: "linear-gradient(135deg, #ffd9aa, #f3a55a 60%, #d06c2e)"
  };

  if (!recipe.title || !recipe.time || !recipe.description || !recipe.instructions) return;

  const existingIndex = recipes.findIndex((item) => item.id === recipe.id);

  if (existingIndex >= 0) {
    recipes[existingIndex] = { ...recipes[existingIndex], ...recipe };
  } else {
    recipes.unshift({ ...recipe, id: Date.now() });
  }

  saveRecipes();
  closeRecipeModal();
  renderRecipes();
});

favoriteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const recipeId = Number(favoriteForm.dataset.recipeId);
  const safeName = (favoriteNameInput.value || "家族").trim() || "家族";
  const targetIndex = favorites.findIndex((item) => item.recipeId === recipeId && item.name === safeName);

  if (targetIndex >= 0) {
    favorites.splice(targetIndex, 1);
  } else {
    favorites.push({ recipeId, name: safeName });
  }

  saveFavorites();
  renderFavorites();
  renderRecipes();
  closeFavoriteModal();
});

manageRecipeBtn.addEventListener("click", () => openRecipeModal());
closeModalBtn.addEventListener("click", closeRecipeModal);
cancelRecipeBtn.addEventListener("click", closeRecipeModal);
closeDetailModalBtn.addEventListener("click", closeDetailModal);
closeFavoriteModalBtn.addEventListener("click", closeFavoriteModal);
cancelFavoriteBtn.addEventListener("click", closeFavoriteModal);

recipeModal.addEventListener("click", (event) => {
  if (event.target.dataset.close === "true") {
    closeRecipeModal();
  }
});

detailModal.addEventListener("click", (event) => {
  if (event.target.dataset.closeDetail === "true") {
    closeDetailModal();
  }
});

favoriteModal.addEventListener("click", (event) => {
  if (event.target.dataset.closeFavorite === "true") {
    closeFavoriteModal();
  }
});

renderFavorites();
renderRequests();
renderRecipes();

const currentUser = sessionStorage.getItem("cookingAppUser");
if (currentUser) {
  enterApp(currentUser);
}
