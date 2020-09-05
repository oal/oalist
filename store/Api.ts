import {Table} from "dexie";
import Database from "./Database";
import ChangeWatcher from "./ChangeWatcher";
import {IList, IListItem} from "./types";


export default class Api {
    private db = new Database();
    private _changes: ChangeWatcher;

    get changes() {
        return this._changes
    };

    constructor() {
        this._changes = new ChangeWatcher(this.db);
    }

    async createList(name: string) {
        return this.db.lists.add({name});
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
        if(!includeChecked) query.and(it => !it.isChecked);
        return query.toArray();
    }

    async saveListItem(item: IListItem) {
        return this.save(this.db.items, item);
    }

    private async save(table: Table, obj: Object) {
        // @ts-ignore
        if (obj['id']) return table.update(obj['id'], obj);
        return table.add(obj);
    }
}
