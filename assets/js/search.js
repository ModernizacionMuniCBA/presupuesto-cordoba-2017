$( document ).ready(function() {
  $('input').on('keyup', function() {
         if (this.value.length > 1) {
              // do search for this.value here
              $("#btn-buscar-cerrar").addClass("hide");
              $("#btn-buscar").removeClass("hide");
         }else{
           $("#btn-buscar").addClass("hide");
           $("#btn-buscar-cerrar").removeClass("hide");
         }
    });
    $('#btn-buscar-cerrar').on('click',function(e){
      e.preventDefault();
      $('.nav-buscar').slideUp();
    });
});
