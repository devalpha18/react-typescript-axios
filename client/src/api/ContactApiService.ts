import HttpApiService from "./HttpApiService";
import { IContact } from "../models/contact";


const API_BASE = `${process.env.REACT_APP_API_URI}`;

const CONTACT_ENDPOINT = `${API_BASE}/contacts`;


export class ContactApi extends HttpApiService {
  constructor() {
    super(`${API_BASE}`);
  }

  //#region Contact
  getContactById = (id: number) => {
    return this.get(`${CONTACT_ENDPOINT}/${id}`);
  };

  getAllContacts = () => {
    const response = this.get(`${CONTACT_ENDPOINT}`);
    return response
  };

  createContact = (data: IContact) => {
    return super.create(`${CONTACT_ENDPOINT}`, data);
  };

  updateContact = (data: IContact) => {
    return super.update(`${CONTACT_ENDPOINT}`, data);
  };
  //#endregion Contact

}

export const ContactApiService = new ContactApi();