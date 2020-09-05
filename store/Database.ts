import Dexie, {Table} from "dexie";
import observable from "dexie-observable";
import relationships from "dexie-relationships";
import {IList, IListItem} from "~/store/types";

export default class Database extends Dexie {
    lists: Table<IList, string>;
    items: Table<IListItem, string>;

    constructor() {
        super(
            'oalist', {
                addons: [observable, relationships]
            }
        );

        this.version(1).stores({
            lists: '$$id, name, modified',
            items: '$$id, text, modified, listId -> lists.id'
        });

        this.lists = this.table('lists');
        this.items = this.table('items');
    }
}
