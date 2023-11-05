const problemList = document.getElementById("problem-list")
const pDots = document.getElementsByClassName("problem")
const overlay = document.getElementById("overlay")

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const problems = [
    { name: "Heart Drop", grade: "V1", tags: "short, overhang, jugs" },
    { name: "Road to Nowhere", grade: "V6", tags: "technical, powerful" },
    { name: "Shapeshifter", grade: "V4", tags: "short, powerful, sloper" },
    { name: "Solution", grade: "V5", tags: "short, powerful" },
    { name: "Godfather", grade: "V10", tags: "long, overhang, technical" }
]

const dots = [
    { value: "Heart Drop", difficulty: "easy-dot", id: "heart-drop" },
    { value: "Shapeshifter", difficulty: "intermediate-dot", id: "shapeshifter" },
    { value: "Solution", difficulty: "intermediate-dot", id: "solution" },
    { value: "Road to Nowhere", difficulty: "intermediate-dot", id: "road-to-nw" },
    { value: "Godfather", difficulty: "hard-dot", id: "godfather" }
]

const easy = ["V0", "V1", "V2", "V3"]
const intermediate = ["V4", "V5", "V6"]
const hard = ["V7", "V8", "V9", "V10"]

function createCard (name, grade, tags) {
    let newCard = document.createElement("div")
    let nameElement = document.createElement("h4")
    let gradeElement = document.createElement("p")
    let gradeSpan = document.createElement("span")
    let tagElement = document.createElement("p")

    newCard.setAttribute("class", "problem-card")
    nameElement.setAttribute("class", "problem-text")
    gradeElement.setAttribute("class", "problem-text")
    tagElement.setAttribute("class", "problem-text")

    gradeSpan.innerHTML = grade

    if (easy.includes(grade)) {
        gradeSpan.setAttribute("class", "easy")
    } else if (intermediate.includes(grade)) {
        gradeSpan.setAttribute("class", "intermediate")
    } else if (hard.includes(grade)) {
        gradeSpan.setAttribute("class", "hard")
    }
    
    nameElement.innerHTML = name
    gradeElement.innerHTML = `Grade: `
    gradeElement.appendChild(gradeSpan)
    tagElement.innerHTML = `Tags: ${tags}`

    newCard.appendChild(nameElement)
    newCard.appendChild(gradeElement)
    newCard.appendChild(tagElement)

    problemList.appendChild(newCard)
}

function createDot (top, left, difficulty, value, id) {
    let newDot = document.createElement("button")
    newDot.classList.add("problem")
    newDot.classList.add(difficulty)
    newDot.setAttribute("value", value)
    newDot.setAttribute("onClick", setModal(value))
    newDot.setAttribute("type", "button")
    newDot.setAttribute("data-bs-toggle", "modal")
    newDot.setAttribute("data-bs-target", "#staticBackdrop")
    newDot.setAttribute("id", id)

    overlay.appendChild(newDot)
}

function reloadList () {
    removeAllChildNodes(problemList)
    for (problem in problems) {
        let p = problems[problem]
        createCard(p.name, p.grade, p.tags)
    }
}

function reloadDots () {
    removeAllChildNodes(pDots)
    for (d in dots) {
        let dot = dots[d]
        createDot(dot.top, dot.left, dot.difficulty, dot.value, dot.id)
    }
}

function setModal (value) {
    let title = document.getElementById("modal-title")
    title.innerHTML = value
}

window.onload = reloadList
window.onload = reloadDots