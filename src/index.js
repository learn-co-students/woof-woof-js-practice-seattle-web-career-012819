const DOG_URL = 'http://localhost:3000/pups';
let dogBar = document.getElementById('dog-bar');
let isFilter = false;
main();
const filterButton = document.getElementById("good-dog-filter");
filterButton.addEventListener('click', ()=>{
  if(filterButton.textContent === "Filter good dogs: OFF"){
    filterButton.textContent = "Filter good dogs: ON";
    isFilter = true;
  }
  else {
    dogBar.innerHTML = "";
    filterButton.textContent = "Filter good dogs: OFF"
    isFilter = false;

    main();
  }
})
function main(){
fetch(DOG_URL)
.then(resp => resp.json())
.then(dogs =>{

  dogs.forEach(dog =>{
    createNameSpan(dog);
  })
})
}

function createNameSpan(dog){

  const nameSpan = document.createElement('span');
  if(isFilter){
    if(dog.isGoodDog === true){
      nameSpan.textContent = dog.name;
      dogBar.appendChild(nameSpan);
    }
  }
  else{
    nameSpan.textContent = dog.name;
    dogBar.appendChild(nameSpan);
  }


  nameSpan.addEventListener('click', ()=>{
    fetch(DOG_URL + `/${dog.id}`)
    .then(resp => resp.json())
    .then(dogSpan =>{
      showInfo(dogSpan);
    })
  })
}

function showInfo(dogSpan){
  const dogInfo = document.getElementById("dog-info");
  dogInfo.innerHTML = "";
  const dogImg = document.createElement("img");
  dogImg.src = dogSpan.image;
  const dogName = document.createElement("h2");
  dogName.textContent = dogSpan.name;
  const dogButton = document.createElement('button');
  if(dogSpan.isGoodDog){
    dogButton.textContent = "Good Dog";
  }else{
    dogButton.textContent = "Terrible Dog";
  }
  dogInfo.appendChild(dogImg);
  dogInfo.appendChild(dogName);
  dogInfo.appendChild(dogButton);

  dogButton.addEventListener('click', ()=>{
    if(dogSpan.isGoodDog){
      dogSpan.isGoodDog = false;
    }
    else{
      dogSpan.isGoodDog = true;
    }
    fetch(DOG_URL +`/${dogSpan.id}`,{
      method: "PATCH",
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({isGoodDog: dogSpan.isGoodDog })
    })
    if(dogSpan.isGoodDog){
      dogButton.textContent = "Good Dog";
    }else{
      dogButton.textContent = "Terrible Dog";
    }
  })
}
