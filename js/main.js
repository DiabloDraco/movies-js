elMovies = movies.slice(0 , 150)
elSelect = document.querySelector("#selects")

let wArray = elMovies.map(item =>{
    return {
        title:item.Title.toString(),
        videoUrl:`https://www.youtube.com/watch?v=${item.ytid}`,
        categories:item.Categories.split("|"),
        movieYear:item.movie_year,
        rating:item.imdb_rating,
        image:`https://i.ytimg.com/vi/${item.ytid}/mqdefault.jpg`
    }
})

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
        templateItem.querySelector("#categories").textContent = item.categories;
        
        
        tempFragment.appendChild(templateItem)
    }
    
    wrapper.appendChild(tempFragment)
    
}

renderMovies(wArray, elMovieWrapper);

let elForm = document.querySelector("#form")
let fArray = []
elForm.addEventListener("submit" , function find(evt) {
    evt.preventDefault();
    let elInput = Number(document.querySelector(".rate__value").value.trim())
    let FindedArray = []
    for (let i = 0; i < wArray.length; i++) {
        if (elInput <= wArray[i].rating) {
            FindedArray.push(wArray[i])
        }
    }
    renderMovies(FindedArray , elMovieWrapper)
    fArray = FindedArray
    console.log(fArray);
})
function getCategories(array) {
    let categoriesArray = []
    for (const item of array) {
        for (const itemCategories of item.categories) {
            if (!categoriesArray.includes(itemCategories)) {
                categoriesArray.push(itemCategories)
            }
        }
    }
    return categoriesArray
}

let allCategories = getCategories(wArray)

function categoriesRender(array) {
    for (let i = 0; i < array.length; i++) {
        let newOption = document.createElement("option")
        newOption.value = array[i]
        newOption.textContent = array[i]
        elSelect.appendChild(newOption)
    }
}
let elInput = Number(document.querySelector(".rate__value").value.trim())

categoriesRender(allCategories)

elSelect.addEventListener("input" , (evt)=> {
    evt.preventDefault()
    
    let selectedCategories = elSelect.value 
    if (elInput !== "") {
        let filteredCategories = fArray.filter(function (item) {
            return item.categories.includes(selectedCategories)
        })
        
        if (selectedCategories != "all") {
            renderMovies(filteredCategories , elMovieWrapper)
        }else {
            renderMovies(wArray , elMovieWrapper)
        }
    }else {
        let filteredCategories = wArray.filter(function (item) {
            return item.categories.includes(selectedCategories)
        })
        
        if (selectedCategories != "all") {
            renderMovies(filteredCategories , elMovieWrapper)
        }else {
            renderMovies(wArray , elMovieWrapper)
        }
    }
})