// ========================================================
// Thanksgiving Afro-Bénin - Interactive Application Logic
// Affiliate Optimization & Conversion Engine
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
  // State
  let currentCurrency = 'FCFA'; // 'FCFA' or 'EUR'
  let currentFilter = 'all';
  let amazonCart = JSON.parse(localStorage.getItem('afrofeast_amazon_cart') || '[]');

  // DOM Elements
  const mainCoursesGrid = document.getElementById('main-courses-grid');
  const dessertSideContainer = document.getElementById('dessert-side-container');
  const amazonProductsContainer = document.getElementById('amazon-products-container');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const searchInput = document.getElementById('recipe-search');
  const currencyBtns = document.querySelectorAll('.currency-btn');
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

  // Initialize
  initApp();

  function initApp() {
    renderMainCourses();
    renderDesserts();
    renderAmazonProducts();
    updateCartUI();
    setupEventListeners();
  }

  // Render Sub-dishes (2x2 grid in Main Course section)
  function renderMainCourses() {
    if (!mainCoursesGrid) return;

    // Filter dishes (exclude the primary featured dinde-laquee which is static for SEO)
    const items = RECIPES_DATA.filter(recipe => {
      if (recipe.id === 'dinde-laquee' || recipe.category === 'desserts') return false;
      if (currentFilter !== 'all' && recipe.category !== currentFilter) return false;
      return true;
    });

    mainCoursesGrid.innerHTML = items.map(recipe => {
      const tool = recipe.amazonProducts && recipe.amazonProducts[0];
      const toolPrice = tool ? (currentCurrency === 'FCFA' ? tool.priceFCFA : tool.priceEUR) : '';

      return `
        <article class="mini-dish-card">
          <img src="${recipe.image}" alt="${recipe.title}" class="mini-dish-img" loading="lazy">
          <div class="mini-dish-content">
            <div class="mini-dish-rating">
              <span>★★★★★</span> (${recipe.reviewsCount})
            </div>
            <h4 class="mini-dish-title">${recipe.title}</h4>
            <p class="dish-desc" style="font-size:0.84rem; margin-bottom:12px;">${recipe.description}</p>
            
            <div class="mini-dish-amazon-badge">
              <span class="affiliate-chip">${tool ? tool.badge : 'Matériel Pro'}</span>
              <button class="btn btn-outline view-recipe-btn" data-id="${recipe.id}" style="padding: 6px 14px; font-size: 0.8rem;">
                Voir Recette
              </button>
            </div>

            ${tool ? `
              <div style="margin-top: 10px;">
                <a href="${tool.amazonUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-amazon-buy amazon-track-btn" data-product="${tool.name}" style="width: 100%; font-size: 0.78rem; padding: 8px 12px;">
                  Acheter ${tool.name.slice(0, 24)}... (${toolPrice}) ↗
                </a>
              </div>
            ` : ''}
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
      const toolPrice = tool ? (currentCurrency === 'FCFA' ? tool.priceFCFA : tool.priceEUR) : '';

      return `
        <article class="dessert-horizontal-card">
          <img src="${recipe.image}" alt="${recipe.title}" class="dessert-horizontal-img" loading="lazy">
          <div class="dessert-horizontal-body">
            <div class="dish-rating">
              <span class="stars">★★★★★</span>
              <span class="review-count">(${recipe.reviewsCount} avis)</span>
            </div>
            <h4 class="dessert-horizontal-title">${recipe.title}</h4>
            <p class="dish-desc" style="font-size:0.82rem; margin-bottom:10px;">${recipe.description}</p>
            
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <button class="btn btn-outline view-recipe-btn" data-id="${recipe.id}" style="padding: 6px 12px; font-size: 0.78rem;">
                Détails Recette
              </button>
              ${tool ? `
                <a href="${tool.amazonUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-amazon-buy amazon-track-btn" data-product="${tool.name}" style="padding: 6px 12px; font-size: 0.78rem;">
                  Acheter ustensile (${toolPrice}) ↗
                </a>
              ` : ''}
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
      const price = currentCurrency === 'FCFA' ? product.priceFCFA : product.priceEUR;
      const oldPrice = currentCurrency === 'FCFA' ? '' : product.originalPriceEUR;

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
              <span class="current-price">${price}</span>
              ${oldPrice ? `<span class="original-price">${oldPrice}</span>` : ''}
              ${product.prime ? `<span class="prime-tag" style="margin-left:auto;">Prime ✓</span>` : ''}
            </div>

            <div class="product-card-actions">
              <a href="${product.amazonUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-amazon-buy amazon-track-btn" data-product="${product.title}" style="flex:1;">
                Acheter sur Amazon ↗
              </a>
              <button class="btn-add-wishlist" data-product-id="${product.id}" title="Ajouter à ma liste d'achats">
                + Panier
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Bind Wishlist Buttons
    document.querySelectorAll('.btn-add-wishlist').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const prodId = e.target.getAttribute('data-product-id');
        addToAmazonCart(prodId);
      });
    });
  }

  // Event Listeners
  function setupEventListeners() {
    // Currency Toggle
    currencyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        currencyBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCurrency = btn.getAttribute('data-currency');
        updateAllCurrencyDisplays();
      });
    });

    // Category Tabs Filtering
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentFilter = tab.getAttribute('data-filter');
        
        // Hide or show featured big dish if category doesn't match
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

    // Global Amazon tracking click handler
    document.addEventListener('click', (e) => {
      const trackBtn = e.target.closest('.amazon-track-btn');
      if (trackBtn) {
        const productName = trackBtn.getAttribute('data-product') || 'Article Amazon';
        showToast(`Redirection vers Amazon : "${productName}". Bonnes fêtes ! 🛒`);
      }
    });

    // Ask Expert Button
    if (askExpertBtn) {
      askExpertBtn.addEventListener('click', () => {
        showExpertDialog();
      });
    }

    // Newsletter Form
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('🎉 Félicitations ! Votre Guide de Recettes & Liens Amazon a été envoyé par email.');
        newsletterForm.reset();
      });
    }

    // Master Checkout Button in Cart Drawer
    if (checkoutAllBtn) {
      checkoutAllBtn.addEventListener('click', () => {
        if (amazonCart.length === 0) {
          showToast('Votre liste est vide ! Ajoutez des ustensiles pour commander.');
          return;
        }
        showToast('Redirection vers Amazon avec votre panier complet... 🎁');
        window.open(`https://www.amazon.fr/gp/cart/view.html?tag=${AFFILIATE_TAG}`, '_blank');
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

  // Update dynamic currency
  function updateAllCurrencyDisplays() {
    renderMainCourses();
    renderDesserts();
    renderAmazonProducts();
    updateCartUI();

    // Update static items with data-fcfa / data-eur
    document.querySelectorAll('[data-fcfa]').forEach(elem => {
      elem.textContent = currentCurrency === 'FCFA' ? elem.getAttribute('data-fcfa') : elem.getAttribute('data-eur');
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

    // Filter main recipes
    const matchingRecipes = RECIPES_DATA.filter(r => 
      r.title.toLowerCase().includes(query) || 
      r.description.toLowerCase().includes(query) ||
      r.ingredients.some(ing => ing.toLowerCase().includes(query))
    );

    if (mainCoursesGrid) {
      if (matchingRecipes.length === 0) {
        mainCoursesGrid.innerHTML = `<p style="grid-column: 1/-1; padding: 30px; text-align: center; color: var(--text-muted);">Aucune recette trouvée pour "${query}". Essayez "dinde", "alloco" ou "tarte".</p>`;
      } else {
        mainCoursesGrid.innerHTML = matchingRecipes.map(recipe => `
          <article class="mini-dish-card">
            <img src="${recipe.image}" alt="${recipe.title}" class="mini-dish-img" loading="lazy">
            <div class="mini-dish-content">
              <h4 class="mini-dish-title">${recipe.title}</h4>
              <p class="dish-desc" style="font-size:0.84rem; margin-bottom:12px;">${recipe.description}</p>
              <button class="btn btn-outline view-recipe-btn" data-id="${recipe.id}" style="width:100%; margin-top:auto;">
                Voir la recette
              </button>
            </div>
          </article>
        `).join('');
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
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 26px; align-items: start; margin-bottom: 24px;">
        <img src="${recipe.image}" alt="${recipe.title}" style="width: 100%; height: 260px; object-fit: cover; border-radius: var(--radius-md);">
        <div>
          <span class="dish-badge" style="position:static; display:inline-block; margin-bottom: 10px;">${recipe.categoryLabel}</span>
          <h2 style="font-size: 1.8rem; margin-bottom: 10px;">${recipe.title}</h2>
          <div class="dish-rating" style="margin-bottom: 12px;">
            <span class="stars">★★★★★</span>
            <span class="review-count">${recipe.reviewsCount} avis enthousiastes</span>
          </div>
          <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 14px;">${recipe.description}</p>
          <div style="display: flex; gap: 14px; font-size: 0.85rem; font-weight: 700; color: var(--text-main);">
            <span>⏱️ Prépa : ${recipe.prepTime}</span>
            <span>🔥 Cuisson : ${recipe.cookTime}</span>
            <span>⭐ Niveau : ${recipe.difficulty}</span>
          </div>
        </div>
      </div>

      <!-- Amazon Affiliate Equipment Box inside Modal -->
      ${recipe.amazonProducts && recipe.amazonProducts.length > 0 ? `
        <div style="background-color: var(--accent-gold-light); border: 1.5px solid var(--accent-gold); border-radius: var(--radius-md); padding: 18px; margin-bottom: 24px;">
          <h4 style="font-size: 1.1rem; color: #7B3E00; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
            🛒 Ustensiles recommandés sur Amazon pour réussir ce plat
          </h4>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${recipe.amazonProducts.map(prod => `
              <div style="display: flex; justify-content: space-between; align-items: center; background: #FFF; padding: 10px 14px; border-radius: var(--radius-sm); border: 1px solid rgba(0,0,0,0.06);">
                <div>
                  <strong style="font-size: 0.92rem;">${prod.name}</strong>
                  <span style="display: block; font-size: 0.78rem; color: var(--accent-red); font-weight: 700;">${currentCurrency === 'FCFA' ? prod.priceFCFA : prod.priceEUR}</span>
                </div>
                <a href="${prod.amazonUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-amazon-buy amazon-track-btn" data-product="${prod.name}" style="padding: 8px 16px; font-size: 0.82rem;">
                  Acheter sur Amazon ↗
                </a>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div style="display: grid; grid-template-columns: 1fr 1.3fr; gap: 28px;">
        <div>
          <h4 style="font-size: 1.2rem; margin-bottom: 14px; border-bottom: 2px solid var(--accent-red); padding-bottom: 6px;">Ingrédients d'Exception</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
            ${recipe.ingredients.map(ing => `
              <li style="font-size: 0.9rem; padding: 6px 0; border-bottom: 1px dashed var(--border-light); display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--accent-red);">✓</span> ${ing}
              </li>
            `).join('')}
          </ul>
        </div>

        <div>
          <h4 style="font-size: 1.2rem; margin-bottom: 14px; border-bottom: 2px solid var(--accent-red); padding-bottom: 6px;">Étapes de Préparation</h4>
          <ol style="padding-left: 20px; display: flex; flex-direction: column; gap: 12px;">
            ${recipe.instructions.map(step => `
              <li style="font-size: 0.9rem; line-height: 1.6; color: var(--text-secondary);">${step}</li>
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
      showToast(`"${product.title.slice(0, 25)}..." ajouté à votre sélection Amazon ! 🎁`);
    } else {
      showToast('Cet ustensile est déjà dans votre sélection.');
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
          <span style="font-size: 2.5rem; display: block; margin-bottom: 10px;">🧺</span>
          <p>Votre liste d'ustensiles est vide pour l'instant.</p>
          <a href="#amazon-deals" class="btn btn-outline" style="margin-top: 14px; font-size: 0.85rem;" onclick="document.getElementById('cart-drawer').classList.remove('active')">
            Explorer les ustensiles Amazon
          </a>
        </div>
      `;
      if (cartDrawerTotal) cartDrawerTotal.textContent = currentCurrency === 'FCFA' ? '0 FCFA' : '0,00 €';
      return;
    }

    cartDrawerList.innerHTML = amazonCart.map(item => {
      const price = currentCurrency === 'FCFA' ? item.priceFCFA : item.priceEUR;
      return `
        <div class="cart-item-row">
          <div class="cart-item-info">
            <strong>${item.title.slice(0, 32)}...</strong>
            <span class="cart-item-price">${price}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <a href="${item.amazonUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-amazon-buy amazon-track-btn" data-product="${item.title}" style="padding: 6px 10px; font-size: 0.75rem;">
              Acheter ↗
            </a>
            <button class="remove-cart-item-btn" data-id="${item.id}" style="color: var(--text-muted); font-size: 1.1rem; padding: 4px;" title="Retirer">
              ✕
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Compute approximate total
    if (currentCurrency === 'FCFA') {
      const totalFCFA = amazonCart.reduce((sum, item) => {
        const val = parseInt(item.priceFCFA.replace(/[^0-9]/g, ''), 10) || 0;
        return sum + val;
      }, 0);
      if (cartDrawerTotal) cartDrawerTotal.textContent = `${totalFCFA.toLocaleString('fr-FR')} FCFA`;
    } else {
      const totalEUR = amazonCart.reduce((sum, item) => {
        const val = parseFloat(item.priceEUR.replace('€', '').replace(',', '.').trim()) || 0;
        return sum + val;
      }, 0);
      if (cartDrawerTotal) cartDrawerTotal.textContent = `${totalEUR.toFixed(2).replace('.', ',')} €`;
    }

    // Bind remove buttons
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

  // Expert Dialog
  function showExpertDialog() {
    const question = prompt("Posez votre question culinaire ou nutrition à la Cheffe Aminata :");
    if (question && question.trim().length > 0) {
      showToast("Votre question a été envoyée ! La Cheffe vous répondra sous 24h.");
    }
  }

  // Toast System
  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span style="font-size: 1.2rem;">📦</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 4200);
  }
});
