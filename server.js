const express = require('express');
const parser = require('body-parser');

const app = express();
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

var sequence = 0;
var contacts = [];

createContact = (req, res) => {
  var contact = { ...req.body, id: sequence++ };
  contacts.push(contact);
  res.send(contact);
};

findAllContacts = (req, res) => {
  res.send(contacts);
};

findContactById = (req, res) => {
  var contact = contacts.find(contact => contact.id == req.params.id);
  contact ? res.send(contact) : res.status(404).send('Contact not found!');
}

updateContact = (req, res) => {
  var index = contacts.findIndex(contact => contact.id == req.params.id);
  if (index != -1) {
    var contact = { ...req.body, id: req.params.id };
    contacts.splice(index, 1, contact)
    res.send(contact);
  } else {
    res.status(404).send('Contact not found!');
  }
}

deleteContact = (req, res) => {
  var index = contacts.findIndex(contact => contact.id == req.params.id);
  if (index != -1) {
    contacts.splice(index, 1)
    res.status(204).send();
  } else {
    res.status(404).send('Contact not found!');
  }
}

app.post('/contacts', createContact);

app.get('/contacts', findAllContacts);

app.get('/contacts/:id', findContactById);

app.put('/contacts/:id', updateContact);

app.delete('/contacts/:id', deleteContact);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
