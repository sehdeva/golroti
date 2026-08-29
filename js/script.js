var elems = document.querySelectorAll('select');
var instances = M.FormSelect.init(elems, {});


function onSubmit() {
	const formSociety = document.getElementById('form_society').value;
	const formFlat = document.getElementById('form_flat').value;
	const formContact = document.getElementById('form_phone').value;
	const formIsSubOrder = document.getElementById('form_sub').checked;

	const orderMessage = '';
	const messageForWhatsapp = `Hello\nI'm from ${formFlat},${formSociety}.\n${orderMessage}\nMy contact is ${formContact}.`;
	alert(messageForWhatsapp);
}