var elems = document.querySelectorAll('select');
var instances = M.FormSelect.init(elems, {});


function onSubmit() {
	const formSociety = document.getElementById('form_society').value.trim();
	const formFlat = document.getElementById('form_flat').value.trim();
	const formContact = document.getElementById('form_phone').value.trim();
	const formIsSubOrder = document.getElementById('form_sub').checked;
	const formDays = document.getElementById('form_days');
	const selectedDays = Array.from(formDays.options).filter(opt => opt.selected).map(opt => opt.value);
	const totalAmt = Number(document.getElementById('orderTotal').innerText.replace('₹', ''));
	
	if (formSociety == '') {
		alert('Please select your society');
		return;
	}

	if (formFlat == '') {
		alert('Please enter your flat');
		return;
	}

	if (formContact == '') {
		alert('Please enter your contact number');
		return;
	}

	if (formIsSubOrder && selectedDays == '') {
		alert('Please select delivery days');
		return;
	}
	
	if (totalAmt == 0) {
		alert('Please select items');
		return;
	}


	let eachQtyMessage = '';
	document.querySelectorAll('.grid-item').forEach(item => {
    const qtySpan = item.querySelector('.qty');
    const quantity = parseInt(qtySpan?.textContent.trim(), 10) || 0;

    if (quantity >= 1) {
      const title = item.querySelector('.grid-title')?.textContent.split('•')[0].trim();
      eachQtyMessage += `\n${title} x ${quantity}`;
    }
  });

	let orderMessage = `\nI want to order ${eachQtyMessage}`;
	if (formIsSubOrder) orderMessage += `\nDelivery every ${selectedDays}`;
	const messageForWhatsapp = `Hello\nI'm from ${formFlat},${formSociety}.\n${orderMessage}\n\nMy contact is ${formContact}.`;
	
	window.location.href = `https://wa.me/91888220279?text=${encodeURIComponent(messageForWhatsapp)}`;
}

function updateSub() {
	const formIsSubOrder = document.getElementById('form_sub').checked;
	document.getElementById('form_days_holder').style.display = formIsSubOrder ? 'block' : 'none';
}

function updateQty(e, change) {
	const qtyLabel = change < 0 ? e.nextElementSibling : e.previousElementSibling;
	const currentQty = Number(qtyLabel.innerText);
	let qty = change < 0 ? (currentQty - 1) : (currentQty + 1);
	if (qty < 0) return;

	let total = Number(document.getElementById('orderTotal').innerText.replace('₹', ''));
	total += change;
	document.getElementById('orderTotal').innerText = '₹'+total;

	qtyLabel.innerText = qty;
}