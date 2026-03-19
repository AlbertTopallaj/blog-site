const cards = document.getElementById("cardContainer")
const showMoreBtn = document.getElementById("showMoreBtn")
const cardsPerRow = parseInt(getComputedStyle(document.querySelector(".article-selection-section"))
    .getPropertyValue("--cards-per-row"));
const cardHeight = parseInt(getComputedStyle(document.querySelector(".article-selection-section"))
    .getPropertyValue("--card-height"))

function renderCards(input) { // "AI", "CSS", "HTML", "SPRING"
    cards.innerHTML = "";
    articles.forEach(article => {
        if (article.category === input) {
            const card = document.createElement('div');
            card.id = article.id;
            card.className = 'article-card';
            card.style.backgroundImage = `url('${article.image}')`;
            const p = document.createElement('p');
            p.textContent = article.title;
            card.appendChild(p)
            cards.appendChild(card);
        }
    })
}
renderCards("AI") // startup default

let visibleCards = cardsPerRow;

if (visibleCards >= cards.children.length) {
    cards.classList.add('disable-fade');
    showMoreBtn.disabled = true;
}

showMoreBtn.addEventListener("click", () => {
    if (visibleCards <= cards.children.length) {
        const currentMaxHeight = parseInt(getComputedStyle(cards).maxHeight);
        cards.style.maxHeight = `${(currentMaxHeight + (cardHeight * 1.5))}px`
        visibleCards += cardsPerRow;
        if (visibleCards >= cards.children.length) {
            cards.classList.add('disable-fade');
            showMoreBtn.disabled = true;
        }
    }
});

function openArticle() {
    document.getElementById('opened-article').style.display = 'flex';
}

document.getElementById("category-ai").addEventListener("change", () => {
    renderCards("AI")
})
document.getElementById("category-css").addEventListener("change", () => {
    renderCards("CSS")
})
document.getElementById("category-html").addEventListener("change", () => {
    renderCards("HTML")
})
document.getElementById("category-springboot").addEventListener("change", () => {
    renderCards("SPRING")
})
