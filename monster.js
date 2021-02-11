const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', function() {
    const searchInput = document.getElementById('searchInput').innerText;

    const mealurl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;

    fetch(mealurl)
    .then(res => res.json())
    .then(data => {
        //console.log(data);
        const dataMeal = data.meals;
        console.log(searchInput);
        for (let i = 0; i < dataMeal.length; i++) {
            if (dataMeal[i].strMeal == searchInput) {
                console.log(dataMeal[i].idMeal);
            }
        }
    })
})