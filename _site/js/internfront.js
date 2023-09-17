// Get the modal
var dModalContent = document.getElementById("diagramModal");

var diagramModal = document.getElementById("diagramModal");
// Get the button that opens the modal
var btn = document.getElementById("diagram1");

// Get the close button
var span = document.getElementsByClassName("close")[0];

// When the user clicks on a diagram, open the modal
function openDiagramModal(event) {
  dModalContent.style.display = "block";
  //append the diagram to the modal
  var clickedDiagram = event.target.querySelector("svg");
  var clonedDiagram = clickedDiagram.cloneNode(true);
  var modalContent = diagramModal.querySelector(".dModalContent");
  modalContent.innerHTML = ""; // Clear any existing content
  modalContent.appendChild(clonedDiagram);

}

// When the user clicks on the close button, close the modal
span.addEventListener("click", function() {
  dModalContent.style.display = "none";
});

// When the user clicks outside the modal, close it
window.addEventListener("click", function(event) {
  if (event.target == dModalContent) {
    dModalContent.style.display = "none";
  }
});

btn.addEventListener("click", openDiagramModal);
