// IIFE -- Imediately Invoked Function Expression

(function () {
  function Start() {
    console.log("App Started...");

    let deleteButtons = document.querySelectorAll('#deleteBtn');

    for (button of deleteButtons) {
      button.addEventListener("click", (event) => {
        if (!confirm("Are you sure to delete it?")) {
          event.preventDefault();
          window.location.reload();
        }
      });
    }
  }

    // download tf report
    $("body").on("click", "#btnExport1", function () {
      html2canvas($('#tftable')[0], {
          onrendered: function (canvas) {
              var data = canvas.toDataURL();
              var docDefinition = {
                  content: [{
                      image: data,
                      width: 500
                  }]
              };
              pdfMake.createPdf(docDefinition).download("TF-details.pdf");
          }
      });
      
  });
    // download mcq report
  $("body").on("click", "#btnExport2", function () {
    html2canvas($('#mcqtable')[0], {
        onrendered: function (canvas) {
            var data = canvas.toDataURL();
            var docDefinition = {
                content: [{
                    image: data,
                    width: 500
                }]
            };
            pdfMake.createPdf(docDefinition).download("MC-details.pdf");
        }
    });
    
  });

  window.addEventListener("load", Start);
})();
