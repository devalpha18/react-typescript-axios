export interface IActions {
  id?: string;
  label?: string;
  icon: string;
  link?: string;
  onClickEvent?: (args: any) => (e: React.MouseEvent) => void;
}

export interface IColumnType {
  type: string;
  name: string;
}

export interface IDatatableColumnDefs {
  headerTitle: string;
  dataField: string;
  isKey?: boolean;
  actions?: IActions[];
  columnType?: IColumnType;
}
