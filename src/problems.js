const problemList = document.getElementById("problem-list")

const problems = [
    { name: "Heart Drop", grade: "V1", tags: "short, overhang, jugs" },
    { name: "Road to Nowhere", grade: "V6", tags: "technical, powerful" },
    { name: "Shapeshifter", grade: "V4", tags: "short, powerful, sloper" },
    { name: "Solution", grade: "V5", tags: "short, powerful" },
    { name: "Godfather", grade: "V10", tags: "long, overhang, technical" }
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

function fillList () {
    for (problem in problems) {
        let p = problems[problem]
        createCard(p.name, p.grade, p.tags)
    }
}

