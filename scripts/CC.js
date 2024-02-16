const carouselList = document.querySelector('.cc_carousel__list');
const carouselItems = document.querySelectorAll('.cc_carousel__item');
const elems = Array.from(carouselItems);
// const priceInputField = document.querySelector('.cc_price_input');
// const coworkerInputField = document.querySelector('.cc_coworker_input');
const cardElement = document.querySelectorAll('.cc_onCard');
var clickedInput = false;

// This is looping through each card element and adding an event listener to each one which will, in the carouselList add event listener, check if the clicked element is a card element. If it is, it will return and not do anything. If it is not, it will run the update function.
// This prevents the carousel from moving when the user clicks on the input fields.
cardElement.forEach(function(element) {
  console.log('element', element);
  element.addEventListener('click', function (event) {
    clickedInput = true;
    // console.log('clickedInput', clickedInput);
    return;
  })
});

carouselList.addEventListener('click', function (event) {
  var newActive = event.target; // gets the DOM element that was clicked
  var isItem = newActive.closest('.cc_carousel__item'); //gets the closest carousel item to the clicked action
  if (!isItem || clickedInput === true) { // if the user simply clicked the front item or the card contents, return out of this function
    clickedInput = false;
    // console.log('clickedInput', clickedInput);
    return;
  }

  update(newActive); // Otherwise call update function
});

// Updating the position of the carousel items when they are clicked.
const update = function(newActive) {
  const newActivePos = parseInt(newActive.dataset.pos, 10); // gets the position of the clicked item(declared in the HTML data-pos attribute)

  elems.forEach(item => { //looping through each item in the carousel
    var itemPos = parseInt(item.dataset.pos, 10);
    var newPos = itemPos - newActivePos; // altering the position of the clicked item
    
    //conditionals that maintain the carousel's position
    if (newPos < -1) {
      newPos += 3;
    } else if (newPos > 1) {
      newPos -= 3;
    }

    item.dataset.pos = newPos; // updating each item's position
  });
};


