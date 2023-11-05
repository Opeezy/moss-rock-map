const searchBar = document.getElementById("search")

function filterProblems () {
    let input = searchBar.value
    console.log(input)

    if (input === "") {
        reloadList()
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
    }
}

