// const fs = require("fs/promises");
import { promises as fs } from "fs";
import * as path from "path";
// const path = require("path");
import uniqid from "uniqid";
// var uniqid = require("uniqid");
// const {nanoid} = require("nanoid");

const contactsPath = path.join("db", "contacts.json");
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}
async function getContactById(contactId) {
  const data = await listContacts();
  const result = data.find((item) => item.id === contactId);
  return result || null;
}
async function removeContact(contactId) {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return result;
}
async function addContact(info) {
  const data = await listContacts();
  const newContact = {
    id: uniqid(),
    ...info,
  };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
}

async function updateById(id, data) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = {
    id,
    ...data,
  };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}

export default {
  addContact,
  removeContact,
  getContactById,
  listContacts,
  updateById,
};

// module.exports = {
//   addContact,
//   removeContact,
//   getContactById,
//   listContacts,
// };
