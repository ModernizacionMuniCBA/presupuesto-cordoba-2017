window.already_printed_ejecuciones = false;

function dibujarD3_ejecuciones_presupuestarias() {
  $.getJSON("https://spreadsheets.google.com/feeds/list/1Lu7tzYu5bMwJ-Yib3pGAbWDqkufov8BJP27HKzx8wEE/od6/public/values?alt=json", function( dataJSON ) {
    $("#grafico-gastos-corrientes").empty();
    $("#grafico-gastos-capital").empty();
    var corrientes = [];
    var capital = [];
    var entradas = dataJSON.feed.entry;
    var $tabla = $("#tbody-ejecuciones");

    var i = 0;
    $.each(entradas, function( key, val ) {
      i += 1;
      var partida = val.gsx$partida.$t;
      var partida_splited = partida.split('.');
      var nivel = partida_splited.length;
      var nivel_princ = parseInt(partida_splited[0]);
      //var subnivel = partida_splited[1] ? parseInt(partida_splited[1]) : null;
      var concepto = val.gsx$denominacion.$t;
      var ejecutado = val.gsx$ejecutado.$t.split('.').join("");
      var definitivo = val.gsx$presupuestodefinitivo.$t.split('.').join("");
      var porcentajeEjecucion = val.gsx$deejecución.$t;

      if(i != entradas.length){
        var linea = {
          "key": concepto,
          "valor": parseInt(ejecutado)
        };
        
        if (nivel_princ < 10) { // es gasto corriente
          corrientes.push(linea);
        } else { // es de capital
          capital.push(linea);
        }
        if(!already_printed_ejecuciones){
          $tabla.append('<tr class="nivel-3"><td>'+concepto+'</td><td>$'+Number(ejecutado).toLocaleString("es-AR")+'</td><td>$'+Number(definitivo).toLocaleString("es-AR")+'</td><td>'+porcentajeEjecucion+'</td></tr>');
        }
      }else{
        if(!already_printed_ejecuciones){
          $tabla.append('<tr class="nivel-2"><td>'+concepto+'</td><td>$'+Number(ejecutado).toLocaleString("es-AR")+'</td><td>$'+Number(definitivo).toLocaleString("es-AR")+'</td><td>'+porcentajeEjecucion+'</td></tr>');
        }
      }
    });

    var visualizationCorrientes = d3plus.viz()
      .container("#grafico-gastos-corrientes")
      .background("#EEEEEE")
      .legend({"size": 50})
      .tooltip(true)
      .tooltip({"children":0})
      .data(corrientes)
      .type("pie")
      .id(["key"])
      .size("valor")
      .height(400)
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

    var visualizationCapital = d3plus.viz()
      .container("#grafico-gastos-capital")
      .background("#EEEEEE")
      .legend({"size": 50})
      .tooltip(true)
      .tooltip({"children":0})
      .data(capital)
      .type("pie")
      .id(["key"])
      .size("valor")
      .height(400)
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
    already_printed_ejecuciones=true;
  });
}

$(window).on('resize', function(){
  dibujarD3_ejecuciones_presupuestarias();
});

dibujarD3_ejecuciones_presupuestarias();