import { Disc, discToText } from "../turn/disc"

export const getSkkipedText = (skippedDisc: Disc): string => {
    return `${discToText(skippedDisc)}のターンはスキップされました`
}
