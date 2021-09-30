document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:3000/ramens')
    .then((resp) => resp.json())
    .then((json)=> loadRamenImage(json))

    function loadRamenImage(data){
        const imageHome = document.querySelector('#ramen-menu')
        data.forEach(data => {
            const img = document.createElement('img');
            img.src = data.image
            img.id = data.id
            imageHome.appendChild(img).addEventListener('click', () => fetchDetails(img.id))
        })
    }

    function fetchDetails(id){
        fetch(`http://localhost:3000/ramens/${id}`)
        .then((resp)=> resp.json())
        .then((json)=> showDetails(json))
    
        }
    function showDetails(ramen){
        const imagePlace = document.querySelector('.detail-image')
        imagePlace.src = ramen.image
        const ramenName = document.querySelector('.name')
        ramenName.innerHTML = ramen.name
        const restaurantName = document.querySelector('.restaurant')
        restaurantName.innerHTML = ramen.restaurant
        const rating = document.querySelector('#rating-display')
        rating.innerHTML = ramen.rating
        const comment = document.querySelector('#comment-display')
        comment.innerHTML = ramen.comment
    }
    const ramenForm = document.querySelector('#new-ramen')
    ramenForm.addEventListener('submit', addNewRamen)

    function addNewRamen(e){
        e.preventDefault()
        const newRamenName = document.querySelector('#new-name').value
        const newRamenRestaurant = document.querySelector('#new-restaurant').value
        const newRamenImage = document.querySelector('#new-image').value
        const newRamenRating = document.querySelector('#new-rating').value
        const newRamenComment = document.querySelector('#new-comment').value
        let newRamenInfo = {
            image : `${newRamenImage}`,
            name : `${newRamenName}`,
            restaurant : `${newRamenRestaurant}`,
            rating : `${newRamenRating}`,
            comment : `${newRamenComment}`,

        }
        const newImgHome = document.querySelector('#ramen-menu')
        
        function addImageToMenu(image){
            const newImg = document.createElement('img')
            newImg.src = image
            newImgHome.appendChild(newImg).addEventListener('click',() => showDetails(newRamenInfo))
        }
        addImageToMenu(newRamenImage)
        ramenForm.reset();

    }
})