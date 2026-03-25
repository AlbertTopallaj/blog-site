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

import { articles } from './articles.js';

function getPostById(id) {
  return blogPosts.find(post => post.id === id);
}

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
let currentIndex = 0;

function renderSlide(slide) {
  const id = parseInt(slide.dataset.id, 10);
  const post = getPostById(id);

  slide.innerHTML = `
    <h2>${post.title}</h2>
    <p>${post.excerpt}</p>
    <a href="${post.url}">Read more</a>
  `;
}

slides.forEach(renderSlide);

function showRandomSlide() {
  let nextIndex;
  do {
    nextIndex = Math.floor(Math.random() * slides.length);
  } while (nextIndex === currentIndex);

  slides[currentIndex].classList.remove('active');
  slides[nextIndex].classList.add('active');

  currentIndex = nextIndex;
}

let autoSwitch = setInterval(showRandomSlide, 4000);

document.querySelector('.arrow.left').addEventListener('click', () => {
  showRandomSlide();
  clearInterval(autoSwitch);
  autoSwitch = setInterval(showRandomSlide, 4000);
});

document.querySelector('.arrow.right').addEventListener('click', () => {
  showRandomSlide();
  clearInterval(autoSwitch);
  autoSwitch = setInterval(showRandomSlide, 4000);
});

let startX = 0;
let endX = 0;
let isDragging = false;

function handleSwipe() {
  const distance = endX - startX;

  if (Math.abs(distance) > 50) {
    showRandomSlide();
    clearInterval(autoSwitch);
    autoSwitch = setInterval(showRandomSlide, 4000);
  }
}

slider.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

slider.addEventListener('touchend', e => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

slider.addEventListener('mousedown', e => {
  isDragging = true;
  startX = e.clientX;
});

slider.addEventListener('mouseup', e => {
  if (!isDragging) return;
  endX = e.clientX;
  isDragging = false;
  handleSwipe();
});