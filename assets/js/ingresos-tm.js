function dibujarD3(catIngresos) {
  $("#ingresos-tm").empty();
  var titles = ["Recursos totales del Presupuesto 2017","Recursos de rentas del Presupuesto 2017"," Recursos con afectación del Presupuesto 2017"]
  var urlIngresos = ["assets/data/ingresos/recursos-totales-presupuesto-2017.json", "assets/data/ingresos/recursos-rentas-presupuesto-2017.json", "assets/data/ingresos/recursos-afectacion-presupuesto-2017.json"]
  var dataID = [["rec0", "rec1", "rec2", "rec3", "key"], ["rec1", "rec2", "rec3", "key"], ["rec1", "rec2", "rec3", "key"]];
  d3.json(urlIngresos[catIngresos], function(err, res) {
    if (!err) {
        console.log(res);
        switch (catIngresos) {
          case 0:
          var data = d3.nest()
                      .key(function(d) { return d.rec0; })
                      .key(function(d) { return d.rec1; })
                      .key(function(d) { return d.rec2; })
                      .key(function(d) { return d.rec3; })
                      .entries(res);
            break;
          case 1:
          var data = d3.nest()
                      .key(function(d) { return d.rec1; })
                      .key(function(d) { return d.rec2; })
                      .key(function(d) { return d.rec3; })
                      .entries(res);
            break;
          case 2:
          var data = d3.nest()
                      .key(function(d) { return d.rec1; })
                      .key(function(d) { return d.rec2; })
                      .key(function(d) { return d.rec3; })
                      .entries(res);
            break;
          default:

        }

        function addCommas(nStr)
        {
            nStr += '';
            x = nStr.split('.');
            x1 = x[0];
            x2 = x.length > 1 ? ',' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + '.' + '$2');
            }
            return x1 + x2;
        }

        // console.log(data);
        $("#ingresos-title").html(titles[catIngresos]);
        var visualization = d3plus.viz()
          .container("#ingresos-tm")
          .legend({"size": 30})
          .labels({"align": "left", "valign": "top"})
          .tooltip(true)
          .data(res)
          .type("tree_map")
          .id(dataID[catIngresos])
          .size("valor")
          .format("es_ES")
          .format({
              "number": function(number, key) {
  		          var formatted = d3plus.number.format(number, key)
  		          if (key.key === "valor") {
  		        	     return "$" + formatted.replace("B", " Mm") + "\n$"+(addCommas(number));
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

dibujarD3(0);
