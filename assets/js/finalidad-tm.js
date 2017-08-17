function dibujarD3_secretaria(catFinalidad) {
  $("#finalidad-tm").empty();
  var titles = ["Gasto previsto 2017 por Finalidad por Secretaría","Gasto previsto 2017 por Secretarías por Finalidad","Gasto previsto 2017 por Objeto por Secretaría","Gasto previsto 2017 por Secretarías por Objeto"]
  var urlIngresos = ["assets/data/treemap-por-secretaria-y-objeto/presupuesto-por-finalidad-por-secretaria.json","assets/data/treemap-por-secretaria-y-objeto/presupuesto-por-secretarias-por-finalidad.json","assets/data/treemap-por-secretaria-y-objeto/presupuesto-por-objeto-por-secretaria.json","assets/data/treemap-por-secretaria-y-objeto/presupuesto-por-secretarias-por-objeto.json"]
  var dataID = [["region", "key"], ["region", "key"], ["region", "key"],["region", "subregion", "key"]];
  d3.json(urlIngresos[catFinalidad], function(err, res) {
    if (!err) {
        // console.log(res);
        switch (catFinalidad) {
          case 0,1,2:
            var data = d3.nest()
              .key(function(d) { return d.region; })
              .entries(res);
            break;
          case 3:
            var data = d3.nest()
              .key(function(d) { return d.region; })
              .key(function(d) { return d.subregion; })
              .entries(res);
            break;
          default:
            break;
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
        $("#finalidad-title").html(titles[catFinalidad]);
        var visualization = d3plus.viz()
          .container("#finalidad-tm")
          .legend({"size": 30})
          .labels({"align": "left", "valign": "top"})
          .tooltip(true)
          .tooltip({"large":getTooltipWidth(), "small":getTooltipWidth()})
          .data(res)
          .type("tree_map")
          .id(dataID[catFinalidad])
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

dibujarD3_secretaria(0);
