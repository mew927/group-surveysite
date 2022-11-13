// IIFE -- Imediately Invoked Function Expression

(function () {
  function Start() {
    console.log("App Started...");

    let deleteButtons = document.querySelectorAll('#deleteBtn');

    for (button of deleteButtons) {
      button.addEventListener("click", (event) => {
        if (!confirm("Are you sure?")) {
          event.preventDefault();
          window.location.reload();
        }
      });
    }
  }


  window.addEventListener("load", Start);
})();
