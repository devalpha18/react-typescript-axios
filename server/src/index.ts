import * as cors from 'cors';
import bodyParser from 'body-parser'

import Server from "./server";

import ContactLocalStorageService from './services/contactLocalStorageService'
import { IContact } from './models/contact';

const server = Server;
const app = server.app;


//options for cors midddleware
const options: cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: "*",
    preflightContinue: false
  };
app.use(cors.default(options))

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const DEFAULT_ENDPOINT = "/api"
const ENDPOINT_CONTACT = `${DEFAULT_ENDPOINT}/contacts`


app.get(`${ENDPOINT_CONTACT}`, (req, res) => {
  return res.send(ContactLocalStorageService.fetchContacts());
});

app.get(`${ENDPOINT_CONTACT}/:id`, (req, res) => {
  const id = +req.params.id
  return res.send(ContactLocalStorageService.getById(id));
});

app.post(`${ENDPOINT_CONTACT}`, (req, res) => {
  if(!req.body.name) {
    return res.status(400).send({
      success: 'false',
      message: 'name is required'
    });
  } else if(!req.body.email) {
    return res.status(400).send({
      success: 'false',
      message: 'email is required'
    });
  } else if(!req.body.dateOfBirth) {
    return res.status(400).send({
      success: 'false',
      message: 'date of birth is required'
    });
  }

  const contact: IContact = {
    id: 0,
    name: req.body.name,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth
  }
  ContactLocalStorageService.saveContact(contact)
  return res.status(201).send('Contact has been added successfully...');
});

app.put(`${ENDPOINT_CONTACT}`, (req, res) => {
  const contact: IContact = {
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth
  }
  ContactLocalStorageService.updateContact(req.body.id, contact)
  return res.status(200).send('Contact has been updated successfully...');
});

app.delete(`${ENDPOINT_CONTACT}`, (req, res) => {
  return res.status(200).send('Received a DELETE HTTP method');
});


server.run();

