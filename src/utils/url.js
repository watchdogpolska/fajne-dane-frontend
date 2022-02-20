
export function getSearchParams() {
    return Object.fromEntries(new URLSearchParams(location.search));
}
