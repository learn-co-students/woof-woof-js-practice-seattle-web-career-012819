const DOGGOS_URL = "http://localhost:3000/pups";

function requestDoggos() {
  fetch(DOGGOS_URL)
  .then(response => {
    return response.json();
  })
  .then(json => {
    json.forEach((doggo) => {
      createDoggo(doggo);
    });
  });
}
requestDoggos();

function createDoggo(dog) {
  const dogBarDiv = document.getElementById('dog-bar');
  const span = document.createElement('span');
  span.textContent = dog.name;

  dogBarDiv.appendChild(span);

  span.addEventListener('click', () => {
    showDoggo(dog);
  });
}

function showDoggo(dog) {
  const dogInfoDiv = document.getElementById('dog-info');
  dogInfoDiv.innerHTML = '';
  const img = document.createElement('img');
  img.src = dog.image;
  const h2 = document.createElement('h2');
  h2.textContent = dog.name;
  const button = document.createElement('button');
  button.setAttribute('id', dog.id);
  button.textContent = "Good Dog!";

  dogInfoDiv.appendChild(img);
  dogInfoDiv.appendChild(h2);
  dogInfoDiv.appendChild(button);

  button.addEventListener('click', () => {
    toggleDoggo(dog);
  });
}

function toggleDoggo(dog) {
  const button = document.getElementById(dog.id);
  const requestInfo = {
    method: 'PATCH',
    headers: {
      "Content-Type": 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      isGoodDog: !dog.isGoodDog
    })
  };

  fetch(DOGGOS_URL + `/${dog.id}`, requestInfo)
  .then(results => {
    return results.json();
  })
  .then(json => {
    console.log(json.isGoodDog);
    dog.isGoodDog = json.isGoodDog;
    if (json.isGoodDog === false) {
      button.textContent = 'Bad Dog!';
    } else {
      button.textContent = 'Good Dog!';
    }
  })
}
