import { IMap } from "src/IMap";

enum ELockStatus { unlocked = 0, locked = 1 };

export class Struct {

    public readonly byteLength: number;
    public readonly buffer: SharedArrayBuffer;

    private syncArray: Uint8Array;
    private memberKeyToSyncIndex: IMap<number>;

    public isLocked(key: string | symbol): boolean {
        if (!this.memberKeyToSyncIndex.hasOwnProperty(key)) return false;

        // <string> - typescript doesn't support symbol as key type or I don't know how to cook it
        const syncIndex = this.memberKeyToSyncIndex[<string>key];

        const value = Atomics.load(this.syncArray, syncIndex);

        return value === ELockStatus.locked;
    }

    public lock(key: string | symbol) {
        if (!this.memberKeyToSyncIndex.hasOwnProperty(key)) return false;

        // <string> - typescript doesn't support symbol as key type or I don't know how to cook it
        const syncIndex = this.memberKeyToSyncIndex[<string>key];

        Atomics.store(this.syncArray, syncIndex, ELockStatus.locked);
    }

    public unlock(key: string | symbol) {
        if (!this.memberKeyToSyncIndex.hasOwnProperty(key)) return false;

        // <string> - typescript doesn't support symbol as key type or I don't know how to cook it
        const syncIndex = this.memberKeyToSyncIndex[<string>key];

        Atomics.store(this.syncArray, syncIndex, ELockStatus.unlocked);
    }


}