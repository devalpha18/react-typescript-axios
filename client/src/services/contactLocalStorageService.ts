import { IContact } from "../models/contact";

class ContactLocalStorage {
  private key: string = "contacts"

  //#region query
  fetchContacts = () => {
    const dbcontacts = localStorage.getItem(this.key);
    if (dbcontacts) {
      const contacts: IContact[] = JSON.parse(dbcontacts);
      return contacts;
    }
    return null;
  };

  getById = (id: number) => {
    const dbcontacts = this.fetchContacts()
    if (dbcontacts) {
      const contact = dbcontacts.filter(item => item.id === id)
      return contact[0]
    }
    return null
  }
  //#endregion

  //#region command
  saveContact = (contact: IContact) => {
    let auto_id: number = 1;

    // console.log(`localStorageService::saveContact=>contact ${JSON.stringify(contact)}`);
    let contacts: IContact[] = [];
    const dbcontacts = this.fetchContacts();
    if (dbcontacts) {
      contacts = dbcontacts;
      auto_id = contacts.length + 1
    }
    contact.id = auto_id;
    contacts.push(contact);
    this.saveContacts(contacts)
  };

  updateContact = (id: number, contact: IContact) => {
    let dbcontacts = this.fetchContacts();
    if (dbcontacts) {
      let existingContact = dbcontacts.find(x => x.id === id)
      const index = dbcontacts.findIndex(x => x.id === id)
      if (existingContact) {
        existingContact.name = contact.name
        existingContact.email = contact.email
        existingContact.dateOfBirth = contact.dateOfBirth
        dbcontacts[index] = existingContact
      }
      this.saveContacts(dbcontacts)
    }
  };

  deleteById = (id: number) => {
    const dbcontacts = this.fetchContacts()
    if (dbcontacts) {
      const contacts = dbcontacts.filter(item => item.id !== id)
      this.saveContacts(contacts)
    }
  }

  saveContacts = (contacts: IContact[] ) => {
    localStorage.setItem(this.key, JSON.stringify(contacts));
  }

  clearData = () => {
    localStorage.removeItem(this.key)
  }
  //#endregion
}

const ContactLocalStorageService = new ContactLocalStorage();
export default ContactLocalStorageService;
