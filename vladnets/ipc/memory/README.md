# @vladnets/ipc-memory

# Diff Method
Everything is sync by diff. Each thread puts a diff in the shared buffer. Rest of threads read the diff and update their data structure.

# MemoryView
It's like `value renderer`.

MemoryView is array-like memory access. It implements methods like `get, set, getAt, setAt` and maybe some to work with arrays.

# MemoryStruct
It's like `object renderer`.

`MemoryStruct` puts data from different `MemoryView`s to one javascript plain object.
`MemoryStruct` renders stored in buffer data to plain javascript object using `MemoryView`.
So `MemoryStruct` render looks dirty, like

```typescript
... renderedValue[key] = memoryView.get(index) ...
```

# Thread-Safe
There is default lock system, but it's easy to write your own, fits exactly your requirements.
To make it thread safe there is a memory lock system. Locks are actually an UInt8Array on shared buffer,
where each element represents an id of resource owner. 0 = no owners, resource is free, >0 = owner (read as thread) id.
Lock array is so big as memory value elements. Means MemoryView representing 100 UInt8 number needs 100 bytes for sync (not sure yet).
