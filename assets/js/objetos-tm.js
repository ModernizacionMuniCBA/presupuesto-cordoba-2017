function dibujarD3_objeto(catIngresos) {
  $("#objetos-tm").empty();
  d3.json("assets/data/por-objeto-del-gasto/presupuesto-por-objeto-del-gasto.json", function(err, res) {
    if (!err) {
        console.log(res);
          var data = d3.nest()
                      .key(function(d) { return d.rec1; })
                      .key(function(d) { return d.rec2; })
                      .key(function(d) { return d.rec3; })
                      .key(function(d) { return d.rec4; })
                      .key(function(d) { return d.rec5; })
                      .entries(res);


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
        $("#ingresos-title").html("Gastos por objeto");
        var visualization = d3plus.viz()
          .container("#objetos-tm")
          .legend({"size": 30})
          .labels({"align": "left", "valign": "top"})
          .tooltip(true)
          .tooltip({"large":getTooltipWidth(), "small":getTooltipWidth()})
          .data(res)
          .type("tree_map")
          .id(["rec1", "rec2", "rec3", "rec4", "rec5", "key"])
          .size("value")
          .format("es_ES")
          .format({
              "number": function(number, key) {
  		          var formatted = d3plus.number.format(number, key)
  		          if (key.key === "value") {
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

dibujarD3_objeto(0);
