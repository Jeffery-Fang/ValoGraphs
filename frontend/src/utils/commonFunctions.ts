export function stringToColour(str: string): string {
    let hash: number = 0
    let colour: string = '#'

    str.split('').forEach((char: string): void => {
        hash = char.charCodeAt(0) + ((hash << 5) - hash)
    })

    for (let i: number = 0; i < 3; i++) {
        const value: number = (hash >> (i * 8)) & 0xff
        colour += value.toString(16).padStart(2, '0')
    }

    return colour
}

export async function retrieveData(nameAndTag: string, mode: string): Promise<any> {
    let [name, tag]: string[] = nameAndTag.split('#')
    let url: string =
        import.meta.env.VITE_API_URL + name + '?tag=' + tag + '&mode=' + mode.replace(' ', '') + '&size=10'
    let response: any = await fetch(url, { method: 'GET' })

    return response
}

export function handleProfileSearch(): void {
    let temp: string[]
    let input: HTMLInputElement = document.getElementById('profileSearchInput') as HTMLInputElement

    if (input && input.value.includes('#')) {
        temp = input.value.split('#')
        window.open(`/profile/${temp[0]}/${temp[1]}`, '_blank')
    } else {
        alert('Invalid Input')
    }
}

export function calculateDateDiff(date1: Date, date2: Date): number {
    const oneDay: number = 24 * 60 * 60 * 1000

    return Math.round(Math.abs(((new Date(date1) as any) - (new Date(date2) as any)) / oneDay))
}
