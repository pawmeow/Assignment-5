const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', function () {
    searchMeal();
})


const searchMeal = () => {
    const searchInput = document.getElementById('searchInput').value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;

    document.getElementById('mealInfo').style.display = 'none';

    fetch(url)
    .then(res => res.json())
    .then(data => {
        document.getElementById('error').innerHTML = '';
        displayMeal(data.meals);
    })
    .catch(error => {
        //document.getElementById('error').display = 'block';
        displayError();
    })
}

const displayMeal = meals => {
    const searchResult = document.getElementById('searchResult');
    searchResult.innerHTML = ``;

    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.style.backgroundColor = 'rgb(240, 62, 17)';
        mealDiv.style.height = '16em';
        mealDiv.style.width = 'fit-content';
        mealDiv.style.textAlign = 'center';
        mealDiv.style.fontWeight = 'bold';
        mealDiv.style.color = 'white';


        mealDiv.innerHTML = `
            <img style="height: 14em; width: 16em;" src="${meal.strMealThumb}">
            <p>${meal.strMeal}</p>
        `;
        searchResult.appendChild(mealDiv);

        const mealId = meal.idMeal;

        mealDiv.addEventListener('click', function () {
            searchInfo(mealId);
            document.getElementById('mealInfo').style.display = 'flex';
        })
    });
    document.getElementById('searchInput').value = '';
}

const searchInfo = (idNo) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idNo}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            document.getElementById('error').innerHTML = '';
            displayInfo(data.meals);
        })
        .catch(error => {
            //document.getElementById('error').display = 'block';
            displayError();
        })
}

const displayInfo = (meal) => {
    const mealInfo = document.getElementById('mealInfo');
    mealInfo.innerHTML = '';


    const mealObject = meal[0];
    const mealArray = Object.values(mealObject);

    //console.log(mealObject);

    const infoDiv = document.createElement('div');
    infoDiv.innerHTML = `
        <img style="height: 16em; width: 26em; border-radius: 10px" src="${mealObject.strMealThumb}">
        <br><br>
        <h3 style="font-weight:light;">${mealObject.strMeal}</h3>
    `;

    const recipe = document.createElement('ul');

    for (let i = 0; i < mealArray.length; i++) {
        if (i >= 9 && i <= 28) {
            const ingredient = mealArray[i];
            const measure = mealArray[i+20];

            if (ingredient != null && ingredient != '') {
                //console.log(measure, ingredient);
                const item = document.createElement('li');
                item.innerText = measure + ' ' + ingredient;
                recipe.appendChild(item);
            }
        }
    }

    infoDiv.appendChild(recipe);
    mealInfo.appendChild(infoDiv);
}

const displayError = () => {
    document.getElementById('error').innerHTML = '';
    const msg = document.createElement('h3');

    msg.innerText = 'Failed to fetch item';
    msg.style.color = 'red';
    msg.style.textAlign = 'center';

    
    document.getElementById('error').appendChild(msg);
}