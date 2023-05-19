// enum の代わり
// ts では enum は非推奨らしい
export const Disc = {
  Empty: 0,
  Dark: 1,
  Light: 2,
  Guard: 3,
} as const;

export type Disc = (typeof Disc)[keyof typeof Disc];

export const isOppositeDisc = (disc1: Disc, disc2: Disc): boolean => {
  return (
    (disc1 === Disc.Dark && disc2 === Disc.Light) ||
    (disc1 === Disc.Light && disc2 === Disc.Dark)
  );
}

export const getOppositeDisc = (disc: Disc): Disc => {
  return disc === Disc.Dark ? Disc.Light : Disc.Dark;
}

export const discToText = (turnDisc: Disc): string => {
  return turnDisc === Disc.Dark ? "黒" : "白";
};

