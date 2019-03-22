'use strict'

window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');

  const DOG_URL = 'http://localhost:3000/pups'
  let DOGS = []

  fetchDogs()
  function fetchDogs() {
    fetch(DOG_URL)
      .then(response => {
        return response.json()
      })
      .then(json => {
        DOGS = json
        renderDogs(DOGS)
      })
  }

  function renderDogs(dogs) {
    const dogBar = document.getElementById('dog-bar')
    for (let dog of dogs) {
      let span = document.createElement('span')
      span.textContent = dog.name
      span.id = 'spano'
      span.addEventListener('click', () => {
        showPup(dog)
      })
      dogBar.appendChild(span)
    }
  }

  function showPup(dog) {
    const dogInfo = document.getElementById('dog-info')
    let h2 = document.createElement('h2')
    let img = document.createElement('img')
    let button = document.createElement('button')
    button.addEventListener('click', () => {
      toggleButton(dog, button)
    })

    h2.textContent = dog.name
    img.src = dog.image
    if (dog.isGoodDog === true) {
      button.textContent = "Good Dog!"
    } else {
      button.textContent = "Bad Dog!"
    }
    while (dogInfo.firstChild) {
      dogInfo.firstChild.remove()
    }
    dogInfo.appendChild(img)
    dogInfo.appendChild(h2)
    dogInfo.appendChild(button)
  }

  function toggleButton(dog, button) {

    if (button.innerText === "Good Dog!") {
      button.textContent = "Bad Dog!"
      dog.isGoodDog = false
    } else {
      button.textContent = "Good Dog!"
      dog.isGoodDog = true
    }
    fetch(DOG_URL + `/${dog.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isGoodDog: dog.isGoodDog })
    })
      .then(response => {
        return response.json()
      })
      .then(json => {
        showPup(json)
      })
  }

  const filter = document.getElementById("good-dog-filter")

  filter.addEventListener('click', () => {
    console.log(filter.textContent)
    // const dogBar = document.getElementById('dog-bar')
    if (filter.innerText === 'Filter good dogs: OFF') {
      filter.innerText = 'Filter good dogs: ON'
      // goodBoi(DOGS)
    } else {
      filter.innerText = "Filter good dogs: OFF"
      // dogBar.style.display = "block";
    }
  })

});

// function goodBoi(dogs) {
//   const dogBar = document.getElementById('dog-bar')
//   for (let dog of dogs)
//     if (dog.isGoodDog === false) {
//       dogBar.style.display = "block"
//     } else {
//       dogBar.style.display = "none";
//     }
// }
