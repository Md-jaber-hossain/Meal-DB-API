function searchUpdate(){
    const inputField = document.getElementById('inputField');
    const inputValue = inputField.value;
    inputField.value = '';
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`
    document.getElementById('error-message').style.display = 'none';
    document.getElementById('error-not-found').style.display = 'none';
    document.getElementById('searchResult').textContent = '';
    document.getElementById('specificMealResult').textContent = '';
    if(inputValue <= 0){
        document.getElementById('error-message').style.display = 'block';
    }
    else{
        document.getElementById("spinner").classList.remove("d-none");
        fetch(url)
        .then(res => res.json())
        .then(data => displaySearchValue(data))
        // .catch(error => displaySearchNotFound(error));
    }
}

function displaySearchNotFound(){
    document.getElementById('error-not-found').style.display = 'block';
    // document.getElementById('error-not-found').innerText = error;
}

function displaySearchValue(data){

    document.getElementById('specificMealResult').textContent = '';
    document.getElementById("spinner").classList.add("d-none");
    document.getElementById('error-not-found').style.display = 'none';

    const searchResult = document.getElementById('searchResult');
    searchResult.textContent = '';
    const meals = data.meals;
    if(meals === null){
        displaySearchNotFound();
    }
    else{
        for(const meal of meals){
            console.log(meal);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div onclick="specificMeal('${meal.idMeal}')" class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">${meal?.strInstructions?.slice(0,150)}</p>
            </div>
            </div>`;
            searchResult.appendChild(div);
        }
    }
}

function specificMeal(mealId){
    const url2 = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url2)
    .then(res => res.json())
    .then(data => displaySpecificMeal(data.meals[0]));
};

function displaySpecificMeal(meal){
    const specificMealResult = document.getElementById('specificMealResult');
    specificMealResult.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card h-50 w-50 mx-auto">
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title text-center">${meal.strMeal}</h5>
        <p class="card-text text-center">${meal.strArea}</p>
        <a href="${meal.strYoutube}" class="btn btn-primary w-100">Go Youtube</a>
        <p class="card-text">${meal?.strInstructions?.slice(0,150)}</p>
        </div>
    </div>`;
    specificMealResult.appendChild(div);
}

