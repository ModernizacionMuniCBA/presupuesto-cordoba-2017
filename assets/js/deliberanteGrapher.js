function dibujarD3_gastos_ejecutivo() {
  $.getJSON("https://spreadsheets.google.com/feeds/list/1ggtT2Mv0OnAtSASEvg_LTVthzehuotx8_GvrdY58Kaw/od6/public/values?alt=json", function( dataJSON ) {
    var datos = [];
    var datos_clasif_econo = [];
    var detalle = [];
    // console.log(dataJSON.feed.entry);
    $.each( dataJSON.feed.entry, function( key, val ) {
      var partida = val.gsx$partida.$t;
      var nivel_princ = parseInt(partida) + 2;
      var concepto = val.gsx$concepto.$t;
      var total = val.gsx$concejodeliberante.$t;
      if(total == ""){
        total= 0 ;
      }
      $("#tbody-gastos-concejo-deliberante").append('<tr class="nivel-'+nivel_princ+'"><td>'+concepto+'</td><td>$'+total.toLocaleString("es-AR")+'</td></tr>');
      });
});
}
dibujarD3_gastos_ejecutivo();
