import {Table} from "dexie";
import Database from "./Database";
import ChangeWatcher from "./ChangeWatcher";
import {IList, IListItem, IRow} from "./types";


export default class Api {
    private db = new Database();
    private _changes: ChangeWatcher;

    get changes() {
        return this._changes
    };

    constructor() {
        this._changes = new ChangeWatcher(this.db);
    }

    async createList(list: IList) {
        if (!list.color) list.color = '#000';
        if (!list.icon) list.icon = 'mdi-format-list-checks';
        list.modified = new Date();

        return this.db.lists.add(list);
    }

    async saveList(list: IList) {
        return this.save(this.db.lists, list);
    }

    async getList(id: string) {
        return this.db.lists.get(id);
    }

    async getLists() {
        return this.db.lists.orderBy('name').toArray();
    }

    async getListItems(id: string, includeChecked: boolean = false) {
        let query = this.db.items.where('listId').equals(id);
        if (!includeChecked) query.and(it => !it.isChecked);
        return query.reverse().sortBy('modified');
    }

    async saveListItem(item: IListItem) {
        return this.save(this.db.items, item);
    }

    async searchListItems(listId: string, search: string) {
        return this.db.items
            .where('text')
            .startsWithIgnoreCase(search).limit(5)
            .and(it => it.isChecked)
            .toArray();
    }

    private async save(table: Table, obj: IRow) {
        let data = {...obj, modified: new Date()};
        if (obj.id) {
            await table.update(obj.id, data);
            return obj.id;
        }
        return table.add(data);
    }
}
