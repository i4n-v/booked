export enum LibraryTypes {
    wishes = "Favoritos",
    acquisition = "Biblioteca"
}

export interface LibraryFilters{
    type: keyof typeof LibraryTypes
    page: number
}