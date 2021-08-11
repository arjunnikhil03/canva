export const ELEMENT_NAME = "MORYADESGINS"

export interface ShapeProperties {
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    gTranslate?: {
        x: number,
        y: number
    }
    selection: {
        circle?: {
            radius: number,
            color: string
        } | ,
        text?: {
            left: number,
            top: number,
            width: number,
            height: number
        }
    },
    uniqueid: string,
    text?: string,
    fillOpacity?: number,
    fontFamily?: string,
    fontSize?: string

}