$( document ).ready(function() {
  var relPosDate1 = new Date(2015, 03, 01);
  var relPosDate2 = new Date(2015, 03, 02);
  var relPosDate3 = new Date(2015, 03, 03);
  var relPosDate4 = new Date(2015, 03, 04);
  var relPosDate5 = new Date(2015, 03, 05);
  var relPosDate6 = new Date(2015, 03, 06);
  $('#timeline-container').timelineMe({
    orientation: 'horizontal',
    scrollArrows: true,
    scrollBar: true,
    items: [
      {
        type: 'milestone',
        label: '2014',
        shortContent: 'Descripción 1',
        relativePosition: relPosDate1.getTime()
      },
      {
        type: 'milestone',
        label: '2015',
        relativePosition: relPosDate2.getTime(),
        shortContent: 'Descripción 2<br/>Mas descripción 2',
        forcePosition: 'bottom'
      },
      {
        type: 'milestone',
        label: '2016',
        shortContent: 'Descripción 3',
        relativePosition: relPosDate3.getTime()
      },
      {
        type: 'milestone',
        label: '2017',
        shortContent: 'Descripción 4',
        relativePosition: relPosDate4.getTime(),
        forcePosition: 'bottom'
      }
    ]
  });
});
$(window).on('resize', function(){
// $('.first-container').css('padding-top', $('.navbar-gaMuniCba').height()+20);
if($('.timeline-me-track').width() < $(window).width()){
  $('.fa-timeline-me-rightarrow').hide();
  $('.fa-timeline-me-leftarrow').hide();
}else{
  $('.fa-timeline-me-rightarrow').show();
  $('.fa-timeline-me-leftarrow').show();
}
});
