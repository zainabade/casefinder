
const form = document.querySelector('.case-info');
const caseName = document.querySelector('#case-name');
const caseCitation = document.querySelector('#case-citation');
const addBtn = document.querySelector('#add-case');
const message = document.querySelector('#case-success');
const search = document.querySelector('#search');
const suggestions = document.querySelector('#results');


function Case(name, citation) {
    this.name = name;
    this.citation = citation;
}

// let cases = []; // have to define cases OUTSIDE of the storeCase function otherwise it gets reinitialised each time 

let cases = JSON.parse(localStorage.getItem("cases"));
if (localStorage.getItem("cases") === null) {
    cases = [];
} 

function storeCase() {

    const validateMessage = document.querySelector('#validate-message');

    // validate the entry
    if (caseCitation.value === '' || caseName.value === '') {
        validateMessage.style.opacity = '1';
        setTimeout(function() {
            validateMessage.style.opacity = '0.1'
        }, 3000);
    } else {
        // instantiate a case object
        var currentCase = new Case(caseName.value, caseCitation.value);
        cases.push(currentCase);
        localStorage.setItem("cases", JSON.stringify(cases));

        form.reset();

        message.style.opacity = '1';
        setTimeout(function() {
            message.remove();
        }, 3000);
        addCasetoList(currentCase);
    }

}

addBtn.addEventListener('click', storeCase)

function addCasetoList(currentCase) {
    const list = document.querySelector('.case-contain');

    const listRow = document.createElement('div');
    listRow.setAttribute('class', 'row');

    listRow.innerHTML = `
    <div class="case-contain-name">${currentCase.name}</div>
    <div class="case-contain-citation">${currentCase.citation}</div>
    `
    // list.appendChild(listRow);
    list.prepend(listRow);
}



function displayRecentCases() {
    for (let i = cases.length-1; i > cases.length - 6; i--) {
        addCasetoList(cases[i]);
    }
}


document.addEventListener('DOMContentLoaded', displayRecentCases);



function findMatchedCases(wordToMatch, cases) {
    const regexp = new RegExp(wordToMatch, "gi");
    console.log(regexp);
    const matchedCases = cases.filter(caseInst => {
        return caseInst.name.match(regexp) || caseInst.citation.match(regexp)
    })
    console.log(matchedCases)
    showCases(matchedCases);
}

function showCases(matchedCases) {
    const html = matchedCases.map(matchedCase => {
        const fields = document.createElement('ul');
        fields.className = 'row';
        return `
        <li class="listseparate">${matchedCase.name} ${matchedCase.citation}</li>
        `
    }).join('');
    suggestions.innerHTML = html;
}

// function showCases(matchedCases) {
//     const html = matchedCases.map(matchedCase => {
//             const elements = document.createElement('ul');
//             elements.className = 'row';
//             elements.innerHTML = `
//             <li class="listseparate">${matchedCase.name} ${matchedCase.citation}</li>
//             `
//         return elements.textContent;
//     });
//     suggestions.innerHTML = html;
// }


function displayMatchedCases() {
    // displaying the matched cases on the screen
    const result = findMatchedCases(this.value, cases);
    // const html = result.map(caseInst => {
    //     const regex = new RegExp(this.value, 'gi');
    //     const caseName = caseInst.name.replace(regex, `<span class="hl">${this.value}</span>`);
    //     const caseCitation = caseInst.citation.replace(regex, `<span class="hl">${this.value}</span>`);
    //     return `
    //     <li> 
    //     <span class="name">${caseName}, ${caseCitation}</span>
    //     </li>
    //     `;
    // }).join('')
    // suggestions.innerHTML = html;
}

search.addEventListener('keyup', displayMatchedCases);








