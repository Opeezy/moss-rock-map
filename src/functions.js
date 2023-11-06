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

function setModal () {
    let value = this.value
    let title = document.getElementById("modal-title")
    title.innerHTML = value
}

function filterProblems () {
    let input = searchBar.value.toLowerCase()

    if (input === "") {
        reloadProblems()
    } else {
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
}