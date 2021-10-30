import * as React from "react";
import Datatable from "./Datatable";
import { DatatableColumn } from "./DatatableColumn";

interface IOwnProps {
  data: any[];
}

class DatatableExample extends React.Component<IOwnProps, {}> {
  constructor(props: IOwnProps) {
    super(props);
  }

  onDismiss = () => {
    this.setState({ isAlertActive: false });
  };

  toolbar = () => {
    return (
      <div className="row">
        <div className="col-md-12">
          <button className="btn btn-success">+ Add</button>
        </div>
      </div>
    );
  };

  handleClose = () => {
    this.setState({ visiblePopupDelReferential: false });
  };

  handleSave = () => {
    this.setState({ visiblePopupDelReferential: false });
  };

  handleDeleteReferential = (id: any) => (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (id && id > 0) {
      this.setState({ visiblePopupDelReferential: true });
    }
  };

  render = () => {
    const { data } = this.props;

    return (
      <>
        <React.Fragment>
          {this.toolbar()}

          <div className="row">
            <div className="col-md-12">
              <Datatable
                dataSource={data}
                sizePerPage={10}
                sizePerPageList={[2, 5, 10]}
                pagination={true}
                paginationSize={5}
                actions={[
                  { link: "/contact/:id/edit", icon: "edit" },
                  { link: "/contact/:id", icon: "pageview" }
                ]}
              >
                <DatatableColumn headerTitle="Id" dataField="Id" isKey={true} />
                <DatatableColumn headerTitle="Parent Id" dataField="ParentId" />
                <DatatableColumn headerTitle="Type" dataField="Type" />
                <DatatableColumn headerTitle="Value" dataField="Value" />
                <DatatableColumn headerTitle="Scoring" dataField="Scoring" />
              </Datatable>
            </div>
          </div>
        </React.Fragment>
      </>
    );
  };
}

export default DatatableExample;
