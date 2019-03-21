// *** find all the important stuff and add basic event Listeners ***
const dogBar = document.getElementById('dog-bar')
const dogInfo = document.getElementById('dog-info')
const filterBtn = document.getElementById('good-dog-filter')

document.addEventListener('DOMContentLoaded', fetchPups)
filterBtn.addEventListener('click', filterDogText)
//**********************************************

// ***** fetch puppers and display them in the dog bar
function fetchPups(){
  fetch('http://localhost:3000/pups')
  .then(resp => resp.json())
  .then(json => {
    if(isFiltered()){ // addition to account for if filter has been put on
      json.forEach((dog) => {
        if (isFiltered() && dog.isGoodDog === true){
          addPupToDogBar(dog)
        }
      })
    } else {
      json.forEach((dog) => {
        addPupToDogBar(dog)
      })
    }
  })
}

function addPupToDogBar(dog){
  const span = document.createElement('span')
  span.textContent = dog.name
  span.addEventListener('click', () => {
    showPuppersInfo(dog)
  })
  dogBar.appendChild(span)
}
// **********************************************************

// ***** display the selected dog on the page

function showPuppersInfo(dog){
  dogInfo.innerHTML = ''
  const dogPic = document.createElement('img')
  dogPic.src = dog.image
  const dogHeading = document.createElement('h2')
  dogHeading.textContent = dog.name
  const dogButton = document.createElement('button')
  dogButton.addEventListener('click', () => {
    toggleGoodness(dog)
  })
  if(dog.isGoodDog === true){
    dogButton.textContent = "Good Dog!"
  } else {
    dogButton.textContent = "Bad Dog!"
  }

  dogInfo.appendChild(dogPic)
  dogInfo.appendChild(dogHeading)
  dogInfo.appendChild(dogButton)
}
//************************************************************

//****** toggles if dog is good or bad based on click and updates db
function toggleGoodness(dog){
  let patchBody;
  if(dog.isGoodDog){
      patchBody = {'isGoodDog': false}
  } else {
        patchBody = {'isGoodDog': true}
  }

  fetch(`http://localhost:3000/pups/${dog.id}`, {
    method:"PATCH",
    headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
    body: JSON.stringify(patchBody)
  }).then(resp => resp.json())
  .then(json => {
    showPuppersInfo(json)
  })
}
//**********************************************************

// ****** Checks to see if filter has been put on and upates the button text *****
function isFiltered(){
  return filterBtn.textContent.includes('ON') ? true : false
}

function filterDogText(){
  isFiltered() ? filterBtn.textContent = "Filter good dogs: OFF " : filterBtn.textContent =  "Filter good dogs: ON"
  dogBar.innerHTML= ''
  fetchPups()
}
// *******************************************************
