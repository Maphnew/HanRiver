export const getParentsKeysByList = (dataList, key, parentsKeys) => {
    let keys = parentsKeys ? parentsKeys : [];
    for (const data of dataList) {
        if (data.propertyId.toString() === key.toString()) {
            if (data.parentId) {
                const k = getParentsKeysByList(dataList, data.parentId, keys);
                keys = keys.concat(data.parentId.toString(), k);
            }
        }
    }
    const setKeys = new Set(keys);
    keys = [...setKeys];
    return keys;
};

export const getParentByTree = (key, tree) => {
    let parent;
    for (const node of tree) {
        if (node.children) {
            if (
                node.children.some((item) => item.propertyId.toString() === key)
            ) {
                parent = node;
            } else if (getParentByTree(key, node.children)) {
                parent = getParentByTree(key, node.children);
            }
        }
    }
    return parent;
};

export const getMenuAsArray = (treeData) => {
    const dataList = [];
    const generateList = (treeData) => {
        for (const node of treeData) {
            const { propertyId, propertyName, pathname, parentId } = node;
            dataList.push({
                propertyId,
                propertyName,
                pathname,
                parentId,
            });
            if (node.children) {
                generateList(node.children);
            }
        }
    };
    generateList(treeData);
    return dataList;
};

export const getMenuDataByPathname = (dataList, pathname) => {
    return dataList.find((menu) => {
        return menu.pathname === pathname;
    });
};

export const getMenuDataById = (dataList, id) => {
    return dataList.find((menu) => {
        return menu.propertyId.toString() === id;
    });
};
