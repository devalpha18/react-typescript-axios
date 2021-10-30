import * as React from 'react';

interface IOwnProps {
  sizePerPageList?: number[];
  search?: string;
  dataSource?: any;
  handleFilterSearch: (
    e: React.SyntheticEvent<HTMLInputElement | HTMLButtonElement>
  ) => void;
}

export const DatatableHeader: React.SFC<IOwnProps> = props => {
  const { search, handleFilterSearch } = props;
  return (
    <>
      {/* {sizePerPageList && sizePerPageList.length  > 0 &&
        <Col md={6}>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="nbEntryToShow" className="mr-sm-2">
              Show
            </Label>
            <Input type="select" name="nbEntryToShow">
              {sizePerPageList &&
                sizePerPageList.map((item, index) => (
                  <React.Fragment key={index}>
                    <option value={item}>{item}</option>
                  </React.Fragment>
                ))}
            </Input>
          </FormGroup>
        </Col>
        } */}

      <div className="row" style={{margin: '10px 10px -5px 10px'}}>
        <div className="col-sm-6 col-md-6">
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Search</label>
            <div className="col-sm-10">
              <input
                type="text"
                name="search"
                className="form-control"
                placeholder="Type a key word here"
                value={search}
                onChange={handleFilterSearch}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
