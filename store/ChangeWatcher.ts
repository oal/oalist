import Database from "./Database";

export default class ChangeWatcher {
    private handlers: Map<string, Array<Function>> = new Map();

    private static dexieActions = ['', 'create', 'update', 'delete'];

    constructor(db: Database) {
        // @ts-ignore
        db.on('changes', changes => {
            // @ts-ignore
            changes.forEach(change => {
                let action = ChangeWatcher.dexieActions[change.type];
                this.emit(`${change.table}`);
                this.emit(`${change.table}.${action}`, change.obj);
                if (action !== 'create') {
                    this.emit(`${change.table}.${action}.${change.key}`, change.obj);
                }
            })
            console.log(changes);
        })
    }

    private emit(event: string, payload: Object | null = null) {
        console.log('EMIT', event, payload, this.handlers)
        let arr = this.handlers.get(event);
        if (!arr) return;

        arr.forEach(handler => {
            handler(payload);
        });
    }

    on(event: string, callback: Function) {
        console.log(`Subscribing to ${event}`);
        let arr = this.handlers.get(event) ?? [];
        let wasEmpty = !arr.length;

        arr.push(callback);

        if (wasEmpty) {
            this.handlers.set(event, arr);
        }
    }

    off(event: string, callback: Function) {
        console.log(`Unsubscribing to ${event}`);
        let arr = this.handlers.get(event);
        if (!arr) return;

        let idx = arr.indexOf(callback)
        if (idx !== -1) arr.splice(idx, 1);
    }
}
