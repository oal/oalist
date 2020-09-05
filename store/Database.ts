import Dexie, {Table} from "dexie";
import observable from "dexie-observable";
import relationships from "dexie-relationships";

export default class Database extends Dexie {
    lists: Table<IList, string>;
    items: Table<IList, string>;

    constructor() {
        super(
            'oalist', {
                addons: [observable, relationships]
            }
        );

        this.version(1).stores({
            lists: '$$id, name',
            items: '$$id, text, isChecked, listId -> lists.id'
        });

        this.lists = this.table('lists');
        this.items = this.table('items');
    }
}
