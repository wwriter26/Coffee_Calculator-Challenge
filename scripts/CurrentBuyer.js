//Creating the function that will act as the minimum heap to get the co-worker who has spent the least amount of money
// index 0 of the heap is going to be null so that the math works out better

// MinHeap Structure:
   // left child: i * 2
   // right child: i * 2 + 1
   // parent: floor(i / 2)
let MinHeap = function() {
  this.heap = [null]; // null is added to the beginning of the array to make the math work out better

  //insert function
  this.insert = function(coworker) {
      this.heap.push(coworker);
      let currentIndex = this.heap.length - 1;
      //loop to compare the newly added coworker's MoneySpent with its parent's MoneySpent
      while (currentIndex > 1 && this.heap[Math.floor(currentIndex / 2)].MoneySpent > this.heap[currentIndex].MoneySpent) {
          let parentIndex = Math.floor(currentIndex / 2);
          //swap the parent and the current coworker
          [this.heap[parentIndex], this.heap[currentIndex]] = [this.heap[currentIndex], this.heap[parentIndex]];
          currentIndex = parentIndex;
      }
  };

  this.remove = function() {
      //accounting for the edge case of the heap only having 1(which is null) or 2 elements
      if (this.heap.length < 3) {
          return this.heap.pop();
      }
      const smallest = this.heap[1];
      this.heap[1] = this.heap.pop(); //Replaces the root of the heap with the last element in the heap.
      let currentIndex = 1;
      let leftChildIndex = 2 * currentIndex;
      let rightChildIndex = 2 * currentIndex + 1;

      //looping as long as the new root's MoneySpent is greater than either of its children's MoneySpent & if the child doesn't exist, it will be Infinity
      while (this.heap[currentIndex].MoneySpent > (this.heap[leftChildIndex]?.MoneySpent ?? Infinity) ||
              this.heap[currentIndex].MoneySpent > (this.heap[rightChildIndex]?.MoneySpent ?? Infinity)) {
          //Checks if the left child's MoneySpent is less than the right child's accounting for non-existent right child
          if ((this.heap[leftChildIndex]?.MoneySpent ?? Infinity) < (this.heap[rightChildIndex]?.MoneySpent ?? Infinity)) {
              [this.heap[currentIndex], this.heap[leftChildIndex]] = [this.heap[leftChildIndex], this.heap[currentIndex]];
              currentIndex = leftChildIndex;
          //Checks if the right child's MoneySpent is less than the left child's accounting for non-existent left child
          } else if (rightChildIndex < this.heap.length) { // Check if right child exists
              [this.heap[currentIndex], this.heap[rightChildIndex]] = [this.heap[rightChildIndex], this.heap[currentIndex]];
              currentIndex = rightChildIndex;
          }
          leftChildIndex = 2 * currentIndex;
          rightChildIndex = 2 * currentIndex + 1;
      }

      return smallest;
  };

  this.peek = function() { //returns the root of the heap(min value)
      return this.heap[1];
  };

  this.sort = function() { //defines the sort method
      const result = [];
      while (this.heap.length > 1) {
          result.push(this.remove());
      }
      return result;
  };
};

//Creating a new instance of the MinHeap
let minHeap = new MinHeap();
//Adding the money spent by each coworker to the min heap
coworkers.forEach(function(coworker) {
  // console.log(coworker);
  minHeap.insert(coworker);
});
// console.log("test:", minHeap.peek().name);
// console.log(minHeap.sort());

// displaying who's turn it is to pay through the heap
function updateBuyer() {
  const buyer = document.getElementById('cc_curr_buyer');
  
  // Start with an empty string to reset the list or create a new list
  let content = '';
  content += `<p>${minHeap.peek().name}</p>`;
  buyer.innerHTML = content;
}
const submitButton = document.getElementById('cc_submit_button');

submitButton.addEventListener('click', function() {
  const price = parseFloat(document.getElementById('cc_price_input').value);
  //console.log("price", typeof(price), price);
  if (Number.isFinite(price) && price > 0) {
    let currentMin = minHeap.remove(); // Removing the current minimum
    currentMin.MoneySpent += price; // Update its MoneySpent
    //console.log("test",minHeap.sort());
    minHeap.insert(currentMin); // Re-insert it to maintain heap property
    updateBuyer(); // calls the updateBuyer function
    document.getElementById("cc_price_input").value = ""; 
    console.log(coworkers);
  } else {
    alert("Please enter a valid number.");
    document.getElementById("cc_price_input").value = ""; 
  }
});
window.onload = updateBuyer; // initial call to updateBuyer so that the first buyer is displayed when the page loads

