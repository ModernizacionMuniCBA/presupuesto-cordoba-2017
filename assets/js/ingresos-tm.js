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


        function getTooltipWidth(){
          var wWidth = $( window ).width();
          if (wWidth < 480){
            return $( window ).width()-50;
          }else if(wWidth < 768){
            return 500;
          }else if(wWidth < 1200){
            return 700;
          }else{
            return 700;
          }
        }
        // console.log(data);
        $("#ingresos-title").html(titles[catIngresos]);
        var visualization = d3plus.viz()
          .container("#ingresos-tm")
          .legend({"size": 30})
          .labels({"align": "left", "valign": "top"})
          .tooltip(true)
          .tooltip({"large":getTooltipWidth(), "small":getTooltipWidth()})
          .data(res)
          .type("tree_map")
          .id(dataID[catIngresos])
          .size("valor")
          .format("es_ES")
          .format({
              "number": function(number, key) {
  		          var formatted = d3plus.number.format(number, key)
  		          if (key.key === "valor") {
  		        	     return "$" + formatted.replace("B", " Mm");
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
