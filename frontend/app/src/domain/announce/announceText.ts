import { Disc, discToText } from "../turn/disc"

export const getTurnText = (disc: Disc): string => {
    return `${discToText(disc)}のターンです`
}

export const getWinnerText = (disc: Disc): string => {
    return `${discToText(disc)}の勝利です`
}



