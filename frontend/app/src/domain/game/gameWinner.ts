export const GameWinner = {
    Draw: 0,
    Dark: 1,
    Light: 2
} as const;

export type GameWinner = typeof GameWinner[keyof typeof GameWinner];
