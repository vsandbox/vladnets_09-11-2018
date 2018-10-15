import { IMap } from "src/IMap";
import { IStructMember } from "./IStructMember";

enum ELockStatus { unlocked = 0, locked = 1 };

export class Struct {

    public readonly byteLength: number;
    public readonly buffer: SharedArrayBuffer;

    private syncArray: Uint8Array;
    private memberKeyToSyncIndex: IMap<number>;

    private members: IMap<IStructMember<any>>;

    public get<U>(key: string | symbol): U | undefined {
        // <string> - typescript doesn't support symbol as key type or I don't know how to cook it
        const member = <IStructMember<U>>this.members[<string>key];
        if (!member) return;

        return member.get();
    }

    public set<U = any>(key: string | symbol, value: U) {
        // <string> - typescript doesn't support symbol as key type or I don't know how to cook it
        const member = <IStructMember<U>>this.members[<string>key];
        if (!member) return;

        return member.set(value);
    }

    public isLocked(key: string | symbol): boolean {
        if (!this.memberKeyToSyncIndex.hasOwnProperty(key)) return false;

        // <string> - typescript doesn't support symbol as key type or I don't know how to cook it
        const syncIndex = this.memberKeyToSyncIndex[<string>key];

        const value = Atomics.load(this.syncArray, syncIndex);

        return value === ELockStatus.locked;
    }

    public lock(key: string | symbol) {
        if (!this.memberKeyToSyncIndex.hasOwnProperty(key)) return;

        // <string> - typescript doesn't support symbol as key type or I don't know how to cook it
        const syncIndex = this.memberKeyToSyncIndex[<string>key];

        Atomics.store(this.syncArray, syncIndex, ELockStatus.locked);
    }

    public unlock(key: string | symbol) {
        if (!this.memberKeyToSyncIndex.hasOwnProperty(key)) return;

        // <string> - typescript doesn't support symbol as key type or I don't know how to cook it
        const syncIndex = this.memberKeyToSyncIndex[<string>key];

        Atomics.store(this.syncArray, syncIndex, ELockStatus.unlocked);
    }

}