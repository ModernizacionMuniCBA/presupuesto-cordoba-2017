
jQuery(window).load(function () {
		$('#intendente-nombre').connections({ to: '#izq-top-corner' });
		$('#intendente-nombre').connections({ to: '#der-top-corner' });
		$('#izq-top-corner').connections({ to: '#izq-top-1' });
		$('#der-top-corner').connections({ to: '#der-top-1' });
		$('#izq-btm-1').connections({ to: '#izq-top-2' });
		$('#der-btm-1').connections({ to: '#der-top-2' });
		$('#izq-btm-2').connections({ to: '#izq-top-3' });
		$('#der-btm-2').connections({ to: '#der-top-3' });
		// $('#izq-btm-3').connections({ to: '#izq-top-1' });
		// $('#der-btm-3').connections({ to: '#der-top-1' });
	  $('#intendente-foto').connections({ to: '#vice-foto' });
	// $('#intendente-nombre').connections({ to: '.org-lista-funcionarios .func-foto' });
});
