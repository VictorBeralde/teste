export type NearOngsResult = {
    id: number
    nome: string | null
    logradouro: string
    numero: number
    urlImagem: string | null
    distancia: string
    favoritada: boolean
    latLong?: LatLong
}

type LatLong = {
    lat?: string,
    lon?: string
}
