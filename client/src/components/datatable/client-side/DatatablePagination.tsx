import * as React from 'react';

interface IDatatablePaginationProps {
  /**
   * @params {Array} Datas to display
   */
  data?: any[];

  /**
   * @params {number} Current page
   */
  currentPage: number;

  /**
   * @params {number} Number of row per page
   */
  sizePerPage: number;

  /**
   * @params {number} Data total
   */
  total: number;

  /**
   * @params {number}Number of pagination number to display
   */
  paginationSize: number;

  /**
   * @params {function} Function which handle page changes
   */
  handleChangePage: (data: any[], page: number) => void;
}

interface IDatatablePaginationState {
  lastPage: number;
}

class DatatablePagination extends React.Component<
  IDatatablePaginationProps,
  IDatatablePaginationState
> {
  constructor(props: IDatatablePaginationProps) {
    super(props);

    this.state = {
      lastPage: 0
    };
  }

  handleChangePage = (page: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    this.setPaginationData(page);
  };

  componentDidMount() {
    // set page if items array isn't empty
    if (this.props.data && this.props.data.length) {
      this.setPaginationData(this.props.currentPage);
    }
  }

  componentDidUpdate(
    prevProps: IDatatablePaginationProps,
    prevState: IDatatablePaginationState
  ) {
    // reset page if items array has changed
    if (this.props.data !== prevProps.data) {
      this.setPaginationData(this.props.currentPage);
    }
  }

  render() {
    const { currentPage, total, sizePerPage } = this.props;

    const pages = this.getPages();
    // const lastPage = pages.length;

    const totalPages = Math.ceil(total / sizePerPage);

    const pageNumbers: any[] = [];
    pages.map((item, index) => {
      if (currentPage === +item) {
        pageNumbers.push(
          <li value={item} className="page-item active" key={index}>
            <a className="page-link">
              {item}
            </a>
          </li>
        );
      } else {
        pageNumbers.push(
          <li value={item} onClick={this.handleChangePage(+item)} key={index}>
            <a className="page-link" style={{cursor: 'pointer'}}>
              {item}
            </a>
          </li>
        );
      }
    });

    const previousButton = (
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
        <span className="sr-only">Previous</span>
      </a>
    )

    const nextButton = (
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
        <span className="sr-only">Next</span>
      </a>
    )

    return (
      <>
        <div className="row" style={{margin: '10px'}}>
          <div className="col-md-6">Total: {total}</div>
          <div className="col-md-6">
            <nav aria-label="Page navigation" className="float-right">
              <ul className="pagination">
                {/** Next button */}
                {currentPage > 1 ? (
                  <li
                    className="page-item active"
                    onClick={this.handleChangePage(currentPage - 1)}
                  >
                    {previousButton}
                  </li>
                ) : (
                  <li className="page-item disabled">
                    {previousButton}
                  </li>
                )}

                {pageNumbers} {/** Display page numbers */}

                {/** Previous button */}
                {totalPages !== currentPage ? (
                  <li
                    className="page-item active"
                    onClick={this.handleChangePage(currentPage + 1)}
                  >
                    {nextButton}
                  </li>
                ) : (
                  <li className="page-item disabled">
                    {nextButton}
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </>
    );
  }

  getPages = () => {
    const { sizePerPage, paginationSize, total } = this.props;

    let currentPage = this.props.currentPage;

    const totalPages = Math.ceil(total / sizePerPage);

    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: any = 0;
    let endPage: any = 0;

    if (totalPages <= paginationSize) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeCurrentPage = Math.floor(paginationSize / 2);
      const maxPagesAfterCurrentPage = Math.ceil(paginationSize / 2) - 1;

      if (currentPage <= maxPagesBeforeCurrentPage) {
        startPage = 1;
        endPage = paginationSize;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        startPage = totalPages - paginationSize + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    return Array.from(Array(endPage + 1 - startPage).keys()).map(
      i => startPage + i
    );
  };

  setPaginationData = (page: number) => {
    const { data } = this.props;

    if (data) {
      const total = data.length;
      const currentPage = page;
      const sizePerPage = this.props.sizePerPage ? this.props.sizePerPage : 5;
      const startIndex = (currentPage - 1) * sizePerPage;
      const endIndex = Math.min(startIndex + sizePerPage - 1, total - 1);

      const _data = this.getPaginationData(data, startIndex, endIndex);

      this.props.handleChangePage(_data, page);
    }
  };

  getPaginationData = (data: any[], start: number, end: number) => {
    const result = data.slice(start, end + 1);
    return result;
  };
}

export default DatatablePagination;
