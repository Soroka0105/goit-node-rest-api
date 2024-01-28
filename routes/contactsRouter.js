import express from "express";
import isValidId from '../helpers/isValidId.js'
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact
} from "../controllers/contactsControllers.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id",isValidId, getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", createContact);

contactsRouter.put("/:id", updateContact);

contactsRouter.patch("/:id/favorite",isValidId, updateStatusContact);

export default contactsRouter;
