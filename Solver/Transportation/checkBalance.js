export function isBalanced(supplies, demands) {
    const suppliesSum = Object.values(supplies).reduce((accumulator, value) => {
        return accumulator + value;
    }, 0);

    const demandsSum = Object.values(demands).reduce((accumulator, value) => {
        return accumulator + value;
    }, 0);

    return suppliesSum === demandsSum
}
