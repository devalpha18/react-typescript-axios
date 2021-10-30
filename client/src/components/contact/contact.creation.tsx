import * as React from "react";
import { IContact } from "../../models/contact";
import { ContactApiService } from "../../api/ContactApiService";
import { toast } from "react-toastify";

interface IOwnProps {
  editContactId?: number;
}

interface IOwnState {
  contact: IContact;
}

class ContactCreation extends React.Component<IOwnProps, IOwnState> {
  constructor(props: IOwnProps) {
    super(props);

    this.state = {
      contact: {
        id: 0,
        name: "",
        email: "",
        dateOfBirth: ""
      }
    };
  }

  async componentWillReceiveProps(nextProps: IOwnProps){
    console.log(`${nextProps.editContactId}`)
    if (nextProps.editContactId && nextProps.editContactId > 0) {
      const response = await ContactApiService.getContactById(nextProps.editContactId)
      this.setState({contact: response.data})
    }
    
  }

  render() {
    const { contact } = this.state
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div className="card bg-light mb-3">
            <div className="card-header">New contact</div>
            <div className="card-body">
              <div className="card-text">
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={contact.name}
                      placeholder="Enter name"
                      className="form-control"
                      required
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label>Email address</label>
                    <input
                      type="email"
                      name="email"
                      value={contact.email}
                      placeholder="Enter email"
                      className="form-control"
                      aria-describedby="emailHelp"
                      required
                      onChange={this.handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>

                  <div className="form-group col-md-4">
                    <label>Date of birth</label>
                    <input
                      type="date"
                      max="2020-12-01"
                      min="1900-12-01"
                      name="dateOfBirth"
                      value={contact.dateOfBirth}
                      placeholder="Enter date of birth"
                      className="form-control"
                      required
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>

                {contact.id > 0 && (
                  <input
                    className="btn btn-outline-danger"
                    type="submit"
                    value="Update"
                  />
                )}
                {` `}
                {contact.id <= 0 && (
                  <input
                    className="btn btn-outline-primary"
                    type="submit"
                    value="Save"
                  />
                )}
                {` `}
                <input
                  className="btn btn-outline-warning"
                  type="button"
                  value="Reset"
                  onClick={this.handleReset}
                />
                {` `}
              </div>
            </div>
          </div>
        </form>
      </>
    );
  }

  handleReset = () => {
    this.setState({
      contact: {
        id: 0,
        name: "",
        email: "",
        dateOfBirth: ""
      }
    })
  };

  handleSubmit = async (
    e: any // React.SyntheticEvent<HTMLInputElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
    // console.log(`ContactCreation::handleSubmit=>contact ${JSON.stringify(contact)}`);
    const { contact } = this.state
    if (contact.id > 0) {
      // console.log(`${JSON.stringify(contact)}`)
      // console.log(`Updated successfully...`);
      toast.success(`Updated successfully...`)
      const response= await ContactApiService.updateContact(contact)
      console.log(`${JSON.stringify(response)}`)
    } else {
      // console.log(`${JSON.stringify(contact)}`)
      // console.log(`added successfully...`);
      toast.success(`Added successfully...`)
      const response = await ContactApiService.createContact(contact)
      console.log(`${JSON.stringify(response)}`)
      this.handleReset();
    }

    
  };

  /**
   * Common input change event
   * When the field is entered an event is raised and update the state
   */
  handleInputChange = (
    e: React.SyntheticEvent<HTMLInputElement | HTMLButtonElement>
  ): void => {
    e.preventDefault();

    const target = e.target as any;

    this.setState({
      contact: {
        ...this.state.contact,
        [target.name]: target.value 
      }
    })
  };
}


export default ContactCreation;
