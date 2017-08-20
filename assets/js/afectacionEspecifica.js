function dibujarD3_AE() {
  $("#afectacion-especifica-j").empty();
  d3.json("assets/data/ingresos/recursos-afectacion-totales-presupuesto-2017.json", function(err, res) {
    if (!err) {
        // console.log(res);

        var data = d3.nest()
                    // .key(function(d) { return d.rec1; })
                    .entries(res);

        console.log(data);

        var visualization = d3plus.viz()
          .container("#afectacion-especifica-j")
          .background("#EEEEEE")
          .legend({"size": 30})
          // .labels({"align": "left", "valign": "top"})
          .tooltip(true)
          .tooltip({"children":0})
          // .tooltip({"large":getTooltipWidth(), "small":getTooltipWidth()})
          .data(res)
          .type("pie")
          .id(["key"])
          .size("valor")
          .format("es_ES")
          .format({
              "number": function(number, key) {
  		          var formatted = d3plus.number.format(number, key);
  		          if (key.key === "valor") {
                    var formatted = number.toLocaleString("es-AR")
                    return "$" + formatted;
  		          }
  		          else {
  		            return formatted
  		          }
  		        }
  				})
          .draw();
    }
    });
    $("#afectacion-especifica-jm").empty();
    d3.json("assets/data/ingresos/recursos-afectacion-presupuesto-2017.json", function(err, res) {
      if (!err) {
          // console.log(res);

          var data = d3.nest()
                      // .key(function(d) { return d.rec1; })
                      .entries(res);

          console.log(data);

          var visualization = d3plus.viz()
            .container("#afectacion-especifica-jm")
            .background("#EEEEEE")
            .tooltip(true)
            .tooltip({"children":0})
            .data(res)
            .type("pie")
            .id(["key"])
            .size("valor")
            .format("es_ES")
            .format({
                "number": function(number, key) {
                  var formatted = d3plus.number.format(number, key);
                  if (key.key === "valor") {
                      var formatted = number.toLocaleString("es-AR")
                      return "$" + formatted;
                  }
                  else {
                    return formatted
                  }
                }
            })
            .draw();
      }
      });


      $("#afectacion-especifica-propios").empty();
      d3.json("assets/data/ingresos/recursos-afectacion-propios-presupuesto-2017.json", function(err, res) {
        if (!err) {
            // console.log(res);

            var data = d3.nest()
                        // .key(function(d) { return d.rec1; })
                        .entries(res);

            console.log(data);

            var visualization = d3plus.viz()
              .container("#afectacion-especifica-propios")
              .background("#EEEEEE")
              .tooltip(true)
              .tooltip({"children":0})
              .data(res)
              .type("bar")
              .id(["key"])
              .x("valor")
              .x({"stacked": false, "value": "valor"})
              .y("Nombre")
              .y({"scale": "discrete"}) // Manually set Y-axis to be discrete
              .format("es_ES")
              .format({
                  "number": function(number, key) {
                    var formatted = d3plus.number.format(number, key);
                    if (key.key === "valor") {
                        var formatted = number.toLocaleString("es-AR")
                        return "$" + formatted;
                    }
                    else {
                      return formatted
                    }
                  }
              })
              .draw();
        }
        });
        $("#afectacion-especifica-no_propios").empty();
        d3.json("assets/data/ingresos/recursos-afectacion-no_propios-presupuesto-2017.json", function(err, res) {
          if (!err) {
              // console.log(res);

              var data = d3.nest()
                          // .key(function(d) { return d.rec1; })
                          .entries(res);

              console.log(data);

              var visualization = d3plus.viz()
                .container("#afectacion-especifica-no_propios")
                .background("#EEEEEE")
                .tooltip(true)
                .tooltip({"children":0})
                .data(res)
                .type("bar")
                .id(["key"])
                .x("valor")
                .x({"stacked": false, "value": "valor"})
                .y("Nombre")
                .y({"scale": "discrete"}) // Manually set Y-axis to be discrete
                .format("es_ES")
                .format({
                    "number": function(number, key) {
                      var formatted = d3plus.number.format(number, key);
                      if (key.key === "valor") {
                          var formatted = number.toLocaleString("es-AR")
                          return "$" + formatted;
                      }
                      else {
                        return formatted
                      }
                    }
                })
                .draw();
          }
          });
}

dibujarD3_AE();
// llenarTablas();
