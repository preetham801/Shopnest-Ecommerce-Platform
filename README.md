# ShopNest

ShopNest is a responsive storefront demo built with plain HTML, CSS, and JavaScript. It is a learning project and can be hosted as a static website.

## Features

- Product browsing, details, search, filters, and sorting
- Cart quantities, totals, and a saved wishlist using browser local storage
- Demo checkout form and client-side login and registration validation
- Responsive layouts for desktop and mobile

## Run locally

Open `index.html` in a browser, or serve the project folder with a local web server. For example, in VS Code you can use the Live Server extension and open the local URL it provides.

## Publish as a static demo

This project does not need a build step:

1. Create a GitHub repository for the project and push the files to its default branch.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select the default branch and the `/ (root)` folder, then save.
4. Wait for GitHub Pages to publish the site and open the URL shown in the Pages settings.

The site uses relative paths, so its pages and styles can be served from a GitHub Pages project URL.

## Important demo limitations

- Login and registration only validate fields in the browser; no accounts are created.
- Checkout does not submit orders or process payments.
- Cart and wishlist data stay in the current browser's local storage.
- Do not enter real personal, account, or payment information.
- Product, offer, rating, and delivery information is sample content.

This is suitable for a static portfolio or learning-project demo, not for taking real orders. A real store needs a secure backend, authentication, order handling, payment-provider integration, and appropriate privacy and legal pages.

## Before sharing the demo

- Check the homepage, product details, cart, wishlist, login, registration, and checkout pages.
- Test the main navigation and search on desktop and mobile.
- Confirm the browser shows no missing pages, assets, or JavaScript errors.
- Review any sample content you want to personalize before publishing.
