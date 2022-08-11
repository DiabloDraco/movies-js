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
let elBookmarkRemove = document.querySelector(".bookmark__remove")
let elPaginationWrapper = document.querySelector("#pageWrapper")
let itemsPerPage = 10
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

render(newArray.slice(0 , 10) , elWrapper)
renderPageBtns(newArray)
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
    renderPageBtns(filteredArray)
    ar = filteredArray
})




let deleteArray = []
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
        if (!deleteArray.find(function findalred(item) {
            return item.id == currentBookmark
        })) {
            deleteArray.push(findedObject)
            template.querySelector(".bookmark__num").classList.add(`${findedObject.id}`)
            template.querySelector(".bookmark__title").textContent = `${findedObject.title}`
            template.querySelector(".bookmark__title").classList.add(`${findedObject.id}`)
            template.querySelector(".bookmark__remove").dataset.removeId = findedObject.id
            bookmarkWrapper.appendChild(template)
        }
        else{
            alert("You already have this bookmark")
        }
    }
})

bookmarkWrapper.addEventListener("click" , function (event) {
    let currentRemove = event.target.dataset.removeId
    if (currentRemove) {
        let RemObject = document.querySelector(`.${currentRemove}`)
        RemObject.remove()
        for (let i = 0; i < deleteArray.length; i++) {
            currentRemove == deleteArray[i].id 
            deleteArray.splice(deleteArray[i] , 1 )
        }
        
    }
})

  

function renderPageBtns(array) {
    elPaginationWrapper.innerHTML = null
    pages = Math.ceil(array.length / itemsPerPage)
    
    let newFragment = document.createDocumentFragment();
    
    for (let i = 1; i <= pages; i++) {
        let newLi = document.createElement("li");
        newLi.textContent = i.toString();
        newLi.dataset.pageNumber = i.toString();
        newLi.setAttribute("class", "page-item page-link");
        newFragment.appendChild(newLi);
    }
    
    elPaginationWrapper.appendChild(newFragment);
}

function sliceMoviesByPages(array, page) {
    let slicedArray = array.slice((page-1) * itemsPerPage, itemsPerPage * page);
    console.log(slicedArray);
    return slicedArray
}

elPaginationWrapper.addEventListener("click", function(evt) {
    let currentPage = evt.target.dataset.pageNumber

    let slicedmovies = sliceMoviesByPages(newArray, currentPage)

    render(slicedmovies , elWrapper)
})