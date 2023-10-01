
// Diagram modal code

// Get the modal
var diagramModal = document.getElementById("diagramModal");

// Get the button that opens the modal
var btn = document.getElementById("diagram1");

// Get the close button
var span = document.getElementsByClassName("close")[0];

// When the user clicks on a diagram, open the modal
function openDiagramModal() {
    diagramModal.style.display = "block";
}

// When the user clicks on the close button, close the modal
span.addEventListener("click", function() {
  diagramModal.style.display = "none";
});

// When the user clicks outside the modal, close it
window.addEventListener("click", function(event) {
  if (event.target == diagramModal) {
    diagramModal.style.display = "none";
  }
});

// assign each diagram clicked a var id 
document.addEventListener("DOMContentLoaded", function() {
  for (var i = 1; i < 7; i++) {
      var btn = document.getElementById("diagram" + i);
      btn.addEventListener("click", openDiagramModal);
  }
}); 
