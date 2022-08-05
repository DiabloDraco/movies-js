let elMovies = movies.slice(0 , 100);
let elForm = document.querySelector("#form")
let elWrapper = document.querySelector(".movie__wrapper")
let elResult = document.querySelector("#results")
let elSelect = document.querySelector("#selects")
let elTemplate = document.querySelector("#movie_card").content
let firstPage = document.querySelector("#first")
let secondPage = document.querySelector("#second")
let thirdPage = document.querySelector("#third")
let fourthPage = document.querySelector("#fourth")
let elBookmark = document.querySelector("#bookmark__template").content
let bookmarkWrapper = document.querySelector(".bookmarked__movies")
let elBookmarkButton = document.querySelector(".bookmark")

// Normalize array

let newArray = elMovies.map((item)=> {
    return {
        id:item.imdb_id,
        title:item.Title.toString(),
        categories:item.Categories.split("|"),
        image:`https://i.ytimg.com/vi/${item.ytid}/mqdefault.jpg`,
        movieYear:item.movie_year,
        videoUrl:`https://www.youtube.com/watch?v=${item.ytid}`,
        rating:item.imdb_rating,
        info:item.summary.toString()
    }
})


// Render array

function render(array , wrapper) {
    elWrapper.textContent = null
    elResult.textContent = array.length
    let fragment = document.createDocumentFragment()
    for (const item of array) {
        let template = elTemplate.cloneNode(true)
        template.querySelector(".movie__img").src = item.image
        template.querySelector(".movie__title").textContent = item.title
        template.querySelector(".movie__year").textContent = item.movieYear
        template.querySelector("#categories").textContent = item.categories
        template.querySelector(".movie__rating").textContent = item.rating
        template.querySelector(".movie__url").href = item.videoUrl
        template.querySelector(".more__info").dataset.movieId = item.id
        template.querySelector(".bookmark").dataset.bookmarkId = item.id
        fragment.appendChild(template)
    }
    wrapper.appendChild(fragment)
}

render(newArray , elWrapper)

// Find categories

function findCategories(array) {
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

let findedCategories = findCategories(newArray).sort()


// Render Categories 

function renderCategories(array , wrapper) {
    let fragment = document.createDocumentFragment()
    for (let i = 0; i < array.length; i++) {
        let newOption = document.createElement("option")
        newOption.value = array[i]
        newOption.textContent = array[i]
        fragment.appendChild(newOption)
    }
    wrapper.appendChild(fragment)
}

renderCategories(findedCategories , elSelect)


// Filter Array
let ar = []
elForm.addEventListener("submit" , (evt)=>{
    evt.preventDefault()
    
    let elRating = document.querySelector(".rate__value").value.trim()
    let elYear = document.querySelector(".year__value").value.trim()
    let selectValue = document.querySelector("#selects").value.trim()
    let elSort = document.querySelector(".movie__sort").value
    let elname = document.querySelector(".name__value").value.trim()
    
    let filteredArray = newArray.filter(function(item) {
        let isTrue = selectValue == "all" ? true : item.categories.includes(selectValue);
        let validate = item.rating >= elRating && item.movieYear >= elYear && isTrue && item.title.search(elname) != -1
        return validate
    })
    
    if (elSort == "ratinHighToLow") {
        filteredArray.sort((a , b)=> {
            return b.rating - a.rating
        })
    }
    if (elSort == "ratingLowToHigh") {
        filteredArray.sort((a , b)=> {
            return a.rating - b.rating 
        })
    }
    if (elSort == "yearHighToLow") {
        filteredArray.sort((a , b)=> {
            return b.movieYear - a.movieYear
        })
    }
    if (elSort == "yearLowToHigh") {
        filteredArray.sort((a , b)=> {
            return a.movieYear - b.movieYear
        })
    }
    
    if (elSort == "az") {
        filteredArray.sort((a , b)=> {
            return a === b ? 0 : (a.title < b.title) ? -1 : 1;
        })
    }
    
    if (elSort == "za") {
        filteredArray.sort((a , b)=> {
            return a === b ? 0 : (b.title < a.title) ? -1 : 1;
        })
    }
    
    render(filteredArray.slice(0 , 10) , elWrapper)
    ar = filteredArray
})


if (ar != []) {
    // Page layout
    firstPage.addEventListener("click" ,()=> {
        
        filteredArray = ar.slice(0 , 10);
        firstPage.classList.add("active")
        secondPage.classList.remove("active")
        fourthPage.classList.remove("active")
        thirdPage.classList.remove("active")
        
        render(filteredArray , elWrapper)
    })
    
    secondPage.addEventListener("click" ,()=> {
        
        firstPage.classList.remove("active")
        secondPage.classList.add("active")
        fourthPage.classList.remove("active")
        thirdPage.classList.remove("active")
        filteredArray = ar.slice(10 , 20); 
        render(filteredArray , elWrapper)
    })
    
    thirdPage.addEventListener("click" ,()=> {
        
        firstPage.classList.remove("active")
        secondPage.classList.remove("active")
        fourthPage.classList.remove("active")
        thirdPage.classList.add("active")
        filteredArray = ar.slice(20 , 30);
        render(filteredArray , elWrapper)
    })
    
    fourthPage.addEventListener("click" ,()=> {
        
        firstPage.classList.remove("active")
        secondPage.classList.remove("active")
        fourthPage.classList.add("active")
        thirdPage.classList.remove("active")
        filteredArray = ar.slice(30 , 40);
        render(filteredArray , elWrapper)
    })
}
else {
    // Page layout
    firstPage.addEventListener("click" ,()=> {
        
        elMovies = newArray.slice(0 , 10);
        firstPage.classList.add("active")
        secondPage.classList.remove("active")
        fourthPage.classList.remove("active")
        thirdPage.classList.remove("active")
        
        render(elMovies , elWrapper)
    })
    
    secondPage.addEventListener("click" ,()=> {
        
        firstPage.classList.remove("active")
        secondPage.classList.add("active")
        fourthPage.classList.remove("active")
        thirdPage.classList.remove("active")
        elMovies = newArray.slice(10 , 20); 
        render(elMovies , elWrapper)
    })
    
    thirdPage.addEventListener("click" ,()=> {
        
        firstPage.classList.remove("active")
        secondPage.classList.remove("active")
        fourthPage.classList.remove("active")
        thirdPage.classList.add("active")
        elMovies = newArray.slice(20 , 30);
        render(elMovies , elWrapper)
    })
    
    fourthPage.addEventListener("click" ,()=> {
        
        firstPage.classList.remove("active")
        secondPage.classList.remove("active")
        fourthPage.classList.add("active")
        thirdPage.classList.remove("active")
        elMovies = newArray.slice(30 , 40);
        render(elMovies , elWrapper)
    })
}


elWrapper.addEventListener("click" , (event) => {
    let currentCard = event.target.dataset.movieId
    let currentBookmark = event.target.dataset.bookmarkId
    if (currentCard) {
        let elModalTitle = document.querySelector(".modal__title")
        let elModalDesc = document.querySelector(".modal__desc")
        let findedObject = newArray.find(function findedObject(item) {
            return item.id == currentCard
        })
        elModalTitle.textContent = findedObject.title
        elModalDesc.textContent = findedObject.info
    }
    if (currentBookmark) {
        let findedObject = newArray.find(function findedObject(item) {
            return item.id == currentBookmark
        })
        let template = elBookmark.cloneNode(true)
        let findTitle = findedObject.title
        template.querySelector(".bookmark__title").textContent = `${findTitle}`
        bookmarkWrapper.appendChild(template)
        
    }
})
