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
    html2canvas($("#tftable")[0], {
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
    html2canvas($("#mcqtable")[0], {
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
