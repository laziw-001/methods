const url = 'https://67fd167e3da09811b1749ed8.mockapi.io/laziw_001/';
let editedUserId = null;

async function getUser() {
  const response = await fetch(url + 'user');
  const data = await response.json();
  const contactList = document.querySelector('.contact-list');
  contactList.innerHTML = '';

  data.forEach(user => {
    const contactCard = document.createElement('div');
    contactCard.classList.add('contact-card');

    contactCard.innerHTML = `
      <img src="${user.avatar}" class="avatar">
      <div class="contact-info">
        <h4 class="name">${user.name}</h4>
        <p class="number">${user.number}</p>
      </div>
      <div class="actions">
        <button class="edit-btn"><img src="./tabler_edit.svg" alt=""></button>
        <button class="contact-delete"><img src="./Vector.svg" alt=""></button>
      </div>
    `;

    contactList.appendChild(contactCard);

    // DELETE
    const deleteBtn = contactCard.querySelector('.contact-delete');
    deleteBtn.addEventListener('click', async () => {
      await contactDelete(user.id);
      await getUser();
    });

    // EDIT
    const editBtn = contactCard.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => {
      const nameEl = contactCard.querySelector('.name');
      const numberEl = contactCard.querySelector('.number');

      const nameInput = document.createElement('input');
      nameInput.value = user.name;
      nameInput.className = 'edit-name';

      const numberInput = document.createElement('input');
      numberInput.value = user.number;
      numberInput.className = 'edit-number';

      nameEl.replaceWith(nameInput);
      numberEl.replaceWith(numberInput);

      const saveBtn = document.createElement('button');
      saveBtn.textContent = 'Saqlash';
      saveBtn.className = 'save-btn';

      contactCard.querySelector('.actions').appendChild(saveBtn);

      saveBtn.addEventListener('click', async () => {
        const updatedName = nameInput.value;
        const updatedNumber = numberInput.value;

        await fetch(url + 'user/' + user.id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: updatedName,
            number: updatedNumber
          })
        });

        await getUser();
      });
    });
  });
}

async function contactDelete(id) {
  await fetch(url + 'user/' + id, {
    method: 'DELETE'
  });
}

// Qo'shish
const addBtn = document.querySelector('.add-btn');

addBtn.addEventListener('click', async () => {
  const name = document.getElementById('name').value;
  const number = document.getElementById('number').value;

  if (name === '' || number === '') {
    alert('Iltimos, ism va raqamni to‘ldiring!');
    return;
  }

  const newUser = {
    name: name,
    number: number,
    avatar: "./Ellipse 21.png"
  };

  await fetch(url + 'user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  });

  document.getElementById('name').value = '';
  document.getElementById('number').value = '';

  await getUser();
});

// Boshlanishda yuklash
getUser();
