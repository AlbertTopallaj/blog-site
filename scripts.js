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
        card.onclick = function() { openArticle(article.id); };
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

function openArticle(id) {
    const div = document.getElementById('opened-article');
    div.style.display = 'flex';
    const article = articles.find((element) => element.id == id);
    const title = `<h1>${article.title}</h1>`;
    const img = `<img src=${article.image}>`;
    const body = `<div id='article-content'>${img}<p>${article.body}</p></div>`;
    const bodyFormated = body.replace(/\n/g,'</p><p>');
    div.innerHTML = `${title}${bodyFormated}`;
    window.location.replace('#opened-article'); 
}

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

if (id !== null) {
  const article = articles.find(a => a.id == id);

  const app = document.getElementById('app');

  if (article) {
    app.innerHTML = `
      <div style="max-width:800px; margin:40px auto; font-family:sans-serif;">
        <h1>${article.title}</h1>
        <img src="${article.image}" style="width:100%; border-radius:10px;">
        <p style="line-height:1.6;">
          ${article.body.replace(/\n/g, "<br>")}
        </p>
        <br>
        <a href="/">⬅ Tillbaka</a>
      </div>
    `;
  } else {
    app.innerHTML = "<h1>Artikel hittades inte</h1>";
  }

} else {

  const container = document.querySelector('.slides-container');
  const dotsContainer = document.querySelector('.dots');
  const leftArrow = document.querySelector('.arrow.left');
  const rightArrow = document.querySelector('.arrow.right');

  const randomized = [...articles].sort(() => Math.random() - 0.5);
  let currentIndex = 0;

  if (!randomized.length) {
    container.innerHTML = "<p>Inga artiklar</p>";
  }

  randomized.forEach((article, index) => {
    const slide = document.createElement('div');
    slide.classList.add('slide');

    slide.innerHTML = `
      <img src="${article.image}" alt="${article.title}">
    `;

    slide.onclick = () => {
      openArticle(article.id);
    };

    container.appendChild(slide);

    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.onclick = () => goToSlide(index);

    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  function updateSlider() {
    container.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[currentIndex]) dots[currentIndex].classList.add('active');
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
  }

  leftArrow.onclick = () => {
    currentIndex = (currentIndex - 1 + randomized.length) % randomized.length;
    updateSlider();
  };

  rightArrow.onclick = () => {
    currentIndex = (currentIndex + 1) % randomized.length;
    updateSlider();
  };

  updateSlider();
}

document.addEventListener('DOMContentLoaded', () => {


    const section = document.querySelector('.article-selection-section');

const backgrounds = {

    'category-ai': "url('resources/ai-bg.jpg')",
    'category-css': "url('resources/css-bg.png')",
    'category-html': "url('resources/html-bg.jpg')",
    'category-springboot': "url('resources/springboot-bg.jpg')"

};

const defaultCategory = document.querySelector('input[name="category"]:checked');
if (defaultCategory) {
    section.style.backgroundImage =
    `radial-gradient(ellipse at center, #0d1117 50%, transparent 100%), ${backgrounds[defaultCategory.id]}`;
}

document.querySelectorAll('input[name="category"]').forEach(input => {
    input.addEventListener('change', () => {
        section.style.backgroundImage =
        `radial-gradient(ellipse at center, #0d1117 20%, transparent 100%), ${backgrounds[input.id]}`;
     });
  });
});

