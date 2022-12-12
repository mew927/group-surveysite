// IIFE -- Imediately Invoked Function Expression

(function () {
  function Start() {
    console.log("App Started...");

    let deleteButtons = document.querySelectorAll("#deleteBtn");

    for (button of deleteButtons) {
      button.addEventListener("click", (event) => {
        if (!confirm("Are you sure to delete it?")) {
          event.preventDefault();
          window.location.reload();
        }
      });
    }
  }

  //If there are no questions, display empty chart - TF Questions results
  if (typeof valuet === "undefined") {
    valuet = 0;
  }
  if (typeof valuef === "undefined") {
    valuef = 0;
  }
  if (typeof tfChartTitle === "undefined") {
    tfChartTitle = "Question unavailable";
  }

  //The bar chart for the first question is displayed by default - TF Questions results
  let tfChart1 = {
    labels: ["Yes", "No"],
    datasets: [
      {
        data: [valuet, valuef],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  let tfOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    legend: { display: false },
    title: {
      display: true,
      text: tfChartTitle,
    },
  };

  new Chart("tfChart", {
    type: "bar",
    data: tfChart1,
    options: tfOptions,
  });

  //If there are no questions, display empty chart - MC Questions results
  if (typeof text1 === "undefined") {
    text1 = "Option A";
  }
  if (typeof text2 === "undefined") {
    text2 = "Option B";
  }
  if (typeof text3 === "undefined") {
    text3 = "Option C";
  }
  if (typeof text4 === "undefined") {
    text4 = "Option D";
  }
  if (typeof value1 === "undefined") {
    value1 = 0;
  }
  if (typeof value2 === "undefined") {
    value2 = 0;
  }
  if (typeof value3 === "undefined") {
    value3 = 0;
  }
  if (typeof value4 === "undefined") {
    value4 = 0;
  }
  if (typeof chartTitle === "undefined") {
    chartTitle = "Question unavailable";
  }

  //The bar chart for the first question is displayed by default - MC Questions results
  let dataChart = {
    labels: [text1, text2, text3, text4],
    datasets: [
      {
        data: [value1, value2, value3, value4],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  let options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    legend: { display: false },
    title: {
      display: true,
      text: chartTitle,
    },
  };

  new Chart("myChart", {
    type: "bar",
    data: dataChart,
    options: options,
  });

  //When clicking on any question, show the corresponding bar char - TF Questions results
  let tTable = document.getElementById("tftable");

  for (let i = 0; i < tTable.rows.length; i++) {
    let tfrow = tTable.rows[i];
    tfrow.addEventListener("click", function () {
      let tfcol1 = this.cells[0].innerHTML;
      let tfcol2 = this.cells[1].innerHTML;
      let tfcol3 = this.cells[2].innerHTML;

      let tfnum2 = tfcol2.match(/\d+(?=\s)/g);
      let tfnum3 = tfcol3.match(/\d+(?=\s)/g);

      let tfChart2 = {
        labels: ["Yes", "No"],
        datasets: [
          {
            data: [tfnum2, tfnum3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            borderWidth: 1,
          },
        ],
      };

      let tfoptions2 = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        legend: { display: false },
        title: {
          display: true,
          text: tfcol1,
        },
      };

      new Chart("tfChart", {
        type: "bar",
        data: tfChart2,
        options: tfoptions2,
      });
    });
  }

  //When clicking on any question, show the corresponding bar char - MC Questions results
  let table1 = document.getElementById("mcqtable");

  for (let j = 0; j < table1.rows.length; j++) {
    let row = table1.rows[j];
    row.addEventListener("click", function () {
      let col1 = this.cells[0].innerHTML;
      let col2 = this.cells[1].innerHTML;
      let col3 = this.cells[2].innerHTML;
      let col4 = this.cells[3].innerHTML;
      let col5 = this.cells[4].innerHTML;

      let num2 = col2.match(/\d+(?=\s)/g);
      let num3 = col3.match(/\d+(?=\s)/g);
      let num4 = col4.match(/\d+(?=\s)/g);
      let num5 = col5.match(/\d+(?=\s)/g);

      let dataChart2 = {
        labels: [text1, text2, text3, text4],
        datasets: [
          {
            data: [num2, num3, num4, num5],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };

      let options2 = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        legend: { display: false },
        title: {
          display: true,
          text: col1,
        },
      };

      new Chart("myChart", {
        type: "bar",
        data: dataChart2,
        options: options2,
      });
    });
  }

  // download tf report
  $("body").on("click", "#btnExport1", function () {
    html2canvas($("#tfCapture"), {
      onrendered: function (canvas) {
        let data = canvas.toDataURL();
        let docDefinition = {
          content: [
            {
              image: data,
              width: 500,
            },
          ],
        };
        pdfMake.createPdf(docDefinition).download("TF-details.pdf");
      },
    });
  });
  // download mcq report
  $("body").on("click", "#btnExport2", function () {
    html2canvas($("#mcCapture"), {
      onrendered: function (canvas) {
        let data = canvas.toDataURL();
        let docDefinition = {
          content: [
            {
              image: data,
              width: 500,
            },
          ],
        };
        pdfMake.createPdf(docDefinition).download("MC-details.pdf");
      },
    });
  });

  window.addEventListener("load", Start);
})();
