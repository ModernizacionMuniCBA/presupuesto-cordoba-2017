function dibujarD3_ing() {
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
          .dev(true) //Uso esto como callback para el loader cuando hay viz
          .draw();
    }
    });
}

function llenarTablas_ing(){
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
      $("#tbody-ingresos-capital").append('<tr class="nivel-'+val.nivel+'"><th scope="row">'+val.key+'</th><td>'+val.concepto+'</td><td>$'+val.valor.toLocaleString("es-AR")+'</td></tr>');
    }
    // console.log(val.concepto);
    // console.log(val);
    // items.push( "<li id='" + key + "'>" + val + "</li>" );
  });
});
}

function dibujarD3_AE() {
  $("#afectacion-especifica-j").empty();
  d3.json("assets/data/ingresos/recursos-afectacion-totales-presupuesto-2017.json", function(err, res) {
    if (!err) {
        // console.log(res);

        var data = d3.nest()
                    // .key(function(d) { return d.rec1; })
                    .entries(res);

        console.log(data);

        var visualization = d3plus.viz()
          .container("#afectacion-especifica-j")
          .background("#EEEEEE")
           .legend({"size": 50})
          // .labels({"align": "left", "valign": "top"})
          .tooltip(true)
          .tooltip({"children":0})
          // .tooltip({"large":getTooltipWidth(), "small":getTooltipWidth()})
          .data(res)
          .type("pie")
          .id(["key"])
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
    $("#afectacion-especifica-jm").empty();
    d3.json("assets/data/ingresos/recursos-afectacion-presupuesto-2017.json", function(err, res) {
      if (!err) {
          // console.log(res);

          var data = d3.nest()
                      // .key(function(d) { return d.rec1; })
                      .entries(res);

          console.log(data);

          var visualization = d3plus.viz()
            .container("#afectacion-especifica-jm")
            .background("#EEEEEE")
            .tooltip(true)
            .tooltip({"children":0})
            .data(res)
            .type("pie")
            .id(["key"])
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


      $("#afectacion-especifica-propios").empty();
      d3.json("assets/data/ingresos/recursos-afectacion-propios-presupuesto-2017.json", function(err, res) {
        if (!err) {
            // console.log(res);

            var data = d3.nest()
                        // .key(function(d) { return d.rec1; })
                        .entries(res);

            console.log(data);

            var visualization = d3plus.viz()
              .container("#afectacion-especifica-propios")
              .background("#EEEEEE")
              .tooltip(true)
              .tooltip({"children":0})
              .data(res)
              .type("bar")
              .id(["key"])
              .x("valor")
              .x({"stacked": false, "value": "valor", "grid":false, "label": false, "scale": "discrete"})
              .y("Nombre")
              .y({"scale": "discrete", "grid":false, "label": false}) // Manually set Y-axis to be discrete
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
        $("#afectacion-especifica-no_propios").empty();
        d3.json("assets/data/ingresos/recursos-afectacion-no_propios-presupuesto-2017.json", function(err, res) {
          if (!err) {
              // console.log(res);

              var data = d3.nest()
                          // .key(function(d) { return d.rec1; })
                          .entries(res);

              console.log(data);

              var visualization = d3plus.viz()
                .container("#afectacion-especifica-no_propios")
                .background("#EEEEEE")
                .tooltip(true)
                .tooltip({"children":0})
                .data(res)
                .type("bar")
                .id(["key"])
                .x("valor")
                .x({"scale": "discrete", "stacked": false, "value": "valor", "grid":false, "label": false})
                .y("Nombre")
                .y({"scale": "discrete", "grid":false,  "label": false}) // Manually set Y-axis to be discrete
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


dibujarD3_ing();
llenarTablas_ing();


$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  // e.prevenDefault();
  if(history.pushState) {
    history.pushState(null, null, '#'+e.target.hash.substr(1));
  }
  else {
      location.hash = '#'+e.target.hash.substr(1);
  }

  if(e.target.hash.substr(1) == 'afectacion'){
    dibujarD3_AE();
  }
  return false ;
})

$(window).on('resize', function(){
  dibujarD3_ing();
  dibujarD3_AE();
});


$( document ).ready(function() {
  var hash = window.location.hash;
  hash = hash.substring(hash.indexOf('#')+1).toLowerCase();
  console.log(hash);
  if(hash == "propios" || hash == "no-propios"){
    $('.nav-tabs a[href="#corrientes"]').tab('show');
    // $('.nav-tabs a[href="#'+hash+'"]').tab('show');
  }else if (hash == "cortoplazo" || hash == "largoplazo"){
    $('.nav-tabs a[href="#capital"]').tab('show');
    // $('.nav-tabs a[href="#'+hash+'"]').tab('show');
  }
  $('.nav-tabs a[href="#'+hash+'"]').tab('show');
  $('html, body').animate({
      scrollTop: $("#"+hash).offset().top-275
    }, 1000);
});
