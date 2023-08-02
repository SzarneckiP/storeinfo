export const dateCreator = () => {
    const newDate = new Date()
    const fullDate = newDate.toLocaleString().slice(0, 17)
    const week = ['niedz', 'pon', 'wt', 'śr', 'czw', 'pt', 'sob']
    const dayOfWeek = week[newDate.getDay()].toLocaleString()

    return `${fullDate} (${dayOfWeek}) `
}

