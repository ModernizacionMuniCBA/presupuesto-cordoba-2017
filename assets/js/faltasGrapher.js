function dibujarD3_gastos_tribunal_faltas() {
  $.getJSON("https://spreadsheets.google.com/feeds/list/1ul8x07sCDmok1DujucaLyN-aWxpAXAXwlw8X2ixmvZc/od6/public/values?alt=json", function( dataJSON ) {
    var datos = [];
    var datos_clasif_econo = [];
    var detalle = [];
    // console.log(dataJSON.feed.entry);
    $.each( dataJSON.feed.entry, function( key, val ) {
      var partida = val.gsx$partidas.$t;
      var nivel_princ = parseInt(partida) + 2;
      var concepto = val.gsx$concepto.$t;
      var total = val.gsx$administraciongeneraldelajusticiaadministrativamunicipaldefaltas.$t;
      if(total == ""){
        total= 0 ;
      }
      $("#tbody-gastos-tribunal-faltas").append('<tr class="nivel-'+nivel_princ+'"><td>'+concepto+'</td><td>$'+total.toLocaleString("es-AR")+'</td></tr>');
      });
});
}
dibujarD3_gastos_tribunal_faltas();
