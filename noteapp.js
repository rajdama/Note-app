shownotes()
let addbtn = document.getElementById('addbtn')
addbtn.addEventListener('click', function () {
    let addtxt = document.getElementById('addtxt')
    let notes = localStorage.getItem('notes')
    let notesObj
    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes)
    }
    notesObj.push(addtxt.value)
    localStorage.setItem("notes", JSON.stringify(notesObj))
    addtxt.value = ''
    console.log(notesObj)
    shownotes()
})

//function to show elements from local storage
function shownotes() {
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes)
    }
    let html = ''
    notesObj.forEach(function (element, index) {
        html += `
        <div class="notecard my-2 mx-2" style="width: 18rem;">       
            <div class="card-body">
              <h5 class="card-title">${index + 1}</h5>
              <p class="card-text">${element}</p>
              <button id ='${index}' onclick = 'deletenote(this.id)' class="btn btn-primary">delete note</button>
            </div>
        </div>`
    });
    let noteselem = document.getElementById('notes')
    if (notesObj.length != 0) {
        noteselem.innerHTML = html
    }
    else {
        noteselem.innerHTML = ` Nothing to show ! use "add notes" to add a note `
    }

}

//function to delete a note
function deletenote(index) {
    console.log("I am deleting", index)
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes)
    }
    notesObj.splice(index, 1)
    localStorage.setItem('notes', JSON.stringify(notesObj))
    shownotes()
}

let search = document.getElementById('searchtxt')
search.addEventListener('input', function () {
    let inputval = search.value.toLowerCase()
    console.log("input event fired", inputval)
    let notecards = document.getElementsByClassName('notecard')
    Array.from(notecards).forEach(function (element) {
        let cardtxt = element.getElementsByTagName('p')[0].innerText
        if (cardtxt.includes(inputval)) {
            element.style.display = 'block'
        }
        else {
            element.style.display = 'none'
        }

    })
})
