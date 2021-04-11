const fs = require('fs').promises;
const path = require('path');
const uuid = require('uuid');

const contactsPath = path.resolve(__dirname, "db", "contacts.json");

// TODO: задокументировать каждую функцию
//
function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => {
      return console.table(
         JSON.parse(data)
       );
    })
    .catch((err) => console.log(err.message))
}


function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((contacts) => {
       contacts.find(contact => {
        if (contact.id == contactId) {
           console.table(contact);
        } 
        })
    })
    .catch((err) => console.log(err.message))
}


function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((contacts) => {
      console.table(
        contacts.filter(contact => {
        if (contact.id != contactId) {
          return contact
        }
      })
      );
    })
    .catch((err) => console.log(err.message))
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((contacts) => {

      contacts.push({
        id: uuid.v4(),
        name: name,
        email: email,
        phone: phone
      })

      return console.table(contacts);
    })
    .catch((err) => console.log(err.message))
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
}