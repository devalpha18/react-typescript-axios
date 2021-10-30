import * as React from 'react';
import { IDatatableColumnDefs } from './DatatableModels';

type IDatatableColumnUnionProps = IDatatableColumnDefs

export const DatatableColumn: React.SFC<IDatatableColumnUnionProps> = props => {

  return (
    <>
      { props.children }
    </>
  );


};
