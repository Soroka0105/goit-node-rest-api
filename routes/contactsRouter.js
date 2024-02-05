import express from "express";
import isValidId from '../helpers/isValidId.js'
import { authenticate } from "../helpers/authenticate.js";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact
} from "../controllers/contactsControllers.js";

const contactsRouter = express.Router();

contactsRouter.get("/",authenticate, getAllContacts);

contactsRouter.get("/:id", authenticate, isValidId, getOneContact);

contactsRouter.delete("/:id",authenticate, deleteContact);

contactsRouter.post("/",authenticate, createContact);

contactsRouter.put("/:id",authenticate, updateContact);

contactsRouter.patch("/:id/favorite",authenticate, isValidId, updateStatusContact);

export default contactsRouter;
