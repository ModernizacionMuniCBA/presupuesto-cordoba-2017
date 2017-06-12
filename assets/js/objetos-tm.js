  d3.json("assets/data/por-objeto-del-gasto/presupuesto-por-objeto-del-gasto.json", function(err, res) {
    if (!err) {
        // console.log(res);
        var data = d3.nest()
          .key(function(d) { return d.rec1; })
          .key(function(d) { return d.rec2; })
          .key(function(d) { return d.rec3; })
          .key(function(d) { return d.rec4; })
          .key(function(d) { return d.rec5; })
          .entries(res);

        // console.log(data);
        var visualization = d3plus.viz()
          .container("#objetos-tm")
          .data(res)
          .type("tree_map")
          .id(["rec1", "rec2", "rec3", "rec4", "rec5", "key"])
          .size("value")
          .format("es_ES")
          .format({
              "number": function(number, key) {
  		          var formatted = d3plus.number.format(number, key)
  		          if (key.key === "valor") {
  		        	     return "$" + formatted.replace("B", " Mm")
  		          }
  		          else {
  		            return formatted
  		          }
  		        }
  				})
          .draw();
    }
    });
