
import contact from '../db/contact.js'


async function listContacts(owner) {
  const data = await contact.find(owner).populate("owner", "name email")
  return data
}

async function getContactById(contactId) {
  const result = await contact.findById(contactId)
  return result || null;
}

async function removeContact(contactId) {
 const result = await contact.findByIdAndDelete(contactId)
 return result
}

async function addContact(info) {
  const newContact = contact.create(info)
  return newContact
}

async function updateById(id, data) {
 const result = await contact.findByIdAndUpdate(id, data, {new:true})
 return result
}



export default {
  addContact,
  removeContact,
  getContactById,
  listContacts,
  updateById,
};

