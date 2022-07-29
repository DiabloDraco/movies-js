elMovies = movies.slice(0 , 150)


function normolize(array) {
    let newArray = [];


    array.forEach(item => {
        let newObject = {}

        newObject.title = item.Title.toString();
        newObject.videoUrl = `https://www.youtube.com/watch?v=${item.ytid}`;
        newObject.categories = item.Categories.split("|");
        newObject.movieYear = item.movie_year;
        newObject.rating = item.imdb_rating;
        newObject.image = `https://i.ytimg.com/vi/${item.ytid}/mqdefault.jpg`;

        newArray.push(newObject)
    });



    return newArray
}

let wArray = normolize(elMovies);
let elMovieWrapper = document.querySelector(".movie__wrapper");
let elTemplate = document.querySelector("#movie_card").content;
let elReslut = document.querySelector("#results")
function renderMovies(array, wrapper) {
    wrapper.innerHTML = null
    elReslut.textContent = array.length
    let tempFragment = document.createDocumentFragment()

    for (const item of array) {
        let templateItem = elTemplate.cloneNode(true)

        templateItem.querySelector(".movie__img").src = item.image;
        templateItem.querySelector(".movie__title").textContent = item.title;
        templateItem.querySelector(".movie__year").textContent = item.movieYear;
        templateItem.querySelector(".movie__rating").textContent = item.rating;
        templateItem.querySelector(".movie__url").href = item.videoUrl;


        tempFragment.appendChild(templateItem)
    }

    wrapper.appendChild(tempFragment)

}

renderMovies(wArray, elMovieWrapper);

let elForm = document.querySelector("#form")

elForm.addEventListener("submit" , function (evt) {
    evt.preventDefault();
    let elInput = Number(document.querySelector(".rate__value").value.trim())
    let FindedArray = []
    for (let i = 0; i < wArray.length; i++) {
        if (elInput <= wArray[i].rating) {
            FindedArray.push(wArray[i])
        }
    }
    renderMovies(FindedArray , elMovieWrapper)
})
