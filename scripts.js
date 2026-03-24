const cards = document.getElementById("cardContainer")
const showMoreBtn = document.getElementById("showMoreBtn")
const cardsPerRow = parseInt(getComputedStyle(document.querySelector(".article-selection-section"))
    .getPropertyValue("--cards-per-row"));
const cardHeight = parseInt(getComputedStyle(document.querySelector(".article-selection-section"))
    .getPropertyValue("--card-height"))

function renderCards() {
    articles.forEach(article => {
        const card = document.createElement('div');
        card.id = article.id
        card.className = 'article-card';
        card.style.backgroundImage = `url('${article.image}')`;
        card.innerHTML = `<p>${article.title}</p>`;
        cards.appendChild(card);

    })
}
renderCards()

let visibleCards = cardsPerRow;

if (visibleCards >= cards.children.length) {
    cards.classList.add('disable-fade');
    showMoreBtn.disabled = true;
}

showMoreBtn.addEventListener("click", () => {
    if (visibleCards <= cards.children.length) {
        const currentMaxHeight = parseInt(getComputedStyle(cards).maxHeight);
        cards.style.maxHeight = `${(currentMaxHeight + cardHeight) * 1.5}px`
        visibleCards += cardsPerRow;
        if (visibleCards => cards.children.length) {
            cards.classList.add('disable-fade');
            showMoreBtn.disabled = true;
        }
    }
});

function openArticle() {
    document.getElementById('opened-article').style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', () => {


    const section = document.querySelector('.article-selection-section');

const backgrounds = {

    'category-ai': "url('resources/ai-bg.jpg')",
    'category-css': "url('resources/css-bg.png')",
    'category-html': "url('resources/html-bg.png')",
    'category-springboot': "url('resources/springboot-bg.png')"

};

const defaultCategory = document.querySelector('input[name="category"]:checked');
if (defaultCategory) {
    section.style.backgroundImage =
    `radial-gradient(ellipse at center, #0d1117 70%, transparent 100%), ${backgrounds[defaultCategory.id]}`;
}

document.querySelectorAll('input[name="category"]').forEach(input => {
    input.addEventListener('change', () => {
        section.style.backgroundImage =
        `radial-gradient(ellipse at center, #0d1117 70%, transparent 100%), ${backgrounds[input.id]}`;
     });
  });
});

