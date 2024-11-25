const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');

let searchQuery = '';

const APP_ID = '2d45ff2e';
const APP_key = 'feedd34ee80ad93c95420f575f18e6d9';


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    console.log(searchQuery);
    fetchAPI();
});

async function fetchAPI () {
    const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
};

function generateHTML(results) {
    container.classList.remove('initial')
    let generatedHTML = '';
    results.map(result=> {
        generatedHTML +=
        `
        <div class="item">
            <img src="${result.recipe.image}">
            <div class="flex-container">
                <h1 class="title">${result.recipe.label}</h1>
                <a class="view-button" href="${result.recipe.url}" target='_blank'>View Recipe</a>
            </div>
            <p class="item-data">Calories: ${result.recipe.calories.toFixed(0)}</p>
            <p class="item-data">Diet Labels: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'No Data Found'}</p>
            <p class="item-data">Health Labels: ${result.recipe.healthLabels.slice(0,3)}</p>
        </div>
        `;
    });

    searchResultDiv.innerHTML = generatedHTML;
}