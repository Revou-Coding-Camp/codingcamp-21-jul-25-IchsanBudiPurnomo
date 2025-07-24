const addBtn = document.querySelector('.add-btn');
const acaraInput = document.querySelector('.acara');
const dateInput = document.querySelector('.date');
const tbody = document.querySelector('tbody');
const noTaskRow = document.querySelector('.no-task');
const deleteAllBtn = document.querySelector('.delete-btn');

addBtn.addEventListener('click', () => {
  const taskName = acaraInput.value.trim();
  const dueDate = dateInput.value;

  if (!taskName || !dueDate) return;

  // Buat elemen baris
  const tr = document.createElement('tr');
  tr.classList.add('task-row');
  tr.innerHTML = `
    <td class="task-desc">${taskName}</td>
    <td class="task-date">${dueDate}</td>
    <td class="task-status">Pending</td>
    <td class="task-action">
      <button class="done-task"><img src="icon/checkmark.png" alt="✔" /></button>
      <button class="delete-task"><img src="icon/hapus.png" alt="✖" /></button>
    </td>
  `;

  // Sembunyikan "No task found"
  if (noTaskRow) noTaskRow.style.display = 'none';

  // Tambah ke tabel
  tbody.appendChild(tr);

  // Kosongkan input
  acaraInput.value = '';
  dateInput.value = '';

  // Tombol done
  tr.querySelector('.done-task').addEventListener('click', () => {
    tr.querySelector('.task-status').textContent = 'Completed';
    tr.querySelector('.task-status').style.color = 'lightgreen';
  });

  // Tombol delete
  tr.querySelector('.delete-task').addEventListener('click', () => {
    tr.remove();
    // Jika semua task dihapus, munculkan kembali "No task found"
    if (tbody.querySelectorAll('.task-row').length === 0) {
      noTaskRow.style.display = 'table-row';
    }
  });
});

// Tombol DELETE ALL
deleteAllBtn.addEventListener('click', () => {
  document.querySelectorAll('.task-row').forEach(row => row.remove());
  if (noTaskRow) noTaskRow.style.display = 'table-row';
});

const filterBtn = document.querySelector('.filter-btn');
const filterDropdown = document.querySelector('.filter-dropdown');
const filterOptions = document.querySelector('.filter-options');

filterBtn.addEventListener('click', () => {
  filterDropdown.classList.toggle('hide');
});

filterOptions.addEventListener('change', () => {
  const selected = filterOptions.value;
  const taskRows = document.querySelectorAll('.task-row');

  taskRows.forEach(row => {
    const status = row.querySelector('.task-status').textContent.toLowerCase();

    if (selected === 'all' || status === selected) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
});

