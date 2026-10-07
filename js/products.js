const products = [
    {
        name: 'Wireless Headset',
        rating: 4.5,
        price: 1499,
        oldPrice: 1999,
        discount: 25,
        createdAt: '2026-08-01',
        emoji: '🎧',
        category: 'Wireless Audio',
        description: 'Experience rich sound, deep bass, and all-day comfort with this premium wireless headset. Perfect for music, calls, and travel.',
        features: [
            'Bluetooth 5.3 connectivity',
            '40-hour battery life',
            'Noise cancellation support',
            'Fast charging available'
        ]
    },
    {
        name: 'Smart Watch',
        rating: 4.7,
        price: 2999,
        oldPrice: 3999,
        discount: 30,
        createdAt: '2026-08-15',
        emoji: '⌚',
        category: 'Wearables',
        description: 'Track your workouts, monitor your health, and stay connected with a sleek smart watch built for everyday life.',
        features: [
            'AMOLED display',
            'Heart-rate tracking',
            '5-day battery life',
            'Water resistant'
        ]
    },
    {
        name: 'Sport Shoes',
        rating: 4.4,
        price: 1799,
        oldPrice: 2499,
        discount: 18,
        createdAt: '2026-09-01',
        emoji: '👟',
        category: 'Footwear',
        description: 'Lightweight, breathable, and support-focused design built for comfort during movement and everyday wear.',
        features: [
            'Breathable mesh upper',
            'Shock absorbing sole',
            'Lightweight support',
            'All-day comfort'
        ]
    },
    {
        name: 'Travel Bag',
        rating: 4.6,
        price: 2299,
        oldPrice: 2999,
        discount: 20,
        createdAt: '2026-09-20',
        emoji: '👜',
        category: 'Travel',
        description: 'A durable travel bag with enough space for essentials and a clean modern design for weekend or business trips.',
        features: [
            'Spacious storage',
            'Water resistant fabric',
            'Laptop compartment',
            'Easy wheels and handles'
        ]
    }
];

const WISHLIST_STORAGE_KEY = 'shopnest-wishlist';

function getWishlist() {
    try {
        const saved = JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY) || '[]');
        return Array.isArray(saved)
            ? saved.filter((productId) => Number.isInteger(productId) && products[productId])
            : [];
    } catch (error) {
        return [];
    }
}

function saveWishlist(wishlist) {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
}

function toggleWishlist(productId) {
    const wishlist = getWishlist();
    const isSaved = wishlist.includes(productId);

    saveWishlist(isSaved
        ? wishlist.filter((savedId) => savedId !== productId)
        : [...wishlist, productId]);

    return !isSaved;
}

const featuredProductsContainer = document.getElementById('featured-products-grid');
const productSearchInput = document.getElementById('product-search');

if (productSearchInput) {
    productSearchInput.value = new URLSearchParams(window.location.search).get('q') || '';
}

function renderProducts() {
    if (!featuredProductsContainer) {
        return;
    }

    const searchTerm = document.getElementById('product-search').value.trim().toLowerCase();
    const category = document.getElementById('category-filter').value;
    const priceRange = document.getElementById('price-filter').value;
    const minimumRating = Number(document.getElementById('rating-filter').value);
    const sortOrder = document.getElementById('sort-products').value;
    const matchingProducts = products
        .map((product, index) => ({ product, index }))
        .filter(({ product }) => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm);
            const matchesCategory = category === 'all' || product.category === category;
            const matchesPrice = priceRange === 'all'
                || (priceRange === 'under-1500' && product.price < 1500)
                || (priceRange === '1500-3000' && product.price >= 1500 && product.price <= 3000)
                || (priceRange === 'over-3000' && product.price > 3000);
            const matchesRating = product.rating >= minimumRating;

            return matchesSearch && matchesCategory && matchesPrice && matchesRating;
        });
    const sortComparators = {
        'price-low-high': (first, second) => first.product.price - second.product.price,
        'price-high-low': (first, second) => second.product.price - first.product.price,
        rating: (first, second) => second.product.rating - first.product.rating,
        newest: (first, second) => Date.parse(second.product.createdAt) - Date.parse(first.product.createdAt)
    };

    if (sortComparators[sortOrder]) {
        matchingProducts.sort(sortComparators[sortOrder]);
    }

    const noProductsMessage = document.getElementById('no-products-message');
    const searchResultsStatus = document.getElementById('search-results-status');
    const wishlist = getWishlist();
    const hasActiveFilters = searchTerm
        || category !== 'all'
        || priceRange !== 'all'
        || minimumRating > 0
        || sortOrder !== 'featured';

    featuredProductsContainer.innerHTML = matchingProducts
        .map(
            ({ product, index }) => `
                <article class="product-card-item product-clickable" data-index="${index}" tabindex="0">
                    <div class="product-thumb">${product.emoji}</div>
                    <div class="product-body">
                        <h3>${product.name}</h3>
                        <div class="rating">⭐ ${product.rating}</div>
                        <div class="price-row">
                            <span class="new-price">₹${product.price.toLocaleString('en-IN')}</span>
                            <span class="old-price">₹${product.oldPrice.toLocaleString('en-IN')}</span>
                        </div>
                        <div class="discount">Save ${product.discount}%</div>
                        <div class="product-actions">
                            <button type="button">Add to Cart</button>
                            <button type="button" class="wishlist-btn" aria-label="${wishlist.includes(index) ? 'Remove from wishlist' : 'Add to wishlist'}" aria-pressed="${wishlist.includes(index)}">${wishlist.includes(index) ? '♥' : '♡'}</button>
                        </div>
                    </div>
                </article>
            `
        )
        .join('');

    if (noProductsMessage) {
        noProductsMessage.hidden = matchingProducts.length > 0;
    }

    if (searchResultsStatus) {
        searchResultsStatus.hidden = !hasActiveFilters;
        searchResultsStatus.textContent = searchTerm
            ? `${matchingProducts.length} product${matchingProducts.length === 1 ? '' : 's'} found for "${searchTerm}".`
            : hasActiveFilters
                ? `${matchingProducts.length} product${matchingProducts.length === 1 ? '' : 's'} match your filters.`
            : '';
    }
}

renderProducts();

if (productSearchInput) {
    productSearchInput.addEventListener('input', () => {
        renderProducts();
    });
}

const productSearchForm = document.getElementById('product-search-form');

if (productSearchForm && productSearchInput) {
    productSearchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        renderProducts();
        document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

['category-filter', 'price-filter', 'rating-filter'].forEach((filterId) => {
    const filter = document.getElementById(filterId);
    if (filter) {
        filter.addEventListener('change', renderProducts);
    }
});

const productSortSelect = document.getElementById('sort-products');

if (productSortSelect) {
    productSortSelect.addEventListener('change', renderProducts);
}

const clearFiltersButton = document.getElementById('clear-filters');

if (clearFiltersButton && productSearchInput) {
    clearFiltersButton.addEventListener('click', () => {
        productSearchInput.value = '';
        document.getElementById('category-filter').value = 'all';
        document.getElementById('price-filter').value = 'all';
        document.getElementById('rating-filter').value = '0';
        productSortSelect.value = 'featured';
        renderProducts();
    });
}

const STORAGE_KEY = 'shopnest-cart';

function getCart() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        return Array.isArray(saved) ? saved : [];
    } catch (error) {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function addToCart(productIndex, quantity = 1) {
    const cart = getCart();
    const existingItem = cart.find((item) => item.id === productIndex);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id: productIndex, quantity });
    }

    saveCart(cart);
}

function getValidCartItems() {
    return getCart()
        .map((item) => {
            const product = products[item.id];
            return product ? { ...item, product } : null;
        })
        .filter(Boolean);
}

function createCartPage() {
    const cartItemsContainer = document.getElementById('cart-items');

    if (!cartItemsContainer) {
        return;
    }

    const cartItems = getValidCartItems();
    const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 149 : 0;
    const discount = cartItems.reduce((total, item) => total + (item.product.oldPrice - item.product.price) * item.quantity, 0);

    cartItemsContainer.innerHTML = cartItems.length
        ? cartItems.map((item) => `
            <div class="cart-item" data-product-id="${item.id}">
                <div class="cart-item-image">${item.product.emoji}</div>
                <div class="cart-item-details">
                    <h3>${item.product.name}</h3>
                    <p>Color: Standard</p>
                    <p>Delivery by ${new Date(Date.now() + 86400000 * (item.id + 2)).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                </div>
                <div class="cart-item-price-box">
                    <div class="cart-price">₹${(item.product.price * item.quantity).toLocaleString('en-IN')}</div>
                    <div class="qty-control">
                        <button type="button" class="qty-btn" data-action="decrease" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button type="button" class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
                    </div>
                    <button type="button" class="remove-btn" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `).join('')
        : '<div class="empty-cart">Your cart is empty. Add some products to continue.</div>';

    document.getElementById('cart-subtotal').textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    document.getElementById('cart-shipping').textContent = `₹${shipping.toLocaleString('en-IN')}`;
    document.getElementById('cart-discount').textContent = `-₹${discount.toLocaleString('en-IN')}`;
    document.getElementById('cart-total').textContent = `₹${(subtotal + shipping).toLocaleString('en-IN')}`;

    cartItemsContainer.querySelectorAll('.qty-btn').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = Number(button.dataset.id);
            const item = getCart().find((cartItem) => cartItem.id === productId);

            if (!item) {
                return;
            }

            item.quantity += button.dataset.action === 'increase' ? 1 : -1;
            saveCart(getCart().filter((cartItem) => cartItem.quantity > 0));
            createCartPage();
        });
    });

    cartItemsContainer.querySelectorAll('.remove-btn').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = Number(button.dataset.id);
            saveCart(getCart().filter((item) => item.id !== productId));
            createCartPage();
        });
    });
}

function createCheckoutSummary() {
    const checkoutItemsContainer = document.getElementById('checkout-items');

    if (!checkoutItemsContainer) {
        return;
    }

    const cartItems = getValidCartItems();
    const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 149 : 0;
    const discount = cartItems.reduce((total, item) => total + (item.product.oldPrice - item.product.price) * item.quantity, 0);

    checkoutItemsContainer.innerHTML = cartItems.length
        ? cartItems.map((item) => `
            <div class="summary-item">
                <span>${item.product.name} × ${item.quantity}</span>
                <strong>₹${(item.product.price * item.quantity).toLocaleString('en-IN')}</strong>
            </div>
        `).join('')
        : '<p class="empty-cart">Your cart is empty. Add products before checkout.</p>';

    document.getElementById('checkout-subtotal').textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    document.getElementById('checkout-shipping').textContent = `₹${shipping.toLocaleString('en-IN')}`;
    document.getElementById('checkout-discount').textContent = `-₹${discount.toLocaleString('en-IN')}`;
    document.getElementById('checkout-total').textContent = `₹${(subtotal + shipping).toLocaleString('en-IN')}`;

    const checkoutForm = document.getElementById('checkout-form');
    const checkoutMessage = document.getElementById('checkout-message');
    const placeOrderButton = document.querySelector('.checkout-summary .checkout-btn');

    if (placeOrderButton) {
        placeOrderButton.disabled = cartItems.length === 0;
    }

    if (checkoutForm && checkoutMessage && !checkoutForm.dataset.submitHandlerAdded) {
        checkoutForm.dataset.submitHandlerAdded = 'true';
        checkoutForm.addEventListener('submit', (event) => {
            event.preventDefault();

            if (getValidCartItems().length === 0) {
                checkoutMessage.textContent = 'Your cart is empty. Add products before placing an order.';
                return;
            }

            checkoutMessage.textContent = 'Demo order placed successfully. No payment was processed.';
            saveCart([]);
            createCheckoutSummary();
        });
    }
}

function createWishlistPage() {
    const wishlistProductsContainer = document.getElementById('wishlist-products');

    if (!wishlistProductsContainer) {
        return;
    }

    const savedProducts = getWishlist()
        .map((productId) => ({ product: products[productId], productId }))
        .filter(({ product }) => product);
    const emptyMessage = document.getElementById('wishlist-empty');

    wishlistProductsContainer.innerHTML = savedProducts
        .map(({ product, productId }) => `
            <article class="product-card-item product-clickable" data-index="${productId}" tabindex="0">
                <div class="product-thumb">${product.emoji}</div>
                <div class="product-body">
                    <h3>${product.name}</h3>
                    <div class="rating">⭐ ${product.rating}</div>
                    <div class="price-row">
                        <span class="new-price">₹${product.price.toLocaleString('en-IN')}</span>
                        <span class="old-price">₹${product.oldPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <div class="product-actions">
                        <button type="button" class="add-cart-btn">Add to Cart</button>
                        <button type="button" class="wishlist-btn" aria-label="Remove from wishlist" aria-pressed="true">♥</button>
                    </div>
                </div>
            </article>
        `)
        .join('');

    if (emptyMessage) {
        emptyMessage.hidden = savedProducts.length > 0;
    }

    if (!wishlistProductsContainer.dataset.handlersAdded) {
        wishlistProductsContainer.dataset.handlersAdded = 'true';
        wishlistProductsContainer.addEventListener('click', (event) => {
            const card = event.target.closest('.product-clickable');

            if (!card) {
                return;
            }

            const productId = Number(card.dataset.index);

            if (event.target.closest('.wishlist-btn')) {
                toggleWishlist(productId);
                createWishlistPage();
                renderProducts();
            } else if (event.target.closest('.add-cart-btn')) {
                addToCart(productId);
                alert(`${products[productId].name} added to cart.`);
            } else {
                window.location.href = `product-details.html?id=${productId}`;
            }
        });

        wishlistProductsContainer.addEventListener('keydown', (event) => {
            if ((event.key !== 'Enter' && event.key !== ' ') || event.target.closest('button')) {
                return;
            }

            const card = event.target.closest('.product-clickable');
            if (card) {
                event.preventDefault();
                window.location.href = `product-details.html?id=${card.dataset.index}`;
            }
        });
    }
}

const detailContainer = document.getElementById('product-detail-data');

if (detailContainer) {
    const params = new URLSearchParams(window.location.search);
    const productId = Number(params.get('id'));
    const product = products[productId];

    if (product) {
        document.title = `ShopNest | ${product.name}`;

        document.getElementById('detail-category').textContent = product.category;
        document.getElementById('detail-name').textContent = product.name;
        document.getElementById('detail-rating').textContent = `⭐ ${product.rating} | ${product.rating * 1000} ratings`;
        document.getElementById('detail-price').textContent = `₹${product.price.toLocaleString('en-IN')}`;
        document.getElementById('detail-old-price').textContent = `₹${product.oldPrice.toLocaleString('en-IN')}`;
        document.getElementById('detail-discount').textContent = `${product.discount}% Off`;
        document.getElementById('detail-image').textContent = product.emoji;
        document.getElementById('detail-description').textContent = product.description;

        const featureList = document.getElementById('detail-features');
        featureList.innerHTML = product.features
            .map((feature) => `<li>${feature}</li>`)
            .join('');

        const addToCartButton = document.getElementById('add-to-cart-detail');
        const quantityInput = document.getElementById('detail-quantity');

        const addSelectedQuantity = () => {
            if (!quantityInput.reportValidity()) {
                return false;
            }

            addToCart(productId, Number(quantityInput.value));
            return true;
        };

        if (addToCartButton && quantityInput) {
            addToCartButton.addEventListener('click', () => {
                if (addSelectedQuantity()) {
                    alert(`${quantityInput.value} × ${product.name} added to cart.`);
                }
            });
        }

        const buyNowButton = document.getElementById('buy-now-detail');
        if (buyNowButton && quantityInput) {
            buyNowButton.addEventListener('click', () => {
                if (addSelectedQuantity()) {
                    window.location.href = 'checkout.html';
                }
            });
        }

        const wishlistButton = document.getElementById('wishlist-detail');
        if (wishlistButton) {
            const isSaved = getWishlist().includes(productId);
            wishlistButton.textContent = isSaved ? '♥ Wishlisted' : '♡ Wishlist';
            wishlistButton.setAttribute('aria-pressed', String(isSaved));
            wishlistButton.addEventListener('click', () => {
                const nowSaved = toggleWishlist(productId);
                wishlistButton.textContent = nowSaved ? '♥ Wishlisted' : '♡ Wishlist';
                wishlistButton.setAttribute('aria-pressed', String(nowSaved));
            });
        }
    } else {
        detailContainer.innerHTML = '<p>Product not found.</p>';
    }
}

if (featuredProductsContainer) {
    featuredProductsContainer.addEventListener('click', (event) => {
        const button = event.target.closest('button');
        const card = event.target.closest('.product-clickable');

        if (!card) {
            return;
        }

        if (button) {
            if (button.classList.contains('wishlist-btn')) {
                const id = Number(card.dataset.index);
                toggleWishlist(id);
                renderProducts();
                return;
            }

            event.stopPropagation();
            const id = Number(card.dataset.index);
            addToCart(id);
            alert(`${products[id].name} added to cart.`);
            return;
        }

        const id = card.dataset.index;
        window.location.href = `pages/product-details.html?id=${id}`;
    });

    featuredProductsContainer.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') {
            return;
        }

        if (event.target.closest('button')) {
            return;
        }

        const card = event.target.closest('.product-clickable');
        if (!card) {
            return;
        }

        event.preventDefault();
        const id = card.dataset.index;
        window.location.href = `pages/product-details.html?id=${id}`;
    });
}

createCartPage();
createCheckoutSummary();
createWishlistPage();
