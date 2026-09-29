// ========================================================
// Thanksgiving Afro-Bénin - Interactive Application Logic
// Couleurs sobres, aucun dégradé, aucun toast, aucun émoji
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
  // Cart state persisted in localStorage
  let amazonCart = JSON.parse(localStorage.getItem('afrofeast_amazon_cart') || '[]');
  let currentFilter = 'all';

  // DOM Elements
  const mainCoursesGrid = document.getElementById('main-courses-grid');
  const dessertSideContainer = document.getElementById('dessert-side-container');
  const amazonProductsContainer = document.getElementById('amazon-products-container');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const searchInput = document.getElementById('recipe-search');
  const cartCounter = document.getElementById('cart-counter');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartDrawerList = document.getElementById('cart-drawer-list');
  const cartDrawerTotal = document.getElementById('cart-drawer-total');
  const openCartBtn = document.getElementById('open-cart-btn');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const recipeModal = document.getElementById('recipe-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalRecipeContent = document.getElementById('modal-recipe-content');
  const askExpertBtn = document.getElementById('ask-expert-btn');
  const newsletterForm = document.getElementById('newsletter-form');
  const checkoutAllBtn = document.getElementById('amazon-checkout-all-btn');

  initApp();

  function initApp() {
    renderMainCourses();
    renderDesserts();
    renderAmazonProducts();
    updateCartUI();
    setupEventListeners();
  }

  // Render Sub-dishes (Just specify the price cleanly, no repeated 'Acheter le plat' button)
  function renderMainCourses() {
    if (!mainCoursesGrid) return;

    const items = RECIPES_DATA.filter(recipe => {
      if (recipe.id === 'dinde-laquee' || recipe.category === 'desserts') return false;
      if (currentFilter !== 'all' && recipe.category !== currentFilter) return false;
      return true;
    });

    mainCoursesGrid.innerHTML = items.map(recipe => {
      const tool = recipe.amazonProducts && recipe.amazonProducts[0];
      const priceText = tool ? tool.priceFCFA : 'Prix sur Amazon';

      return `
        <article class="mini-dish-card">
          <img src="${recipe.image}" alt="${recipe.title}" class="mini-dish-img" loading="lazy">
          <div class="mini-dish-content">
            <div class="mini-dish-rating">
              <span>★★★★★</span> (${recipe.reviewsCount})
            </div>
            <h4 class="mini-dish-title">${recipe.title}</h4>
            <p class="dish-desc" style="font-size:0.84rem; margin-bottom:12px;">${recipe.description}</p>
            
            <div class="mini-dish-price-row">
              <span class="clean-price-tag">${priceText}</span>
              <button class="btn btn-outline view-recipe-btn" data-id="${recipe.id}" style="padding: 6px 14px; font-size: 0.8rem;">
                Voir Recette
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    bindRecipeButtons();
  }

  // Render Desserts (Side column)
  function renderDesserts() {
    if (!dessertSideContainer) return;

    const dessertItems = RECIPES_DATA.filter(r => r.category === 'desserts' && r.id !== 'tarte-potiron-coco');

    dessertSideContainer.innerHTML = dessertItems.map(recipe => {
      const tool = recipe.amazonProducts && recipe.amazonProducts[0];
      const priceText = tool ? tool.priceFCFA : 'Prix sur Amazon';

      return `
        <article class="dessert-horizontal-card">
          <img src="${recipe.image}" alt="${recipe.title}" class="dessert-horizontal-img" loading="lazy">
          <div class="dessert-horizontal-body">
            <div class="dish-rating">
              <span class="stars">★★★★★</span>
              <span class="review-count">(${recipe.reviewsCount} avis)</span>
            </div>
            <h4 class="dessert-horizontal-title">${recipe.title}</h4>
            <p class="dish-desc" style="font-size:0.82rem; margin-bottom:8px;">${recipe.description}</p>
            
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:auto;">
              <span class="clean-price-tag">${priceText}</span>
              <button class="btn btn-outline view-recipe-btn" data-id="${recipe.id}" style="padding: 5px 12px; font-size: 0.78rem;">
                Détails
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    bindRecipeButtons();
  }

  // Render Dedicated Amazon Affiliate Product Cards
  function renderAmazonProducts() {
    if (!amazonProductsContainer) return;

    amazonProductsContainer.innerHTML = AMAZON_FEATURED_PRODUCTS.map(product => {
      return `
        <article class="amazon-product-card">
          <div class="product-img-box">
            <img src="${product.image}" alt="${product.title}" loading="lazy">
            <span class="discount-tag">${product.discount}</span>
            <span class="product-meta-badge">${product.badge}</span>
          </div>

          <div class="product-card-body">
            <span class="product-brand">${product.brand}</span>
            <h3 class="product-title">${product.title}</h3>
            
            <div class="dish-rating" style="margin-bottom:8px;">
              <span class="stars">★★★★★</span>
              <span class="review-count">${product.reviews} avis vérifiés</span>
            </div>

            <p class="product-desc">${product.description}</p>

            <div class="product-price-row">
              <span class="current-price">${product.priceFCFA}</span>
            </div>

            <div class="product-card-actions">
              <a href="${product.amazonUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-amazon-buy" style="flex:1;">
                Acheter sur Amazon
              </a>
              <button class="btn-add-wishlist" data-product-id="${product.id}" title="Ajouter à ma liste d'achats">
                + Panier
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    document.querySelectorAll('.btn-add-wishlist').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const prodId = e.target.getAttribute('data-product-id');
        addToAmazonCart(prodId);
      });
    });
  }

  // Event Listeners
  function setupEventListeners() {
    // Category Tabs Filtering
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentFilter = tab.getAttribute('data-filter');
        
        const featuredTurkey = document.getElementById('featured-dish-turkey');
        if (featuredTurkey) {
          featuredTurkey.style.display = (currentFilter === 'all' || currentFilter === 'poultry') ? 'block' : 'none';
        }

        renderMainCourses();
      });
    });

    // Quick Category Strip Cards click
    document.querySelectorAll('.cat-card').forEach(card => {
      card.addEventListener('click', () => {
        const cat = card.getAttribute('data-category');
        const targetTab = document.querySelector(`.filter-tab[data-filter="${cat}"]`);
        if (targetTab) {
          targetTab.click();
          document.getElementById('recettes')?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Live Search
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        filterRecipesAndProducts(query);
      });
    }

    // Cart Drawer Open/Close
    if (openCartBtn) {
      openCartBtn.addEventListener('click', openCart);
    }
    if (closeCartBtn) {
      closeCartBtn.addEventListener('click', closeCart);
    }
    if (cartDrawer) {
      cartDrawer.addEventListener('click', (e) => {
        if (e.target === cartDrawer) closeCart();
      });
    }

    // Modal Close
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeModal);
    }
    if (recipeModal) {
      recipeModal.addEventListener('click', (e) => {
        if (e.target === recipeModal) closeModal();
      });
    }

    // Ask Expert Button
    if (askExpertBtn) {
      askExpertBtn.addEventListener('click', () => {
        prompt("Posez votre question culinaire ou nutrition à la Cheffe Aminata :");
      });
    }

    // Newsletter Form
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Votre Guide de Recettes et Liens Amazon a été envoyé par email.');
        newsletterForm.reset();
      });
    }

    // Master Checkout Button in Cart Drawer
    if (checkoutAllBtn) {
      checkoutAllBtn.addEventListener('click', () => {
        if (amazonCart.length === 0) return;
        window.open(`https://www.amazon.fr/gp/cart/view.html?tag=thanksgivingbj-21`, '_blank');
      });
    }

    // Quick links in footer
    document.querySelectorAll('.quick-recipe-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const id = link.getAttribute('data-id');
        openRecipeModal(id);
      });
    });
  }

  // Search Filter
  function filterRecipesAndProducts(query) {
    if (!query) {
      renderMainCourses();
      renderDesserts();
      renderAmazonProducts();
      return;
    }

    const matchingRecipes = RECIPES_DATA.filter(r => 
      r.title.toLowerCase().includes(query) || 
      r.description.toLowerCase().includes(query) ||
      r.ingredients.some(ing => ing.toLowerCase().includes(query))
    );

    if (mainCoursesGrid) {
      if (matchingRecipes.length === 0) {
        mainCoursesGrid.innerHTML = `<p style="grid-column: 1/-1; padding: 24px; text-align: center; color: var(--text-muted);">Aucune recette trouvée pour "${query}".</p>`;
      } else {
        mainCoursesGrid.innerHTML = matchingRecipes.map(recipe => {
          const tool = recipe.amazonProducts && recipe.amazonProducts[0];
          const priceText = tool ? tool.priceFCFA : 'Prix sur Amazon';

          return `
            <article class="mini-dish-card">
              <img src="${recipe.image}" alt="${recipe.title}" class="mini-dish-img" loading="lazy">
              <div class="mini-dish-content">
                <h4 class="mini-dish-title">${recipe.title}</h4>
                <p class="dish-desc" style="font-size:0.84rem; margin-bottom:12px;">${recipe.description}</p>
                <div class="mini-dish-price-row">
                  <span class="clean-price-tag">${priceText}</span>
                  <button class="btn btn-outline view-recipe-btn" data-id="${recipe.id}">
                    Voir Recette
                  </button>
                </div>
              </div>
            </article>
          `;
        }).join('');
        bindRecipeButtons();
      }
    }
  }

  // Recipe Modal Logic
  function bindRecipeButtons() {
    document.querySelectorAll('.view-recipe-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        openRecipeModal(id);
      });
    });
  }

  function openRecipeModal(recipeId) {
    const recipe = RECIPES_DATA.find(r => r.id === recipeId);
    if (!recipe || !modalRecipeContent) return;

    modalRecipeContent.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; margin-bottom: 24px;">
        <img src="${recipe.image}" alt="${recipe.title}" style="width: 100%; height: 250px; object-fit: cover; border-radius: var(--radius-md);">
        <div>
          <span class="dish-badge" style="position:static; display:inline-block; margin-bottom: 10px;">${recipe.categoryLabel}</span>
          <h2 style="font-size: 1.6rem; margin-bottom: 8px;">${recipe.title}</h2>
          <div class="dish-rating" style="margin-bottom: 10px;">
            <span class="stars">★★★★★</span>
            <span class="review-count">${recipe.reviewsCount} avis</span>
          </div>
          <p style="font-size: 0.92rem; color: var(--text-secondary); margin-bottom: 14px;">${recipe.description}</p>
          <div style="display: flex; gap: 14px; font-size: 0.85rem; font-weight: 600; color: var(--text-main);">
            <span>Préparation : ${recipe.prepTime}</span>
            <span>Cuisson : ${recipe.cookTime}</span>
            <span>Niveau : ${recipe.difficulty}</span>
          </div>
        </div>
      </div>

      <!-- Equipment Box inside Modal -->
      ${recipe.amazonProducts && recipe.amazonProducts.length > 0 ? `
        <div style="background-color: var(--bg-primary); border: 1px solid var(--border-card); border-radius: var(--radius-md); padding: 16px; margin-bottom: 24px;">
          <h4 style="font-size: 1rem; color: var(--text-main); margin-bottom: 10px;">
            Ustensiles recommandés sur Amazon pour réussir ce plat
          </h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${recipe.amazonProducts.map(prod => `
              <div style="display: flex; justify-content: space-between; align-items: center; background: #FFF; padding: 10px 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-light);">
                <div>
                  <strong style="font-size: 0.88rem;">${prod.name}</strong>
                  <span style="display: block; font-size: 0.8rem; color: var(--accent-red); font-weight: 700;">${prod.priceFCFA}</span>
                </div>
                <a href="${prod.amazonUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-amazon-buy" style="padding: 7px 14px; font-size: 0.8rem;">
                  Acheter sur Amazon
                </a>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div style="display: grid; grid-template-columns: 1fr 1.3fr; gap: 24px;">
        <div>
          <h4 style="font-size: 1.1rem; margin-bottom: 12px; border-bottom: 1px solid var(--border-card); padding-bottom: 6px;">Ingrédients</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px;">
            ${recipe.ingredients.map(ing => `
              <li style="font-size: 0.88rem; padding: 4px 0; border-bottom: 1px solid var(--border-light);">
                • ${ing}
              </li>
            `).join('')}
          </ul>
        </div>

        <div>
          <h4 style="font-size: 1.1rem; margin-bottom: 12px; border-bottom: 1px solid var(--border-card); padding-bottom: 6px;">Étapes de Préparation</h4>
          <ol style="padding-left: 18px; display: flex; flex-direction: column; gap: 10px;">
            ${recipe.instructions.map(step => `
              <li style="font-size: 0.88rem; line-height: 1.6; color: var(--text-secondary);">${step}</li>
            `).join('')}
          </ol>
        </div>
      </div>
    `;

    recipeModal.classList.add('active');
    recipeModal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    if (recipeModal) {
      recipeModal.classList.remove('active');
      recipeModal.setAttribute('aria-hidden', 'true');
    }
  }

  // Cart / Shopping List Drawer
  function addToAmazonCart(productId) {
    const product = AMAZON_FEATURED_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    if (!amazonCart.some(item => item.id === productId)) {
      amazonCart.push(product);
      localStorage.setItem('afrofeast_amazon_cart', JSON.stringify(amazonCart));
      updateCartUI();
    }
  }

  function removeFromCart(productId) {
    amazonCart = amazonCart.filter(item => item.id !== productId);
    localStorage.setItem('afrofeast_amazon_cart', JSON.stringify(amazonCart));
    updateCartUI();
  }

  function updateCartUI() {
    if (cartCounter) {
      cartCounter.textContent = amazonCart.length;
    }

    if (!cartDrawerList) return;

    if (amazonCart.length === 0) {
      cartDrawerList.innerHTML = `
        <div style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
          <p>Votre liste d'ustensiles est vide.</p>
        </div>
      `;
      if (cartDrawerTotal) cartDrawerTotal.textContent = '0 FCFA';
      return;
    }

    cartDrawerList.innerHTML = amazonCart.map(item => {
      return `
        <div class="cart-item-row">
          <div class="cart-item-info">
            <strong>${item.title.slice(0, 32)}...</strong>
            <span class="cart-item-price">${item.priceFCFA}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <a href="${item.amazonUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-amazon-buy" style="padding: 5px 10px; font-size: 0.75rem;">
              Acheter
            </a>
            <button class="remove-cart-item-btn" data-id="${item.id}" style="color: var(--text-muted); font-size: 1rem; padding: 4px;" title="Retirer">
              ✕
            </button>
          </div>
        </div>
      `;
    }).join('');

    const totalFCFA = amazonCart.reduce((sum, item) => {
      const val = parseInt(item.priceFCFA.replace(/[^0-9]/g, ''), 10) || 0;
      return sum + val;
    }, 0);
    if (cartDrawerTotal) cartDrawerTotal.textContent = `${totalFCFA.toLocaleString('fr-FR')} FCFA`;

    document.querySelectorAll('.remove-cart-item-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        removeFromCart(id);
      });
    });
  }

  function openCart() {
    if (cartDrawer) {
      cartDrawer.classList.add('active');
      cartDrawer.setAttribute('aria-hidden', 'false');
    }
  }

  function closeCart() {
    if (cartDrawer) {
      cartDrawer.classList.remove('active');
      cartDrawer.setAttribute('aria-hidden', 'true');
    }
  }
});
