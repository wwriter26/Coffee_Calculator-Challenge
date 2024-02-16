//object to store the coworkers at Bertram
const coworkers = [
  {
    name: "Bob O.",
    MoneySpent: 0
  },
  {
    name: "Jeremy T.",
    MoneySpent: 0
  },
  {
    name: "Sarah T.",
    MoneySpent: 0
  },
  {
    name: "Alex F.",
    MoneySpent: 0
  },
  {
    name: "Jessica F.",
    MoneySpent: 0
  },
  {
    name: "Chris S.",
    MoneySpent: 0
  },
  {
    name: "David S.",
    MoneySpent: 0
  }
];

//Adding a new coworker to the coworkers array
document.getElementById('cc_coworker_button').addEventListener('click', function() {
  const coworkerName = document.getElementById('cc_coworker_input').value; //getting user inputted name

  // Check if input value is not empty
  if (coworkerName.trim() !== "") {
    // Add new object to the coworker array
    coworkers.push({
      name: coworkerName,
      MoneySpent: 0
    });
    //reloading the heap with the new coworker
    coworkers.forEach(function(coworker) {
      // console.log(coworker);
      minHeap.insert(coworker);
    });

    // Clear the input field
    document.getElementById("cc_coworker_input").value = "";

    // Log the updated array to console
    console.log(coworkers);
  } else {
    //handles the user clicking the button without entering a name
    alert("Please enter a name.");
  }
});


