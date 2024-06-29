export function isJSON(str: string) {
    try {
        let newJson = JSON.parse(str)
        return (typeof newJson === 'object' && newJson !== str) || false
    } catch (e) {
        return false
    }
}

export const extractErrorMessage = (err: any) => {
    return err?.response?.data?.message || err?.response?.data
}
