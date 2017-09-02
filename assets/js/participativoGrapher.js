
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
    console.log(datos);
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
      already_printed_participativo=true;

});
}

dibujarD3_participativo();


// $(window).on('resize', function(){
//   dibujarD3_participativo();
// });
