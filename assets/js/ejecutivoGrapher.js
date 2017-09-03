window.already_read_juris = false;
window.datos_juris = [];
function dibujarD3_gastos_ejecutivo(juris) {
  $("#tbody-gastos-ejecutivo").empty();
  if(already_read_juris == false){
    $.getJSON("https://spreadsheets.google.com/feeds/list/1IjS0rgyRL4MLaH0ovyb7KnjiaBUGON1HEzRcUUmckEk/od6/public/values?alt=json", function( dataJSON ) {
      datos_juris = dataJSON.feed.entry;
      llenar_tabla_ejecutivo(datos_juris, juris);
    });
  }else{
    llenar_tabla_ejecutivo(datos_juris, juris);
  }
  console.log(datos_juris);
}

function llenar_tabla_ejecutivo(datos, juris){
  var detalle = []
  $.each( datos, function( key, val ) {
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
$('.btn-ejecutivo').click(function(){
    var id = $(this).attr('id');
    dibujarD3_gastos_ejecutivo(id);
});
