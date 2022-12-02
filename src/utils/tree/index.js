export const loop = (data, key, callback) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
            return callback(data[i], i, data);
        }
        if (data[i].children) {
            loop(data[i].children, key, callback);
        }
    }
};

export const findDragObject = (data, dragKey) => {
    let dragObj;
    loop(data, dragKey, (item, index, array) => {
        array.splice(index, 1);
        dragObj = item;
    });
    return dragObj;
};

export const dropOnTheFirstOrder = (data, dropKey, dragObj) => {
    loop(data, dropKey, (item) => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
    });
    return data;
};

export const dropOnTheLastOrder = (data, dropKey, dragObj) => {
    loop(data, dropKey, (item) => {
        item.children = item.children || [];
        item.children.push(dragObj);
    });
    return data;
};

export const dropOnWhereYouPut = (data, dropKey, dragObj, dropPosition) => {
    let ar;
    let i;
    loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
    });
    if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
    } else {
        ar.splice(i + 1, 0, dragObj);
    }
    return data;
};
