// Charge data/articles.json et génère le contenu de la page actualités.
// Ce fichier est piloté par le CMS (admin/) : ne pas coder les articles en dur ici.

async function loadArticles() {
  const response = await fetch("data/articles.json", { cache: "no-store" });
  if (!response.ok) throw new Error("Impossible de charger data/articles.json");
  const data = await response.json();
  return Array.isArray(data.articles) ? data.articles : [];
}

function externalLinkIcon() {
  return (
    '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<path d="M14 5H19V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M19 5L10 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M18 14V18C18 18.5523 17.5523 19 17 19H6C5.44772 19 5 18.5523 5 18V7C5 6.44772 5.44772 6 6 6H10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
    "</svg>"
  );
}

function renderFeatured(container, article) {
  if (!article) {
    container.innerHTML = "";
    return;
  }

  const quoteBlock = article.quote
    ? `<div class="sama-featured__quote">
         <p>${article.quote}</p>
         ${article.quoteAuthor ? `<p class="sama-featured__quote-author">${article.quoteAuthor}</p>` : ""}
       </div>`
    : "";

  const linkBlock = article.link
    ? `<a class="sama-featured__link" href="${article.link}" target="_blank" rel="noopener">
         <span>${article.linkLabel || "Lire l'article"}</span>
         ${externalLinkIcon()}
       </a>`
    : "";

  const imageBlock = article.image
    ? `<div class="sama-featured__image">
         <img src="${article.image}" alt="${article.title || ""}" loading="lazy">
       </div>`
    : "";

  container.innerHTML = `
    <div class="sama-featured__text">
      <h3 class="sama-featured__title">${article.title || ""}</h3>
      <p class="sama-featured__description">${article.description || ""}</p>
      ${quoteBlock}
      ${linkBlock}
    </div>
    ${imageBlock}
  `;
  container.classList.add("sama-featured");
}

function renderOthers(container, articles) {
  if (!articles.length) {
    container.innerHTML = '<p class="sama-other-articles__empty">Bientôt disponible</p>';
    container.classList.add("sama-other-articles");
    return;
  }

  container.innerHTML = articles
    .map(
      (article) => `
      <article class="sama-article-card">
        <div>
          <h4 class="sama-article-card__title">${article.title || ""}</h4>
          <p class="sama-article-card__description">${article.description || ""}</p>
          ${
            article.link
              ? `<a class="sama-article-card__link" href="${article.link}" target="_blank" rel="noopener">${
                  article.linkLabel || "Lire l'article"
                }</a>`
              : ""
          }
        </div>
        ${
          article.image
            ? `<div class="sama-article-card__image"><img src="${article.image}" alt="${article.title || ""}" loading="lazy"></div>`
            : ""
        }
      </article>`
    )
    .join("");
  container.classList.add("sama-other-articles");
}

async function initArticles() {
  const featuredContainer = document.getElementById("featured-article");
  const othersContainer = document.getElementById("other-articles");
  if (!featuredContainer && !othersContainer) return;

  try {
    const articles = await loadArticles();
    const [featured, ...rest] = articles;
    if (featuredContainer) renderFeatured(featuredContainer, featured);
    if (othersContainer) renderOthers(othersContainer, rest);
  } catch (error) {
    console.error("[sama] Erreur de chargement des actualités :", error);
  }
}

document.addEventListener("DOMContentLoaded", initArticles);
