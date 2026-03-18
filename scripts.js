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

