# ipc

# Notes
- Use a `SINGLE` buffer all the time. Pass current offset to value parsers.
    - to increase performance
- `DO NOT` use buffer.slice. It decreases performance. A lot, I mean, tens times slower then even creating `DataView` for each value getting.

# Glossary
- `value type` - Type of processing buffer representing by uint8

# Some Test Results
- from buffer to array of `20 000` uint16|uin32 ~ `3ms`
- from buffer to array of `200 000` uin32 ~ `12ms`
- from typed array to array of `200 000` uin32 ~ `3ms`
- fill by single view of `200 000` uin32 ~ `17ms`
- from buffer to array by a single view of `200 000` uin32 ~ `12ms`
- Arra.from typed array of `200 000` uin32 ~ `50ms`
