function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function createTags (tags) {
    let newTags = ""

    for (t in tags) {
        newTags = newTags + ` ${tags[t]}`
    }

    return newTags
}

function createProblems(name, grade, tags, difficulty, id) {
    let newCard = document.createElement("button")
    let nameElement = document.createElement("h4")
    let gradeElement = document.createElement("p")
    let gradeSpan = document.createElement("span")
    let tagElement = document.createElement("p")
    let unpackedTags = createTags(tags)
    let elementTags = `${unpackedTags} ${name} ${grade}`

    newCard.setAttribute("class", "problem-card")
    newCard.setAttribute("data-bs-toggle", "modal")
    newCard.setAttribute("data-bs-target", "#staticBackdrop")
    newCard.setAttribute("tags", elementTags)
    newCard.setAttribute("value", name)
    nameElement.setAttribute("class", "problem-text")
    gradeElement.setAttribute("class", "problem-text")
    tagElement.setAttribute("class", "problem-text")

    gradeSpan.innerHTML = grade

    if (difficulty === "easy-dot") {
        gradeSpan.setAttribute("class", "easy")
    } else if (difficulty === "intermediate-dot") {
        gradeSpan.setAttribute("class", "intermediate")
    } else if (difficulty === "hard-dot") {
        gradeSpan.setAttribute("class", "hard")
    }
    
    nameElement.innerHTML = name
    gradeElement.innerHTML = `Grade: `
    gradeElement.appendChild(gradeSpan)
    tagElement.innerHTML = `Tags: ${unpackedTags}`

    newCard.appendChild(nameElement)
    newCard.appendChild(gradeElement)
    newCard.appendChild(tagElement)

    newCard.onclick = setModal

    problemList.appendChild(newCard)

    let newDot = document.createElement("button")
    newDot.classList.add("problem")
    newDot.classList.add(difficulty)
    newDot.setAttribute("value", name)
    newDot.setAttribute("type", "button")
    newDot.setAttribute("data-bs-toggle", "modal")
    newDot.setAttribute("data-bs-target", "#staticBackdrop")
    newDot.setAttribute("id", id)
    newDot.setAttribute("tags", elementTags)
    newDot.setAttribute("value", name)
    newDot.onclick = setModal

    overlay.appendChild(newDot)
}

function reloadProblems () {
    removeAllChildNodes(problemList)
    removeAllChildNodes(overlay)
    for (problem in problems) {
        let p = problems[problem]
        createProblems(p.name, p.grade, p.tags, p.difficulty, p.id)
    }
}

function addCarouselImage (image, count) {
    console.log(`added ${image}`)

    let cActive = document.createElement("div")
    cActive.classList.add("carousel-item")

    let cImage = document.createElement("img")
    cImage.classList.add("d-block")
    cImage.classList.add("w-100")
    cImage.setAttribute("src", image)

    let indicator = document.createElement("button")
    indicator.setAttribute("type", "button")
    indicator.setAttribute("data-bs-target", "#carouselExampleIndicators")
    indicator.setAttribute("data-bs-slide-to", `${count}`)
    indicator.setAttribute("aria-current", "true")
    indicator.setAttribute("aria-label", `Slide ${count+1}`)

    if (count === 0) {
        cActive.classList.add("active")
        indicator.classList.add("active")
    }

    cActive.appendChild(cImage)
    carousel.appendChild(cActive)
    carouselIndicators.appendChild(indicator)

}

function setModal () {
    let value = this.value
    let title = document.getElementById("modal-title")
    let body = document.getElementById("modal-body")
    body.innerHTML = "..."
    let count = 0
    console.log(value)

    for (problem in problemImages) {
        let p = problemImages[problem]
        if (value.toLowerCase() === p.name.toLowerCase()) {
            for (image in p.images) {
                let img = p.images[image]
                addCarouselImage(img, count)
                count++
            }
        }
    }

    for (description in problemDescriptions) {
        let d = problemDescriptions[description]

        if (value.toLowerCase() === d.name.toLowerCase()) {
            body.innerHTML = d.description
        }
    }

    title.innerHTML = value
}

function clearModalImages () {
    removeAllChildNodes(carouselIndicators)
    removeAllChildNodes(carousel)
}

function filterProblems () {
    let input = searchBar.value.toLowerCase()
    reloadProblems()    
    
    for (problem of problemList.children) {
     let t = problem.getAttribute("tags").toLowerCase()

     if (!t.includes(input) && !problem.classList.contains("problem-invis")) {
         problem.classList.toggle("problem-invis")
     } 
    }
    
    for (dots of overlay.children) {
     let d = dots.getAttribute("tags").toLowerCase()

     if (!d.includes(input) && !dots.classList.contains("problem-invis")) {
         dots.classList.toggle("problem-invis")
     } 
    }   
}

function clearedSearch () {
    let value = searchBar.value
    console.log("working")
    
    if (value === "") {
        reloadProblems
    }
}