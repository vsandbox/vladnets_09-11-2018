# @vladnets/ipc-memory

# View
View is described by `src/IMemoryView` interface.

View is `not thread safe`. It works with both `SharedArrayBuffer` and `ArrayBuffer`.
So View is a low-level view.

# Lock
`syncArray` is just a byte sequence where each element presents a lock state.
`0` means no lock. Greater value represents `clientId`.
