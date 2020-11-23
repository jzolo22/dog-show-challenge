
// ----------Variable definitions---------- //

const tableBody = document.querySelector("#table-body")
const dogForm = document.querySelector("#dog-form")


// ----------Function definitions---------- //

function fetchDogs() {
    fetch("http://localhost:3000/dogs")
    .then(r => r.json())
    .then(dogsArray => dogsArray.forEach(dog => renderDog(dog)))
}

function renderDog(dogObj) {
    const row = document.createElement("tr")
    row.dataset.id = dogObj.id
    row.innerHTML = `
    <td>${dogObj.name}</td> 
    <td>${dogObj.breed}</td> 
    <td>${dogObj.sex}</td> 
    <td><button>Edit Dog</button></td>
    `
    tableBody.append(row)
}

function fillInForm(dogObj) {
    dogForm.name.value = dogObj.name
    dogForm.breed.value = dogObj.breed
    dogForm.sex.value = dogObj.sex
}

function handleEditButton(event) {
    if (event.target.matches("button") ) {
        const tr = event.target.closest("tr")
        const dogId = tr.dataset.id
        
        fetch(`http://localhost:3000/dogs/${dogId}`)
        .then(r => r.json())
        .then(dogObj => fillInForm(dogObj))
        
        dogForm.addEventListener("submit", event => {
            event.preventDefault()

            const updatedDog = {
                name: dogForm.name.value,
                breed: dogForm.breed.value,
                sex: dogForm.sex.value
            }
            
            fetch(`http://localhost:3000/dogs/${dogId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedDog)
            })

            dogForm.reset()
            fetchDogs()
        })
    }
}



// ----------Event Handlers---------- //

tableBody.addEventListener("click", handleEditButton)




// ----------Initialize---------- //

fetchDogs()