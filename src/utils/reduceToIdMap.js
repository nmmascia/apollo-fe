export default (acc, curr) => {
    const all = acc;
    all[curr.id] = curr;
    return all;
};
