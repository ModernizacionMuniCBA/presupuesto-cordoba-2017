
window.already_printed_participativo = false;

function dibujarD3_participativo() {
  //Pestaña Grafico
  $.getJSON("https://spreadsheets.google.com/feeds/list/1uA9UbORQPEpzDVBpvq4UsmiA0eOvAdFCMg31iXd1XoE/o69vy0y/public/values?alt=json", function( dataJSON ) {
    $("#participativoGraph").empty();
    var datos = [];
    // console.log(dataJSON.feed);
    $.each( dataJSON.feed.entry, function( key, val ) {

      var concepto = val.gsx$nombre.$t;
      var total = val.gsx$porcentaje.$t;
        var linea = {"key": concepto,
                "Porcentaje": parseFloat(total.split(',').join('.'))}
        datos.push(linea);

    });
    // Grafico Gastos por Clasificacion Economica
    var visualization = d3plus.viz()
      .container("#participativoGraph")
      .background("#EEEEEE")
      .legend({"size": 50})
      .tooltip(true)
      .tooltip({"children":0, "share":false})
      .data(datos)
      .type("pie")
      .id(["key"])
      .size("Porcentaje")
      .format("es_ES")
      .format({
          "number": function(number, key) {
            var formatted = d3plus.number.format(number, key);
            if (key.key === "Porcentaje") {
                var formatted = number.toLocaleString("es-AR")
                return formatted+"%";
            }
            else {
              return formatted
            }
          }
      })
      .draw();

    });

    $.getJSON("https://spreadsheets.google.com/feeds/list/1uA9UbORQPEpzDVBpvq4UsmiA0eOvAdFCMg31iXd1XoE/or4ki2f/public/values?alt=json", function( dataJSON2 ) {
      var datos = [];
      console.log(dataJSON2.feed.entry);
      var detalle = []
      $.each( dataJSON2.feed.entry, function( key, val ) {

        var concepto = val.gsx$programa.$t;
        var porcentaje = val.gsx$porcentaje.$t;
        var nivel_tabla = val.gsx$nivel.$t;
        var monto = val.gsx$monto.$t;
        var nivel_tabla_splited = nivel_tabla.split('.');
        var nivel = nivel_tabla_splited.length + 1;
        var texto = val.gsx$texto.$t;
        detalle[nivel] = concepto.toLowerCase().split(' ').join('_');

        if(nivel_tabla == "9"){
          $("#tbody-participativo").append('<tr class="nivel-1"><th scope="row">'+nivel_tabla+'</th><td>'+concepto+'</td><td>'+porcentaje+'</td><td>$'+monto.toLocaleString("es-AR")+'</td></tr>');
        }else{
          if(nivel == 3){
            $("#tbody-participativo").append('<tr class="table-clickable nivel-'+nivel+'" data-toggle="collapse" data-target="#texto-'+detalle[2]+'-'+detalle[3]+'"><th scope="row">'+nivel_tabla+'</th><td>'+concepto+'</td><td>'+porcentaje+'</td><td>$'+monto.toLocaleString("es-AR")+'</td></tr>');
            $("#tbody-participativo").append('<tr class="collapse gray" id="texto-'+detalle[2]+'-'+detalle[3]+'"><td colspan="4">'+texto+'</td></tr>');
          }else{
            $("#tbody-participativo").append('<tr class="nivel-'+nivel+'"><th scope="row">'+nivel_tabla+'</th><td>'+concepto+'</td><td>'+porcentaje+'</td><td>$'+monto.toLocaleString("es-AR")+'</td></tr>');

          }
        }

      });
      already_printed_participativo=true;
    });
}

dibujarD3_participativo();


// $(window).on('resize', function(){
//   dibujarD3_participativo();
// });
