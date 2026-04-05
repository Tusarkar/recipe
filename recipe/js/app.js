(function () {
  "use strict";

  var RECIPES = [
    {
      id: "margherita-fire",
      title: "Wood-Fired Margherita",
      tag: "Dinner",
      category: "dinner",
      time: "45 min · serves 2",
      image: "assets/images/pizza.jpg",
      featured: true,
      description:
        "Charred crust, milky mozzarella, and basil that hits right when the pie leaves the heat. No fancy oven required — a ripping hot steel or stone does the trick.",
      ingredients: [
        "250 g pizza dough, room temperature",
        "80 ml tomato passata",
        "1 garlic clove, grated",
        "120 g fresh mozzarella, torn",
        "6–8 basil leaves",
        "Extra-virgin olive oil, flaky salt",
      ],
      steps: [
        "Heat your oven as high as it goes with a steel or stone inside — 30+ minutes preheat.",
        "Stretch dough gently into a 28–30 cm round; avoid crushing the rim.",
        "Spread passata mixed with garlic; top with mozzarella.",
        "Bake until the crust blisters and cheese bubbles, 7–10 minutes.",
        "Finish with basil, a drizzle of oil, and salt.",
      ],
    },
    {
      id: "smash-n-sizzle",
      title: "Smash & Sizzle Burger",
      tag: "Lunch",
      category: "lunch",
      time: "25 min · serves 2",
      image: "assets/images/burger.jpg",
      featured: false,
      description:
        "Thin, craggy patties with a deep crust — the kind of burger that sounds like dinner when it hits the pan.",
      ingredients: [
        "400 g ground beef (20% fat)",
        "4 soft potato buns",
        "4 slices aged cheddar",
        "Pickles, thinly sliced",
        "Mayo, mustard, thin onion",
        "Neutral oil for the pan",
      ],
      steps: [
        "Divide beef into 100 g balls; keep cold until cooking.",
        "Heat a cast-iron skillet until smoking; add a thin film of oil.",
        "Smash balls flat with a spatula; season aggressively.",
        "Cook 2 minutes undisturbed, flip, add cheese, cover briefly.",
        "Toast buns; assemble with condiments and pickles.",
      ],
    },
    {
      id: "lemon-garlic-strands",
      title: "Lemon Garlic Strands",
      tag: "Dinner",
      category: "dinner",
      time: "30 min · serves 3",
      image: "assets/images/pasta.jpg",
      featured: false,
      description:
        "Bright citrus, soft garlic, and pasta water emulsified into a silky sauce — weeknight luxury without the fuss.",
      ingredients: [
        "320 g spaghetti or linguine",
        "4 tbsp extra-virgin olive oil",
        "4 garlic cloves, sliced thin",
        "1 lemon — zest + 3 tbsp juice",
        "Parmesan, black pepper, parsley",
      ],
      steps: [
        "Boil pasta in well-salted water until almost al dente; reserve 200 ml water.",
        "Gently cook garlic in oil until golden at the edges.",
        "Add pasta, a splash of water, toss; emulsify with more water as needed.",
        "Off heat: lemon zest and juice, cheese, pepper, parsley.",
      ],
    },
    {
      id: "sunrise-stack",
      title: "Sunrise Fluff Stack",
      tag: "Breakfast",
      category: "breakfast",
      time: "35 min · serves 2",
      image: "assets/images/pancakes.jpg",
      featured: false,
      description:
        "Tall, tender pancakes with a crisp ring — buttermilk tang optional if you substitute yogurt and milk.",
      ingredients: [
        "200 g all-purpose flour",
        "2 tsp baking powder, ½ tsp salt, 1 tbsp sugar",
        "300 ml buttermilk (or 200 g yogurt + 100 ml milk)",
        "1 egg, 2 tbsp melted butter",
        "Butter for the griddle, maple syrup",
      ],
      steps: [
        "Whisk dry; whisk wet separately; combine until just mixed — lumps are fine.",
        "Rest batter 10 minutes while the griddle heats to medium.",
        "Pour ¼ cup rounds; flip when bubbles set at the edges.",
        "Stack, butter between layers, syrup on top.",
      ],
    },
    {
      id: "ember-grain-bowl",
      title: "Ember Grain Bowl",
      tag: "Lunch",
      category: "lunch",
      time: "40 min · serves 2",
      image: "assets/images/bowl-salad.jpg",
      featured: false,
      description:
        "Roasted vegetables, chewy grains, and a sharp dressing — lunch that still feels like a meal.",
      ingredients: [
        "150 g farro or quinoa, cooked",
        "2 cups roasted seasonal veg",
        "1 cup chickpeas, crisped in oil",
        "Handful greens",
        "Dressing: lemon, tahini, garlic, salt",
      ],
      steps: [
        "Roast vegetables at 220°C until caramelized.",
        "Whisk dressing with a splash of water to thin.",
        "Toss grains with half the dressing; top with veg and chickpeas.",
        "Finish with greens and more dressing.",
      ],
    },
  ];

  var STORAGE_KEY = "copperCodexFavorites";
  var grid = document.getElementById("recipeGrid");
  var modal = document.getElementById("recipeModal");
  var filter = "all";
  var favorites = loadFavorites();

  function loadFavorites() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveFavorites() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {}
  }

  function openModal(recipe) {
    document.getElementById("modalImg").src = recipe.image;
    document.getElementById("modalImg").alt = recipe.title;
    document.getElementById("modalMeta").textContent =
      recipe.tag + " · " + recipe.time;
    document.getElementById("modalTitle").textContent = recipe.title;
    document.getElementById("modalDesc").textContent = recipe.description;

    var ing = document.getElementById("modalIngredients");
    ing.innerHTML = "";
    recipe.ingredients.forEach(function (line) {
      var li = document.createElement("li");
      li.textContent = line;
      ing.appendChild(li);
    });

    var st = document.getElementById("modalSteps");
    st.innerHTML = "";
    recipe.steps.forEach(function (line) {
      var li = document.createElement("li");
      li.textContent = line;
      st.appendChild(li);
    });

    modal.hidden = false;
    document.body.style.overflow = "hidden";
    document.getElementById("modalTitle").focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  function toggleFavorite(id, btn) {
    if (favorites[id]) {
      delete favorites[id];
    } else {
      favorites[id] = true;
    }
    saveFavorites();
    if (btn) {
      btn.setAttribute("aria-pressed", favorites[id] ? "true" : "false");
      btn.textContent = favorites[id] ? "★" : "☆";
      btn.title = favorites[id] ? "Remove from favorites" : "Add to favorites";
    }
  }

  function renderGrid() {
    grid.innerHTML = "";
    RECIPES.forEach(function (recipe) {
      var show =
        filter === "all" ||
        recipe.category === filter;

      var card = document.createElement("article");
      card.className = "card" + (recipe.featured ? " card--featured" : "");
      if (!show) {
        card.classList.add("card--hidden");
      }
      card.setAttribute("role", "button");
      card.tabIndex = 0;
      card.setAttribute("aria-label", "Open recipe: " + recipe.title);

      function openThis() {
        openModal(recipe);
      }

      card.addEventListener("click", function (e) {
        if (e.target.closest(".card__fav")) {
          return;
        }
        openThis();
      });

      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openThis();
        }
      });

      var wrap = document.createElement("div");
      wrap.className = "card__img-wrap";
      var img = document.createElement("img");
      img.src = recipe.image;
      img.alt = "";
      img.loading = "lazy";
      img.width = 400;
      img.height = 300;
      wrap.appendChild(img);

      var fav = document.createElement("button");
      fav.type = "button";
      fav.className = "card__fav";
      fav.setAttribute("aria-label", "Favorite");
      fav.setAttribute("aria-pressed", favorites[recipe.id] ? "true" : "false");
      fav.textContent = favorites[recipe.id] ? "★" : "☆";
      fav.title = favorites[recipe.id] ? "Remove from favorites" : "Add to favorites";
      fav.addEventListener("click", function (e) {
        e.stopPropagation();
        toggleFavorite(recipe.id, fav);
      });
      wrap.appendChild(fav);

      var body = document.createElement("div");
      body.className = "card__body";
      var tag = document.createElement("p");
      tag.className = "card__tag";
      tag.textContent = recipe.tag;
      var title = document.createElement("h3");
      title.className = "card__title";
      title.textContent = recipe.title;
      var time = document.createElement("p");
      time.className = "card__time";
      time.textContent = recipe.time;
      body.appendChild(tag);
      body.appendChild(title);
      body.appendChild(time);

      card.appendChild(wrap);
      card.appendChild(body);

      grid.appendChild(card);
    });
  }

  function setFilter(cat) {
    filter = cat;
    document.querySelectorAll(".chip").forEach(function (c) {
      var active = c.getAttribute("data-filter") === cat;
      c.classList.toggle("chip--active", active);
      c.setAttribute("aria-selected", active ? "true" : "false");
    });
    renderGrid();
  }

  function randomRecipe() {
    var i = Math.floor(Math.random() * RECIPES.length);
    return RECIPES[i];
  }

  function showTonight(recipe) {
    var preview = document.getElementById("tonightPreview");
    document.getElementById("tonightTitle").textContent = "Tonight: " + recipe.title;
    document.getElementById("tonightBlurb").textContent = recipe.description;
    document.getElementById("tonightImg").src = recipe.image;
    document.getElementById("tonightImg").alt = recipe.title;
    document.getElementById("tonightName").textContent = recipe.title;
    preview.hidden = false;

    var openBtn = document.getElementById("btnOpenTonight");
    openBtn.onclick = function () {
      openModal(recipe);
    };
  }

  document.querySelectorAll(".chip").forEach(function (chip) {
    chip.addEventListener("click", function () {
      setFilter(chip.getAttribute("data-filter"));
    });
  });

  document.getElementById("btnSurprise").addEventListener("click", function () {
    openModal(randomRecipe());
  });

  document.getElementById("btnSpin").addEventListener("click", function () {
    showTonight(randomRecipe());
  });

  document.getElementById("btnScrollTonight").addEventListener("click", function () {
    document.getElementById("tonight").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var href = anchor.getAttribute("href");
      if (!href || href.length < 2 || href === "#") {
        return;
      }
      var target;
      try {
        target = document.querySelector(href);
      } catch (err) {
        return;
      }
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        if (history.replaceState) {
          history.replaceState(null, "", href);
        }
        if (typeof target.focus === "function") {
          target.focus({ preventScroll: true });
        }
      }
    });
  });

  var contactForm = document.getElementById("contactForm");
  var contactFeedback = document.getElementById("contactFeedback");
  if (contactForm && contactFeedback) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("contactName");
      var email = document.getElementById("contactEmail");
      var message = document.getElementById("contactMessage");
      if (!name || !email || !message) {
        return;
      }
      if (!contactForm.checkValidity()) {
        contactFeedback.hidden = false;
        contactFeedback.classList.add("is-error");
        contactFeedback.textContent = "Please fill in name, email, and message.";
        return;
      }
      contactFeedback.classList.remove("is-error");
      contactFeedback.hidden = false;
      contactFeedback.textContent =
        "Thanks, " +
        name.value.trim() +
        " — your note is ready to copy or send. (Static sites cannot email by themselves; use your mail app or replace this with a form service.)";
      contactForm.reset();
    });
  }

  modal.querySelectorAll("[data-close-modal]").forEach(function (el) {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  renderGrid();
  showTonight(randomRecipe());
})();
