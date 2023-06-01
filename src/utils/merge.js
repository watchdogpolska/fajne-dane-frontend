
export default function merge(a, b) {
    let c = {};
    for(let idx in a) {
        c[idx] = a[idx];
    }
    for(let idx in b) {
        c[idx] = b[idx];
    }
    return c;
}
