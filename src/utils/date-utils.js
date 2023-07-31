
export function formatDate(date) {
    let result = date.toISOString().replace('-', '/').split('T')[0].replace('-', '/');
    return result.split('/').reverse().join('/');
}
