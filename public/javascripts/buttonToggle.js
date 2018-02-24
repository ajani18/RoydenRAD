$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    console.log("Button Clicked");
});

function toggleButton() {
  $("#wrapper").toggleClass("toggled");
  console.log("Button Clicked");
}
