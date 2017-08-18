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
          // .labels({"align": "left", "valign": "top"})
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

function llenarTablas(){
  $.getJSON( "assets/data/ingresos/recursos-totales-presupuesto-2017-tabla.json", function( data ) {
  var items = [];
  console.log(data);
  $.each( data, function( key, val ) {
    if(val.key_0 == "1"){
      if(val.subnivel == ""){
        $("#tbody-ingresos-corrientes-propios").append('<tr class="nivel-'+val.nivel+'"><th scope="row">'+val.key+'</th><td>'+val.concepto+'</td><td>$'+val.valor.toLocaleString("es-AR")+'</td></tr>');
        $("#tbody-ingresos-corrientes-no-propios").append('<tr class="nivel-'+val.nivel+'"><th scope="row">'+val.key+'</th><td>'+val.concepto+'</td><td>$'+val.valor.toLocaleString("es-AR")+'</td></tr>');
      }
      if(val.subnivel == "01"){
        $("#tbody-ingresos-corrientes-propios").append('<tr class="nivel-'+val.nivel+'"><th scope="row">'+val.key+'</th><td>'+val.concepto+'</td><td>$'+val.valor.toLocaleString("es-AR")+'</td></tr>');
      }else if(val.subnivel == "02"){
        $("#tbody-ingresos-corrientes-no-propios").append('<tr class="nivel-'+val.nivel+'"><th scope="row">'+val.key+'</th><td>'+val.concepto+'</td><td>$'+val.valor.toLocaleString("es-AR")+'</td></tr>');
      }
    }else if(val.key_0 == "2"){
    }
    // console.log(val.concepto);
    // console.log(val);
    // items.push( "<li id='" + key + "'>" + val + "</li>" );
  });
});
}

dibujarD3();
llenarTablas();
