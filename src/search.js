const searchBar = document.getElementById("search")

function filterProblems () {
    let input = searchBar.value

    if (input === "") {
        reloadList()
        reloadDots()
    } else {
        removeAllChildNodes(problemList)
        for (problem in problems) {
            let p = problems[problem]
            let pName = p.name.toLowerCase()
            let pGrade = p.grade.toLowerCase()
            let pTags = p.tags.toLowerCase()
            if (pName.includes(input)|| pGrade.includes(input)||pTags.includes(input))
            createCard(p.name, p.grade, p.tags)
        }
        for (let i = 0; i < pDots.length; i++) {
            console.log("what")
            let pd = pDots[i]
            let value = pd.value.toLowerCase()
            
            if (!value.includes(input)) {
                if (!pd.classList.contains("problem-invis")) {
                    pd.classList.toggle("problem-invis")
                }
            } else {
                pd.classList.remove("problem-invis")
            }
        }
    }
}

