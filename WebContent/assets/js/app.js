// OPTION A (ES5) : localStorage
var STORAGE_KEY = "people";

// UI
var tbody = document.getElementById("peopleTbody");
var emptyState = document.getElementById("emptyState");
var alertBox = document.getElementById("alertBox");

var btnOpenAdd = document.getElementById("btnOpenAdd");
var btnSearch = document.getElementById("btnSearch");
var btnReset = document.getElementById("btnReset");
var btnSeed = document.getElementById("btnSeed");

var searchId = document.getElementById("searchId");
var searchText = document.getElementById("searchText");

var personModalEl = document.getElementById("personModal");
var personModal = new bootstrap.Modal(personModalEl);

var personForm = document.getElementById("personForm");
var modalTitle = document.getElementById("modalTitle");

var personId = document.getElementById("personId");
var nom = document.getElementById("nom");
var prenom = document.getElementById("prenom");
var age = document.getElementById("age");

// Helpers
function showAlert(type, message) {
  alertBox.className = "alert alert-" + type;
  alertBox.textContent = message;
  alertBox.classList.remove("d-none");
  setTimeout(function () {
    alertBox.classList.add("d-none");
  }, 2500);
}

function readPeople() {
  var raw = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(raw || "[]");
}

function savePeople(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function nextId(list) {
  var max = 0;
  for (var i = 0; i < list.length; i++) {
    var id = Number(list[i].id || 0);
    if (id > max) max = id;
  }
  return max + 1;
}

function renderPeople(list) {
  tbody.innerHTML = "";

  if (!list || list.length === 0) {
    emptyState.classList.remove("d-none");
    return;
  }
  emptyState.classList.add("d-none");

  for (var i = 0; i < list.length; i++) {
    var p = list[i];
    var tr = document.createElement("tr");

    tr.innerHTML =
      "<td>" + p.id + "</td>" +
      "<td>" + p.nom + "</td>" +
      "<td>" + p.prenom + "</td>" +
      "<td>" + p.age + "</td>" +
      '<td class="d-flex gap-2">' +
      '<button class="btn btn-sm btn-outline-primary" data-action="edit" data-id="' + p.id + '">Modifier</button>' +
      '<button class="btn btn-sm btn-outline-danger" data-action="delete" data-id="' + p.id + '">Supprimer</button>' +
      "</td>";

    tbody.appendChild(tr);
  }
}

function loadAll() {
  renderPeople(readPeople());
}

function resetForm() {
  personForm.reset();
  personForm.classList.remove("was-validated");
  personId.value = "";
}

// CRUD
function addPerson(payload) {
  var list = readPeople();
  var newPerson = {
    id: nextId(list),
    nom: payload.nom,
    prenom: payload.prenom,
    age: payload.age
  };
  list.push(newPerson);
  savePeople(list);
  return newPerson;
}

function updatePerson(id, payload) {
  var list = readPeople();
  var found = false;

  for (var i = 0; i < list.length; i++) {
    if (list[i].id === Number(id)) {
      list[i].nom = payload.nom;
      list[i].prenom = payload.prenom;
      list[i].age = payload.age;
      found = true;
      break;
    }
  }
  if (!found) throw new Error("Not found");
  savePeople(list);
}

function deletePerson(id) {
  var list = readPeople();
  var out = [];
  for (var i = 0; i < list.length; i++) {
    if (list[i].id !== Number(id)) out.push(list[i]);
  }
  savePeople(out);
}

function getById(id) {
  var list = readPeople();
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === Number(id)) return list[i];
  }
  return null;
}

function searchByText(text) {
  var t = text.toLowerCase();
  var list = readPeople();
  var out = [];

  for (var i = 0; i < list.length; i++) {
    var n = (list[i].nom || "").toLowerCase();
    var p = (list[i].prenom || "").toLowerCase();
    if (n.indexOf(t) !== -1 || p.indexOf(t) !== -1) out.push(list[i]);
  }
  return out;
}

// Events
btnOpenAdd.addEventListener("click", function () {
  resetForm();
  modalTitle.textContent = "Ajouter une personne";
  personModal.show();
});

btnReset.addEventListener("click", function () {
  searchId.value = "";
  searchText.value = "";
  loadAll();
});

btnSearch.addEventListener("click", function () {
  var idVal = (searchId.value || "").trim();
  var textVal = (searchText.value || "").trim();

  if (idVal) {
    var p = getById(idVal);
    renderPeople(p ? [p] : []);
    if (!p) showAlert("warning", "Aucun résultat pour cet ID.");
    return;
  }
  if (textVal) {
    var result = searchByText(textVal);
    renderPeople(result);
    if (result.length === 0) showAlert("warning", "Aucun résultat.");
    return;
  }
  showAlert("info", "Entre un ID ou un nom/prénom.");
});

btnSeed.addEventListener("click", function () {
  var list = readPeople();
  if (list.length > 0) {
    showAlert("info", "Il y a déjà des données.");
    return;
  }
  savePeople([
    { id: 1, nom: "Ali", prenom: "Sami", age: 22 },
    { id: 2, nom: "Ben", prenom: "Nour", age: 20 }
  ]);
  showAlert("success", "Exemple chargé !");
  loadAll();
});

tbody.addEventListener("click", function (ev) {
  var btn = ev.target.closest("button");
  if (!btn) return;

  var action = btn.dataset.action;
  var id = btn.dataset.id;

  if (action === "delete") {
    if (!confirm("Confirmer la suppression ?")) return;
    deletePerson(id);
    showAlert("success", "Personne supprimée.");
    loadAll();
  }

  if (action === "edit") {
    var p = getById(id);
    if (!p) return;

    resetForm();
    modalTitle.textContent = "Modifier une personne";
    personId.value = p.id;
    nom.value = p.nom;
    prenom.value = p.prenom;
    age.value = p.age;
    personModal.show();
  }
});

personForm.addEventListener("submit", function (e) {
  e.preventDefault();
  e.stopPropagation();

  personForm.classList.add("was-validated");
  if (!personForm.checkValidity()) return;

  var payload = {
    nom: nom.value.trim(),
    prenom: prenom.value.trim(),
    age: Number(age.value)
  };

  try {
    if (!personId.value) {
      addPerson(payload);
      showAlert("success", "Personne ajoutée.");
    } else {
      updatePerson(personId.value, payload);
      showAlert("success", "Personne modifiée.");
    }
    personModal.hide();
    loadAll();
  } catch (err) {
    console.log(err);
    showAlert("danger", "Erreur lors de l’enregistrement.");
  }
});

// init
loadAll();
