export interface IRow {
    id?: string,
    modified: Date
}

export interface IList extends IRow {
    name: string
}

export interface IListItem extends IRow {
    text: string,
    isChecked: boolean,
}
