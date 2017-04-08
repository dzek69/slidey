const ITEM_EMPTY = 0;
const ITEM_SOLID = 1;
const ITEM_EXIT = 2;
const ITEM_PLAYER = 3;

export default {
    ITEM_EMPTY,
    ITEM_SOLID,
    ITEM_EXIT,
    ITEM_PLAYER,
}

export const classNames = {
    [ITEM_EMPTY]: "item--empty",
    [ITEM_SOLID]: "item--solid",
    [ITEM_EXIT]: "item--exit",
    [ITEM_PLAYER]: "item--player",
};
