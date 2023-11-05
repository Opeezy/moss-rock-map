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
            if (pName.includes(input))
            createCard(p.name, p.grade, p.tags)
        }
    }
}

