const DOGS_URL = 'http://localhost:3000/pups'

const dogsDiv = document.getElementById('dog-bar')
const oneDog = document.getElementById('dog-info')

fetch(DOGS_URL)
.then(response => response.json())
.then(json => {fillBar(json)})

function fillBar(dogs) {
    for(let dog of dogs) {
        let span = document.createElement('span')
        span.innerText = dog.name
        span.addEventListener('click', () => {showDog(dog)})

        dogsDiv.appendChild(span)
    }
}

function showDog(dog){
    oneDog.innerText = ''
    let img = document.createElement('img')
    img.src = dog.image
    let h2 = document.createElement('h2')
    h2.innerText = dog.name

    oneDog.appendChild(img)
    oneDog.appendChild(h2)

    let btn = document.createElement('button')
    if(dog.isGoodDog === true){
        btn.innerText = "Bad Dog!"}
        else {
            btn.innerText = "Good Dog!"
        }
    btn.addEventListener('click', () => {updateGoodDog(dog)})

    let bt2 = document.createElement('button')
    bt2.innerText = 'Update Pic'
    bt2.addEventListener('click', () => {
        updatePic(dog)
    })

    oneDog.appendChild(btn)
    oneDog.appendChild(bt2)
}

function updateGoodDog(dog){
    let patchData = JSON.stringify({'isGoodDog': !dog.isGoodDog})

    if(fetch(`${DOGS_URL}/${dog.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: patchData
    })){
    dog.isGoodDog = !dog.isGoodDog
    showDog(dog)}
    else {
        alert('Network error!')
        location.reload()
    }
}

function updatePic(dog) {
    
    let i = document.createElement('input')
    i.id = "url"
    i.placeholder = 'New Pic URL Here'
    let span = document.createElement('span')
    let butt = document.createElement('button')
    butt.innerText = 'Update!'
    span.appendChild(butt)
    oneDog.appendChild(span)
    butt.addEventListener('click', () => {
        complete(dog, i)
    })
    document.body.appendChild(i)
    oneDog.appendChild(i)
}

function complete(dog, url){

    let patchData = JSON.stringify({'image': url.value})

    if(fetch(`${DOGS_URL}/${dog.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: patchData
    })){
    dog.image = url.value
    showDog(dog)}
    else {
        alert('no')
    }
}