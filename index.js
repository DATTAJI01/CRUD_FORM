let data = JSON.parse(localStorage.getItem("crudData")) || [];
console.log(data);
renderTable();
let editIndex = null;

document.getElementById('crud-form').addEventListener('submit',(e) =>{
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const city = document.getElementById('city').value;

  const formData = {
    name,
    email,
    phone,
    city
  };

  if (editIndex === null) {
    data.push(formData);
  } else {
    data[editIndex] = formData;
    editIndex = null;
  }

  saveDataToLocalStorage();

  e.target.reset();

  renderTable();
});

function saveDataToLocalStorage() {
  localStorage.setItem("crudData", JSON.stringify(data));
}


function renderTable() {
  const tableBody = document.querySelector("#data-table tbody");
  tableBody.innerHTML = '';

  data.forEach((row, index) => {
    const tableRow = document.createElement('tr');

    tableRow.innerHTML = `
      <td>${row.name}</td>
      <td>${row.email}</td>
      <td>${row.phone}</td>
      <td>${row.city}</td>
      <td class="action">
        <i class="fa-solid fa-pen edit-icon" title="Update" onclick="editRow(${index})"></i>
        <i class="fa-solid fa-trash delete-icon" title="Delete" onclick="deleteRow(${index})"></i>
      </td>`;

      tableBody.appendChild(tableRow);
  });}


  function editRow(index) {
    const row = data[index];


    document.getElementById('name').value = row.name;
    document.getElementById('email').value = row.email;
    document.getElementById('phone').value = row.phone;
    document.getElementById('city').value = row.city;

    editIndex = index;
  }

  function deleteRow(index) {
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
  }

