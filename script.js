const STORAGE_KEYS = {
  recipes: "cookingAppRecipes",
  favorites: "cookingAppFavorites",
  requests: "cookingAppRequests"
};

const seedRecipes = [
  {
    id: 1,
    title: "和風玉子焼き",
    category: "和食",
    time: "15分",
    difficulty: "初級",
    description: "ふわっとした卵とおかず野菜を合わせた、朝食にぴったりの定番料理です。",
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
const favoriteList = document.getElementById("favoriteList");
const favoriteBadge = document.getElementById("favoriteBadge");
const requestForm = document.getElementById("requestForm");
const requestList = document.getElementById("requestList");
const recipeModal = document.getElementById("recipeModal");
const recipeForm = document.getElementById("recipeForm");
const manageRecipeBtn = document.getElementById("manageRecipeBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelRecipeBtn = document.getElementById("cancelRecipeBtn");

let recipes = JSON.parse(localStorage.getItem(STORAGE_KEYS.recipes) || "null") || seedRecipes;
let favorites = JSON.parse(localStorage.getItem(STORAGE_KEYS.favorites) || "[]");
let requests = JSON.parse(localStorage.getItem(STORAGE_KEYS.requests) || "[]");
let selectedCategory = "all";

function saveRecipes() {
  localStorage.setItem(STORAGE_KEYS.recipes, JSON.stringify(recipes));
}

function saveFavorites() {
  localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
}

function saveRequests() {
  localStorage.setItem(STORAGE_KEYS.requests, JSON.stringify(requests));
}

function renderFavorites() {
  const favoriteRecipes = recipes.filter((recipe) => favorites.includes(recipe.id));
  favoriteBadge.textContent = String(favoriteRecipes.length);

  if (!favoriteRecipes.length) {
    favoriteList.innerHTML = "<li>まだお気に入りがありません</li>";
    return;
  }

  favoriteList.innerHTML = favoriteRecipes
    .map(
      (recipe) => `
        <li>
          <strong>${recipe.icon} ${recipe.title}</strong><br />
          ${recipe.category} / ${recipe.time}
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

  requestList.innerHTML = requests
    .slice()
    .reverse()
    .map(
      (request) => `
        <li>
          <strong>${request.requester}</strong>さんのリクエスト<br />
          ${request.recipeName}<br />
          <small>${request.message || "メモなし"}</small>
        </li>
      `
    )
    .join("");
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
    title.textContent = recipe.title;
    description.textContent = recipe.description;
    category.textContent = recipe.category;
    time.textContent = recipe.time;
    difficulty.textContent = `難易度: ${recipe.difficulty}`;

    if (favorites.includes(recipe.id)) {
      favoriteBtn.classList.add("active");
      favoriteBtn.textContent = "♥";
    } else {
      favoriteBtn.textContent = "♡";
    }

    favoriteBtn.addEventListener("click", () => {
      const index = favorites.indexOf(recipe.id);

      if (index >= 0) {
        favorites.splice(index, 1);
      } else {
        favorites.push(recipe.id);
      }

      saveFavorites();
      renderFavorites();
      renderRecipes();
    });

    card.querySelector(".mini-btn").addEventListener("click", () => {
      alert(`${recipe.title}\n\n${recipe.description}\n\n時間: ${recipe.time}\n難易度: ${recipe.difficulty}`);
    });

    editBtn.addEventListener("click", () => openRecipeModal(recipe));

    deleteBtn.addEventListener("click", () => {
      if (window.confirm(`${recipe.title} を削除しますか？`)) {
        recipes = recipes.filter((item) => item.id !== recipe.id);
        favorites = favorites.filter((id) => id !== recipe.id);
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

  if (!recipe) {
    recipeForm.reset();
    recipeForm.elements.id.value = "";
    recipeForm.elements.category.value = "和食";
    recipeForm.elements.difficulty.value = "初級";
    recipeForm.elements.icon.value = "🍽️";
    return;
  }

  recipeForm.elements.id.value = recipe.id;
  recipeForm.elements.title.value = recipe.title;
  recipeForm.elements.category.value = recipe.category;
  recipeForm.elements.time.value = recipe.time;
  recipeForm.elements.difficulty.value = recipe.difficulty;
  recipeForm.elements.icon.value = recipe.icon;
  recipeForm.elements.description.value = recipe.description;
}

function closeRecipeModal() {
  recipeModal.classList.add("hidden");
  recipeModal.setAttribute("aria-hidden", "true");
}

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

recipeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(recipeForm);
  const recipe = {
    id: Number(formData.get("id") || Date.now()),
    title: formData.get("title").toString().trim(),
    category: formData.get("category").toString(),
    time: formData.get("time").toString().trim(),
    difficulty: formData.get("difficulty").toString(),
    icon: formData.get("icon").toString().trim() || "🍽️",
    description: formData.get("description").toString().trim(),
    color: "linear-gradient(135deg, #ffd9aa, #f3a55a 60%, #d06c2e)"
  };

  if (!recipe.title || !recipe.time || !recipe.description) return;

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

manageRecipeBtn.addEventListener("click", () => openRecipeModal());
closeModalBtn.addEventListener("click", closeRecipeModal);
cancelRecipeBtn.addEventListener("click", closeRecipeModal);
recipeModal.addEventListener("click", (event) => {
  if (event.target.dataset.close === "true") {
    closeRecipeModal();
  }
});

renderFavorites();
renderRequests();
renderRecipes();
