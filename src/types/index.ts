
export type Location = {
    name:string;
    latitude:number;
    longitude:number;
}

export type Coordinates = {
    latitude: number,
    longitude: number
}

export type DistanceData = {
    distance: null | number,
    places: Array<string>

}