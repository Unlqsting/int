
// Get the modal
var dModalContent = document.getElementById("dModalContent");

// Get the button that opens the modal
var btn = document.getElementById("diagram1");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on a diagram, open the modal
function openDiagramModal() {
    dModalContent.style.display = "flex";
  }


// When the user clicks on <span> (x), close the modal
function closeDiagramModal() {
  dModalContent.style.display = "none";
}


accountIcon = document.getElementById("account-icon");

accountIcon.addEventListener("click", function() {
  document.getElementById("account-dropdown").style.display = "flex";
})