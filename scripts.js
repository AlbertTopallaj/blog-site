const cards = document.getElementById("cardContainer")
const showMoreBtn = document.getElementById("showMoreBtn")
const cardsPerRow = parseInt(getComputedStyle(document.querySelector("#article-selection-section"))
    .getPropertyValue("--cards-per-row"));
const cardHeight = parseInt(getComputedStyle(document.querySelector("#article-selection-section"))
    .getPropertyValue("--card-height"))

let visibleCards = cardsPerRow;
let showMoreBtnAction;

function renderCards(input) { // "AI", "CSS", "HTML", "SPRING"
    cards.innerHTML = "";
    articles.forEach(article => {
        if (article.category === input) {
            const card = document.createElement('div');
            card.id = article.id;
            card.className = 'article-card';
            card.style.backgroundImage = `url('${article.image}')`;
            cards.style.maxHeight = `${cardHeight * 1.5}px`;
            card.onclick = function() {openArticle(article.id)};
            const p = document.createElement('p');
            p.textContent = article.title;
            card.appendChild(p)
            cards.appendChild(card);
        }
    })
    showMoreBtnAction = showMoreArticles;
    visibleCards = cardsPerRow;
    if (cards.children.length <= cardsPerRow) showMoreBtn.style.display = 'none';
    else showMoreBtn.style.display = 'block';
}
renderCards("AI") // startup default


showMoreBtn.addEventListener("click", () => {
  showMoreBtnAction();
});

function showMoreArticles() {
  if (visibleCards <= cards.children.length) {
    visibleCards += cardsPerRow;
    cards.style.maxHeight = `${(visibleCards/cardsPerRow + 0.5) * cardHeight}px`;
    if (visibleCards >= cards.children.length) {
      changeShowMoreToShowLess();
    }
  } 
}

function showLessArticles() {
  cards.style.maxHeight = `${cardHeight * 1.5}px`;
  showMoreBtn.textContent = '\u23F7';
  visibleCards = cardsPerRow;
  showMoreBtnAction = showMoreArticles;
}

function changeShowMoreToShowLess() {
  showMoreBtn.textContent = '\u23F6';
  showMoreBtnAction = showLessArticles;
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

function openArticle(id) {
    const div = document.getElementById('opened-article');
    div.style.display = 'flex';
    const article = articles.find((element) => element.id === id);
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
  const article = articles.find(a => a.id === id);

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

  let currentSlides = [];     
  let currentIndex = 0;      
  let rotationTimer = null;   

  function getRandomThree() {
    const shuffled = [...articles].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }

  function renderSlides() {
    container.innerHTML = "";
    dotsContainer.innerHTML = "";

    currentSlides.forEach((article, index) => {
      const slide = document.createElement('div');
      slide.classList.add('slide');

      slide.innerHTML = `
      <img src="${article.image}" alt="${article.title}">
      <div class="slide-title">${article.title}</div>
      `;

      slide.onclick = () => openArticle(article.id);
      container.appendChild(slide);

      const dot = document.createElement('span');
      dot.classList.add('dot');
      dot.onclick = () => goToSlide(index);
      dotsContainer.appendChild(dot);
    });

    updateSlider();
  }

  function updateSlider() {
    container.style.transform = `translateX(-${currentIndex * 100}%)`;

    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[currentIndex]) dots[currentIndex].classList.add('active');
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
  }

  leftArrow.onclick = () => {
    currentIndex = (currentIndex - 1 + currentSlides.length) % currentSlides.length;
    updateSlider();
  };

  rightArrow.onclick = () => {
    currentIndex = (currentIndex + 1) % currentSlides.length;
    updateSlider();
  };

  function rotateSlides() {
    currentSlides = getRandomThree();
    currentIndex = 0;
    renderSlides();
  }

  rotateSlides();

  rotationTimer = setInterval(rotateSlides, 10000);
}

document.addEventListener('DOMContentLoaded', () => {


    const section = document.querySelector('#article-selection-section');

const backgrounds = {
    'category-ai': "url('resources/ai-bg.jpg')",
    'category-css': "url('resources/css-bg.png')",
    'category-html': "url('resources/html-bg.jpg')",
    'category-springboot': "url('resources/springboot-bg.jpg')"

};

const defaultCategory = document.querySelector('input[name="category"]:checked');
if (defaultCategory) {
    section.style.backgroundImage =
    `radial-gradient(ellipse 80% 85% at center, var(--background-color) 50%, transparent 100%),
     linear-gradient(rgba(0, 0, 0, 0.5)),
     ${backgrounds[defaultCategory.id]}`;
}

document.querySelectorAll('input[name="category"]').forEach(input => {
    input.addEventListener('change', () => {
        section.style.backgroundImage =
        `radial-gradient(ellipse 80% 85% at center, var(--background-color) 50%, transparent 100%),
         linear-gradient(rgba(0, 0, 0, 0.5)),
         ${backgrounds[input.id]}`;
     });
  });
});

