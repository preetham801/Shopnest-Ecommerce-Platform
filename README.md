# ShopNest

ShopNest is a responsive e-commerce storefront built with HTML, CSS, and vanilla JavaScript. The project demonstrates common shopping experiences—from discovering products to managing a cart—using a lightweight, browser-based implementation.

> **Project status:** This is a frontend demonstration and learning project. Authentication, order submission, and payment processing are not connected to a backend.

## Highlights

- **Product discovery:** Browse product cards and individual product detail pages.
- **Search and filtering:** Search by product name, filter by category, price, and rating, and sort the results.
- **Shopping cart:** Add products, choose quantities, update or remove cart items, and review the order summary.
- **Wishlist:** Save and remove products from a persistent wishlist.
- **Checkout experience:** Review cart contents and complete a client-side delivery form demonstration.
- **Responsive interface:** Layouts adapt to desktop and mobile screen sizes.
- **Form validation:** Login, registration, and checkout forms use browser-side validation.

## Technology

- HTML5
- CSS3
- Vanilla JavaScript (no frontend framework)
- Browser `localStorage` for cart and wishlist data

The project has no package dependencies or build step.

## Project structure

```text
Shopnest/
├── index.html                 # Storefront, product search, filters, and offers
├── style.css                  # Shared styling and responsive layouts
├── js/
│   ├── products.js            # Product data, product views, cart, and wishlist
│   └── auth.js                # Client-side login and registration validation
└── pages/
    ├── auth.html              # Login
    ├── cart.html              # Shopping cart
    ├── checkout.html          # Demo checkout
    ├── product-details.html   # Product details
    ├── register.html          # Registration
    └── wishlist.html          # Saved products
```

## Run locally

1. Download or clone this repository.
2. Open `index.html` in a modern web browser.

For a more realistic local development experience, serve the project directory with a lightweight static web server, such as the Live Server extension in Visual Studio Code.

## How the demo works

- Product information is defined in `js/products.js`.
- Product cards link to a details page using the selected product's ID.
- Cart and wishlist contents are saved in the current browser's `localStorage`.
- Search, filters, sorting, and form validation run in the browser.

Because data is stored in the browser, it is not shared between browsers or devices. Clearing site data may remove the saved cart and wishlist.

## Demo limitations

- Login and registration validate input but do not create or authenticate accounts.
- Checkout does not transmit delivery details, create orders, or process payments.
- Product, price, offer, rating, and delivery information is sample content.
- Do not enter real personal, account, or payment information.

This project is suitable for learning, demonstrations, and portfolio review—not for operating a production store or accepting real orders.

## Future improvements

- Connect product and inventory data to a backend.
- Add secure account management and persistent customer carts.
- Implement order creation, order history, and payment-provider integration.
- Replace sample content and placeholder customer-service details with verified information.
- Add automated tests for shopping flows and form validation.
