export interface IStructMember<T> {
    get: () => T;
    set: (value: T) => any;
}
