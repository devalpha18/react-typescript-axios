import * as React from 'react';
import { DatatableHeader } from './DatatableHeader';
import { IDatatableColumnDefs, IActions } from './DatatableModels';
import { Link } from 'react-router-dom';
import PaginationComponent from './DatatablePagination';
import './Datatable.css';

interface IDatatableState {
  searchText?: string;
  data?: any[];
  dataPagination?: any[];
  currentPage: number;
}

interface IDatatableProps {
  headers?: any;
  dataSource?: any[];
  pagedData?: any;
  sortby?: any;
  descending?: any;
  pageLength?: any;
  currentPage?: number;
  actions?: IActions[];
  pagination?: boolean;
  remote?: boolean;
  paginationSize?: number;
  sizePerPageList?: number[];
  sizePerPage?: number;
}

type DatatableUnionProps = IDatatableProps;

class Datatable extends React.Component<DatatableUnionProps, IDatatableState> {
  constructor(props: DatatableUnionProps) {
    super(props);
    this.state = {
      searchText: '',
      data: [],
      dataPagination: [],
      currentPage: 1
    };
  }

  componentDidMount() {
    this.setState({ ...this.state, data: this.props.dataSource });
  }

  componentWillReceiveProps(nextProps: DatatableUnionProps) {
    this.setState({ ...this.state, data: nextProps.dataSource });
  }

  /**
   * Event search
   */
  handleChangePage = (dataPagination: any[], page: number) => {
    this.setState({ dataPagination, currentPage: page });
  };

  handleSearchChange = (
    e: React.SyntheticEvent<HTMLInputElement | HTMLButtonElement>
  ) => {
    const searchText = (e.target as any).value;
    this.setState({ ...this.state, searchText }, () => this.search());
  };

  /**
   * Search method. Do search on any column
   */
  search = () => {
    const { searchText } = this.state;
    const filteredList: any[] = [];
    if (
      searchText &&
      searchText.length > 2 &&
      this.props.dataSource &&
      this.props.dataSource.length > 0
    ) {
      const searchKeyword = searchText.toLowerCase();
      // console.log(`searchKeyword: ${searchKeyword}`)
      this.props.dataSource.forEach(element => {
        const propValueList: string[] = Object.values(element);
        propValueList.forEach((val, idx) => {
          if (propValueList[idx]) {
            const str = propValueList[idx].toString().toLowerCase();
            const found = str.includes(searchKeyword);
            const exist = filteredList.includes(element);
            if (found && !exist) {
              filteredList.push(element);
            }
          }
        });
      });

    }

    if (filteredList.length > 0) {
      this.setState({ ...this.state, data: filteredList });
    } else {
      this.setState({ ...this.state, data: this.props.dataSource });
    }
  };

  render() {
    const {
      pagination,
      sizePerPageList,
      sizePerPage,
      paginationSize
    } = this.props;
    const { data, searchText } = this.state;

    const columnDefsProps = this.getColumnDefinition();

    return (
      <>
        <div className="datatable">
          <DatatableHeader
            sizePerPageList={pagination ? sizePerPageList : []}
            search={searchText}
            handleFilterSearch={this.handleSearchChange}
          />

          {/* {this.props.children} */}
          <div className="card" style={{padding: '10px'}}>
            {this.renderDataTable(columnDefsProps)}
            {data && data.length > 0 && pagination && (
              <PaginationComponent
                data={data}
                currentPage={this.state.currentPage}
                sizePerPage={sizePerPage ? sizePerPage : 0}
                total={data ? data.length : 0}
                paginationSize={paginationSize ? paginationSize : 5}
                handleChangePage={this.handleChangePage}
              />
            )}
          </div>
        </div>
      </>
    );
  }

  /**
   * Display table view data
   */
  renderDataTable = (columnDefsProps: IDatatableColumnDefs[]) => {
    return (
      <>
        {/* <!-- table --> */}
        <table className="table table-bordered">
          {/* <!-- header --> */}
          {this.renderHeaders(columnDefsProps)}
          {/* <!-- /.header --> */}

          {/* <!-- body --> */}
          {this.renderBody(columnDefsProps)}
          {/* <!-- /.body --> */}
        </table>
        {/* <!-- /.table --> */}
      </>
    );
  };

  /**
   * Display headers content
   * @param columnDefsProps
   */
  renderHeaders(columnDefsProps: IDatatableColumnDefs[]) {
    const cols = columnDefsProps.map((item, index) => {
      return (
        <th key={index} style={{ color: '#fff' }}>
          {item.headerTitle}
        </th>
      );
    });

    return (
      <>
        <thead style={{ backgroundColor: '#212529' }}>
          <tr style={{ fontSize: '12px' }}>
            {cols}
            {
              <th colSpan={2} style={{ color: '#fff' }}>
                Actions
              </th>
            }
          </tr>
        </thead>
      </>
    );
  }

  /**
   * Display body content
   * @param columnDefsProps
   */
  renderBody(columnDefsProps: IDatatableColumnDefs[]) {
    const data = this.state.dataPagination;

    const bodyContent =
      data && data.length > 0 ? (
        data.map((item, index) => {
          const rowContent = columnDefsProps
            .filter(_ => _ != null)
            .map((col, i) => {
              const val = item[col.dataField];
              let tdContent = val;

              if (col.columnType) {
                // console.log(`columnType: ${col.columnType.type}`)
                switch (col.columnType.type) {
                  case 'checkbox':
                    tdContent = (
                      <input
                        style={{ marginLeft: '0px' }}
                        type={col.columnType.type}
                        name={col.columnType.name}
                        value={val}
                      />
                    );
                    break;
                  case 'array':
                    if (val.length > 0) {
                      const values: string[] = [];
                      val.forEach((element: any) => {
                        if (element.hasOwnProperty('Name')) {
                          values.push(element.Name);
                        }
                      });
                      tdContent = values.join(' | ');
                    }
                    break;
                  case 'chips':
                    console.log(`val: ${JSON.stringify(val)}`);
                    // val.forEach((element: any) => {
                    //   console.log(`val: ${element}`)
                    //   tdContent = element.join(",")
                    // });
                    break;
                }
              }
              return <td key={index + i}>{tdContent}</td>;
            });

          return (
            <tr key={index}>
              {rowContent}

              {this.renderRowActions(item)}
            </tr>
          );
        })
      ) : (
        <tr>
          <td colSpan={columnDefsProps.length + 2}>No data</td>
        </tr>
      );

    return (
      <>
        <tbody>{bodyContent}</tbody>
      </>
    );
  }

  /**
   * Row actions
   */
  renderRowActions = (item: any) => {
    const columnDefsProps = this.getColumnDefinition();
    const { actions } = this.props;

    let identityCol = '';
    columnDefsProps.forEach(col => {
      if (col.isKey) {
        identityCol = col.dataField;
      }
    });
    if (identityCol === '') {
      return;
    }

    if (actions === undefined) {
      return;
    }

    const actionsContent = () => {
      return (
        <>
          <td>
            {actions &&
              actions.map((el, index) => {
                // const link = `${el.link}/${item[identityCol]}`
                // console.log(`link: ${el.link.replace(pattern, item[identityCol])}`)
                let actionContent: any;
                if (el.link && el.link !== '') {
                  const pattern = /:id/gi;
                  const link = `${el.link.replace(pattern, item[identityCol])}`;
                  actionContent = (
                    <Link
                      to={link}
                      className="btn btn-sm btn-flat pull-left action-icon"
                    >
                      <i
                        className="material-icons"
                        style={{ color: '#e6496a' }}
                      >
                        {el.icon}
                      </i>
                    </Link>
                  );
                }

                if (el.onClickEvent && typeof el.onClickEvent === 'function') {
                  actionContent = (
                    <Link
                      to={''}
                      onClick={el.onClickEvent(item[identityCol])}
                      className="btn btn-sm btn-flat pull-left action-icon"
                    >
                      <i
                        className="material-icons"
                        style={{ color: '#e6496a' }}
                      >
                        {el.icon}
                      </i>
                    </Link>
                  );
                }

                return (
                  <React.Fragment key={index}>
                    {actionContent}

                    {index === actions.length - 1 ? '' : '|'}
                  </React.Fragment>
                );
              })}
          </td>
        </>
      );
    };

    return <>{actionsContent()}</>;
  };

  /**
   * Method parse columns definition
   * Update variable `columnDefsProps` if the interface `IDatatableColumnDefs`changes
   */
  getColumnDefinition = (): IDatatableColumnDefs[] => {
    const { children } = this.props;
    const columnDefsProps: IDatatableColumnDefs[] = [];
    React.Children.forEach(children, element => {
      if (!React.isValidElement(element)) {
        return;
      }
      const {
        headerTitle,
        dataField,
        isKey,
        columnType
      } = element.props as any;
      columnDefsProps.push({
        headerTitle,
        dataField,
        isKey: isKey ? isKey : false,
        actions: this.props.actions,
        columnType
      });
    });
    return columnDefsProps;
  };
}

export default Datatable;
