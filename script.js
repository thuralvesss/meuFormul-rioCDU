const form = document.getElementById('crudForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const ageInput = document.getElementById('age');
const dataTable = document.getElementById('dataTable');

let data = JSON.parse(localStorage.getItem('crudData')) || [];
let editIndex = null;
function renderTable() {
  dataTable.innerHTML = '';
  data.forEach((item, index) => {
    const row = `
      <tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.email}</td>
        <td>${item.age}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editItem(${index})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="deleteItem(${index})">Deletar</button>
        </td>
      </tr>
    `;
    dataTable.innerHTML += row;
  });
}


function validateForm() {
  let isValid = true;

  if (!nameInput.value.trim()) {
    nameInput.classList.add('is-invalid');
    isValid = false;
  } else {
    nameInput.classList.remove('is-invalid');
  }

  if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
    emailInput.classList.add('is-invalid');
    isValid = false;
  } else {
    emailInput.classList.remove('is-invalid');
  }

  if (!ageInput.value || ageInput.value <= 0) {
    ageInput.classList.add('is-invalid');
    isValid = false;
  } else {
    ageInput.classList.remove('is-invalid');
  }

  return isValid;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!validateForm()) return;

  const newItem = {
    name: nameInput.value,
    email: emailInput.value,
    age: parseInt(ageInput.value, 10),
  };

  if (editIndex !== null) {
    data[editIndex] = newItem;
    editIndex = null;
  } else {
    data.push(newItem);
  }

  localStorage.setItem('crudData', JSON.stringify(data));
  form.reset();
  renderTable();
});


function editItem(index) {
  const item = data[index];
  nameInput.value = item.name;
  emailInput.value = item.email;
  ageInput.value = item.age;
  editIndex = index;
}

function deleteItem(index) {
  data.splice(index, 1);
  localStorage.setItem('crudData', JSON.stringify(data));
  renderTable();
}


renderTable();
