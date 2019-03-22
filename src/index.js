document.addEventListener('DOMContentLoaded', function() {fetchDogs()})

const DOGURL = 'http://localhost:3000/pups'

function fetchDogs() {
  fetch(DOGURL)
  .then(res => res.json())
  .then(json => {
    console.log(json)
    createThePups(json)
  })
}

function createThePups(json) {
  console.log('creating pup')
  json.forEach((dog => {
    let div = document.getElementById('dog-bar')
    let span = document.createElement('span')
    span.addEventListener('click', function() {
      showDogInfo(dog)
    })

    span.textContent = dog.name
    div.appendChild(span)
  }))
}

function showDogInfo(dog) {

  let info = document.getElementById('dog-info')
  while (info.firstChild) {
    info.removeChild(info.firstChild)
  }

  let img = document.createElement('img')
  img.src = dog.image
  let h2 = document.createElement('h2')
  h2.textContent = dog.name

  let btn = document.createElement('button')
  if (dog.isGoodDog === true) {
    btn.textContent = 'Good Dog!'
  } else {
    btn.textContent = 'Bad Dog!'
  }
  btn.addEventListener('click', function(ev) {
    ev.preventDefault();
    changeDogGoodness(dog, btn)
  })

  info.appendChild(h2)
  info.appendChild(img)
  info.appendChild(btn)
}

function updateDogGoodness(dog) {
  console.log('updating dog goodness')
  btn = document.getElementById('id')
}

function changeDogGoodness(dog, btn) {
  data = {'isGoodDog': !(dog.isGoodDog)}
  console.log('changing dog goodness or badness')
  fetch(DOGURL + `/${dog.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(function() {
    updateDogGoodness(dog)
  })
}
