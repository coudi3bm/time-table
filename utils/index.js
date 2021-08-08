export function objIsEmpty(obj) {
    for (let i in obj) return false
    return true
}

export function getUnixTime(date) {
    return date.getTime() / 1000
}

export function getDateFromUnixTime(unixTime) {
    return new Date(unixTime * 1000)
}