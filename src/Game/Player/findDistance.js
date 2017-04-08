import TYPES from "../Item/Item.const";

const findDistance = (items) => {
    let solidDistance = 0;

    items.every((item, index) => {
        if (item === TYPES.ITEM_SOLID) {
            solidDistance = index;
            return false;
        }
        return true;
    });

    return solidDistance;
};

const left = (map, x, y) => {
    const row = map[y] || [];
    const leftItems = [
        ... row.slice(0, x),
    ].reverse();

    return findDistance(leftItems);
};

const right = (map, x, y) => {
    const row = map[y] || [];
    const rightItems = row.slice(x + 1);

    return findDistance(rightItems);
};

const down = (map, x, y) => {
    const rows = map.slice(y + 1);
    const downItems = rows.map(row => row[x]);

    return findDistance(downItems);
};

const up = (map, x, y) => {
    const rows = [
        ... map.slice(0, y),
    ].reverse();
    const upItems = rows.map(row => row[x]);

    return findDistance(upItems);
};

export {
    left, right, down, up,
}
