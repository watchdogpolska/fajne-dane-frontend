
export const applyFilters = (data, filters) => data.filter((element) => {
    return true;
});

export const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
};

export const getComparator = (order, orderBy) => (order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy));

export const applySort = (data, sort) => {
    const [orderBy, order] = sort.split('|');
    const comparator = getComparator(order, orderBy);
    const stabilizedThis = data.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
        const newOrder = comparator(a[0], b[0]);

        if (newOrder !== 0) {
            return newOrder;
        }

        return a[1] - b[1];
    });

    return stabilizedThis.map((el) => el[0]);
};

export const applyPagination = (data, page, rowsPerPage) => data.slice(page * rowsPerPage,
    page * rowsPerPage + rowsPerPage);
