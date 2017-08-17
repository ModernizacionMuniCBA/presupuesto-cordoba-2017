function dibujarD3() {
  $("#ingresosGraph").empty();
  d3.json("assets/data/ingresos/recursos-rentas-presupuesto-2017.json", function(err, res) {
    if (!err) {
        // console.log(res);

        var data = d3.nest()
                    .key(function(d) { return d.rec1; })
                    .key(function(d) { return d.rec2; })
                    .key(function(d) { return d.rec3; })
                    .entries(res);

        // function getTooltipWidth(){
        //   var wWidth = $( window ).width();
        //   if (wWidth < 480){
        //     return $( window ).width()-50;
        //   }else if(wWidth < 768){
        //     return 500;
        //   }else if(wWidth < 1200){
        //     return 700;
        //   }else{
        //     return 700;
        //   }
        // }
        console.log(data);

        var visualization = d3plus.viz()
          .background("#EEEEEE")
          .container("#ingresosGraph")
          .legend({"size": 30})
          .labels({"align": "left", "valign": "top"})
          .tooltip(true)
          .tooltip({"children":0})
          // .tooltip({"large":getTooltipWidth(), "small":getTooltipWidth()})
          .data(res)
          .type("tree_map")
          .id(["rec1", "rec2", "rec3", "key"])
          .size("valor")
          .format("es_ES")
          .format({
              "number": function(number, key) {
  		          var formatted = d3plus.number.format(number, key)
  		          if (key.key === "valor") {
  		        	    //  return "$" + formatted.replace("B", " Mm");
                    return "$" + number;
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

dibujarD3();
