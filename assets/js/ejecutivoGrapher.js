window.already_read_juris = false;
window.datos_juris = [];
window.botones = $('.btn-ejecutivo');

function dibujarD3_gastos_ejecutivo(juris) {
  $("#tbody-gastos-ejecutivo").empty();
  $("#grafico-secretaria").empty();
  if(already_read_juris == false){
    $.getJSON("https://spreadsheets.google.com/feeds/list/1IjS0rgyRL4MLaH0ovyb7KnjiaBUGON1HEzRcUUmckEk/od6/public/values?alt=json", function( dataJSON ) {
      datos_juris = dataJSON.feed.entry;
      graficar(datos_juris, juris);
      already_read_juris = true;
    });
  }else{
    graficar(datos_juris, juris);
  }
}

function graficar(datos, juris){
  generar_gafico(datos, juris);
  llenar_tabla_ejecutivo(datos, juris);
}

function generar_gafico(datos, juris){
  var detalle = [];
  var dat = datos;
  var res = []
  
  $.each( dat, function( key, val ) {
    var partida = val.gsx$partida.$t;
    var nivel_tabla = val.gsx$nivel.$t;
    var partida_splited = partida.split('.');
    var nivel = partida_splited.length;
    var nivel_princ = parseInt(partida_splited[0]);
    var subnivel = parseInt(partida_splited[1]);
    var concepto = val.gsx$concepto.$t;
    var total = val['gsx$'+juris].$t;
    if(nivel_tabla != -2){
      if (partida_splited[1]==""){
        nivel -=1;
      }
      detalle[nivel] = concepto;
      if(nivel == 3 && nivel_princ==2 && subnivel==4){
        nivel = 4;
        detalle[3] = concepto
      }
      if(nivel == 4){
        var linea = { "key": concepto,
                      "rec1": detalle[3],
                      "rec2": detalle[2],
                      "rec3": detalle[1],
                      "valor": parseInt((total ? total.split('.').join("") : 0))
                    };
        res.push(linea);
      }
    }
  });

  var data = d3.nest()
              .key(function(d) { return d.rec1; })
              .key(function(d) { return d.rec2; })
              .key(function(d) { return d.rec3; })
              .entries(res);
  var visualization = d3plus.viz()
    .background("#EEEEEE")
    .container("#grafico-secretaria")
    .legend({"size": 30})
    .tooltip(true)
    .tooltip({"children":0})
    .data(res)
    .height(450)
    .type("tree_map")
    .id(["rec3", "rec2", "rec1",  "key"])
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
    //.dev(true)
    .draw();
}

function llenar_tabla_ejecutivo(datos, juris){
  var dat = datos;
  var detalle = []; 
  $.each( dat, function( key, val ) {
    var partida = val.gsx$partida.$t;
    var nivel = val.gsx$nivel.$t;
    var nivel_princ = parseInt(nivel) + 2;
    var concepto = val.gsx$concepto.$t;
    var total = val['gsx$'+juris].$t;
    detalle[nivel]=concepto.toLowerCase().split(' ').join('_');
    if(total == ""){
      total = 0;
    }
    $("#tbody-gastos-ejecutivo").append('<tr class="nivel-'+nivel_princ+'"><th>'+partida+'</th><td>'+concepto+'</td><td>$'+total.toLocaleString("es-AR")+'</td></tr>');

    // if(nivel < 3 ){
    //   $("#tbody-gastos-ejecutivo").append('<tr class="nivel-'+nivel+'"><td>'+concepto+'</td><td>$'+total.toLocaleString("es-AR")+'</td></tr>');
    //
    // }else if(nivel == 3){
    //   $("#tbody-gastos-ejecutivo").append('<tr class="table-clickable nivel-'+nivel+' '+detalle[(nivel-1)]+'" data-toggle="collapse" data-target=".nivel-'+(nivel+1)+'.'+detalle[nivel]+'"><td>'+concepto+'</td><td>$'+total.toLocaleString("es-AR")+'</td></tr>');
    // }
    // if(nivel > 3){
    //   $("#tbody-gastos-ejecutivo").append('<tr class="table-clickable nivel-'+nivel+' '+detalle[(nivel-1)]+' collapse" data-toggle="collapse" data-target=".nivel-'+(nivel+1)+'.'+detalle[nivel]+'"><td>'+concepto+'</td><td>$'+total.toLocaleString("es-AR")+'</td></tr>');
    // }
    });
    $('.table-ejecutivo').slideDown();
}
botones.click(function(){
    var $boton = $(this);
    botones.removeClass('active');
    $boton.addClass('active');
    $("#secretaria-actual").html("<h2 class='text-center'>"+$boton.html()+"<h2>");
    dibujarD3_gastos_ejecutivo($boton.attr('id'));
});
