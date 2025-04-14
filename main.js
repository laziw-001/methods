const url = 'https://67fd167e3da09811b1749ed8.mockapi.io/laziw_001/'
async function getUser() {
	const response = await fetch(url + 'user')
	const data = await response.json()
	const contactList = document.getElementsByClassName('contact-list')[0]
	console.log(data)
	data.forEach(user => {
		const contactCard = document.createElement('div')
		contactCard.classList.add('contact-card')

		contactCard.innerHTML = `
	<img src="${user.avatar}" class="avatar">
	<div class="contact-info">
		<h4>${user.name}</h4>
		<p>${user.number}</p>
	</div>
	<div class="actions">
					<i><img src="./tabler_edit.svg" alt=""></i>
					<i><img src="./Vector.svg" alt=""></i>
	</div>
		
	`
		contactList.appendChild(contactCard)
	})
}
getUser()

const addBtn = document.querySelector('.add-btn');

addBtn.addEventListener('click', async () => {
	const name = document.getElementById('name').value;
	const number = document.getElementById('number').value;

	if (name == '' || number == '') {
		alert('ism va raqamni to‘ldiring!');
		return;
	}

	const newUser = {
		name: name,
		number: number,
		avatar: "./Ellipse 21.png"
	};

	const response = await fetch(url + 'user', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newUser)
	});

	const createdUser = await response.json();

	const contactList = document.getElementsByClassName('contact-list')[0];
	const contactCard = document.createElement('div');
	contactCard.classList.add('contact-card');

	contactCard.innerHTML = `
		<img src="${createdUser.avatar}" class="avatar">
		<div class="contact-info">
			<h4>${createdUser.name}</h4>
			<p>${createdUser.number}</p>
		</div>
		<div class="actions">
			<i><img src="./tabler_edit.svg" alt=""></i>
			<i><img src="./Vector.svg" alt=""></i>
		</div>
	`;

	contactList.appendChild(contactCard);

	document.getElementById('name').value = '';
	document.getElementById('number').value = '';
});


// const url = 'https://67fd167e3da09811b1749ed8.mockapi.io/laziw_001/';

// // Contactlarni olish
// async function getUser() {
// 	const response = await fetch(url + 'user');
// 	const data = await response.json();
// 	const contactList = document.getElementsByClassName('contact-list')[0];
// 	console.log(data);

// 	// Kontaktlarni UI ga qo‘shish
// 	contactList.innerHTML = ''; // UI ni yangilash uchun eski kontaktlarni tozalash

// 	data.forEach(user => {
// 		const contactCard = document.createElement('div');
// 		contactCard.classList.add('contact-card');

// 		contactCard.innerHTML = `
// 			<img src="${user.avatar}" class="avatar">
// 			<div class="contact-info">
// 				<h4>${user.name}</h4>
// 				<p>${user.number}</p>
// 			</div>
// 			<div class="actions">
// 				<i><img src="./tabler_edit.svg" alt=""></i>
// 				<i><img src="./Vector.svg" alt=""></i>
// 				<button class="delete-btn" data-id="${user.id}">Delete</button>
// 			</div>
// 		`;

// 		contactList.appendChild(contactCard);
// 	});

// 	// Delete tugmasiga hodisa qo'shish
// 	const deleteButtons = document.querySelectorAll('.delete-btn');
// 	deleteButtons.forEach(button => {
// 		button.addEventListener('click', async (e) => {
// 			const userId = e.target.getAttribute('data-id');
// 			await deleteContact(userId); // Contactni mockAPI dan o'chirish
// 		});
// 	});
// }

// // Kontaktni o'chirish
// async function deleteContact(userId) {
// 	const response = await fetch(url + 'user/' + userId, {
// 		method: 'DELETE',
// 	});

// 	if (response.ok) {
// 		console.log(`Contact ${userId} o'chirildi.`);
// 		getUser(); // UI ni yangilash
// 	} else {
// 		alert('O‘chirishda xatolik yuz berdi');
// 	}
// }

// // Kontakt qo‘shish
// const addBtn = document.querySelector('.add-btn');

// addBtn.addEventListener('click', async () => {
// 	const name = document.getElementById('name').value;
// 	const number = document.getElementById('number').value;

// 	if (name === '' || number === '') {
// 		alert('Iltimos, ism va raqamni to‘ldiring!');
// 		return;
// 	}

// 	const newUser = {
// 		name: name,
// 		number: number,
// 		avatar: "./Ellipse 21.png"
// 	};

// 	// API ga POST qilish
// 	const response = await fetch(url + 'user', {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify(newUser)
// 	});

// 	const createdUser = await response.json();

// 	// UI ga darhol qo‘shish
// 	const contactList = document.getElementsByClassName('contact-list')[0];
// 	const contactCard = document.createElement('div');
// 	contactCard.classList.add('contact-card');

// 	contactCard.innerHTML = `
// 		<img src="${createdUser.avatar}" class="avatar">
// 		<div class="contact-info">
// 			<h4>${createdUser.name}</h4>
// 			<p>${createdUser.number}</p>
// 		</div>
// 		<div class="actions">
// 			<i><img src="./tabler_edit.svg" alt=""></i>
// 			<i><img src="./Vector.svg" alt=""></i>
// 			<button class="delete-btn" data-id="${createdUser.id}">Delete</button>
// 		</div>
// 	`;

// 	contactList.appendChild(contactCard);

// 	document.getElementById('name').value = '';
// 	document.getElementById('number').value = '';
// });

// // Initial call to load data on page load
// getUser();


