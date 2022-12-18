export function loginWard(): boolean {
    if (sessionStorage.getItem('wallet') === null) {
        return false;
    }

    return true;
}