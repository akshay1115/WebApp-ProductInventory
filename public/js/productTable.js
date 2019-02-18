$(document).ready(function() {
  $("#p_table").DataTable();
});

var addButton = document.getElementById("btnAdd");
addButton.addEventListener("click", function() {
  location.href = "/products/new";
});
