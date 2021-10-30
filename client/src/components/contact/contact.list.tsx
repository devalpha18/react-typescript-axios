import * as React from "react";
import { IContact } from "../../models/contact";
// import ErrorMessage from "../common/error.message";
// import Loading from "../common/loading";
import { ContactApiService } from "../../api/ContactApiService";


interface IOwnProps {
 handleDelete: (id: number) => (e: React.MouseEvent) => void;
 handleEdit: (id: number) => (e: React.MouseEvent) =>  void;
}

interface IOwnState {
  contacts: IContact[];
}

class ContactList extends React.Component<IOwnProps, IOwnState> {
  constructor(props: IOwnProps) {
    super(props)
    this.state = {
      contacts: []
    }
  }

  async componentDidMount() {
    const response = await ContactApiService.getAllContacts();
    this.setState({contacts: response.data})
  }
  
  // if (loading) return <><Loading /></>
  // if (error || !data) return <><ErrorMessage error={error} /></>

  render() {
    const {contacts} = this.state 
    return (
      <>
        <h6>Contact list</h6>
  
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Date of birth</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts && contacts.length > 0 &&
                contacts.map((item: any, index: any) => {
                  return (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.dateOfBirth}</td>
                        <th>
                          <i className="fa fa-edit" onClick={this.props.handleEdit(item.id)} style={{color: '##0d903c', cursor: 'pointer'}}>&nbsp;</i> | <i className="fa fa-trash" onClick={this.props.handleDelete(item.id)} style={{color: 'red', cursor: 'pointer'}}>&nbsp;</i>
                        </th>
                      </tr>
                    </React.Fragment>
                  );
                })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
};


export default ContactList;
