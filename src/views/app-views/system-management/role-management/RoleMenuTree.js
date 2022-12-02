import { Tree } from "antd";
import { useState } from "react";

import RoleMenuTreeCheckboxGroup from "./RoleMenuTreeCheckboxGroup";

const rowData = [
    {
        key: "업무계",
        children: [
            {
                key: "공통",
            },
            {
                key: "상품",
            },
            {
                key: "영업",
            },
            {
                key: "기타",
                children: [
                    {
                        key: "공통",
                    },
                    {
                        key: "고객",
                    },
                    {
                        key: "업무",
                    },
                ],
            },
        ],
    },
];

const updateTreeKeys = (parentKey, data) => {
    return data.map((node) => {
        node.key = `${parentKey}-${node.key}`;
        return node;
    });
};

const generateTitles = (data) => {
    return data.map((node) => {
        const dashIndex = node.key.lastIndexOf("-");
        let title = node.key;
        if (dashIndex !== -1) {
            title = node.key.slice(dashIndex + 1);
        }
        if (node.children) {
            node.title = title;
            node.children = updateTreeKeys(node.key, node.children);
            node.children = generateTitles(node.children);
        } else {
            node.title = <RoleMenuTreeCheckboxGroup title={title} nodeKey={node.key} />;
        }
        return node;
    });
};

const menuData = generateTitles(rowData);

const testTreeData = [
    {
        title: "업무계",
        key: "업무계",
        children: [
            {
                title: <RoleMenuTreeCheckboxGroup title={"공통"} />,
                key: "업무계-공통",
            },
            {
                title: <RoleMenuTreeCheckboxGroup title={"상품"} />,
                key: "업무계-상품",
            },
            {
                title: <RoleMenuTreeCheckboxGroup title={"영업"} />,
                key: "업무계-영업",
            },
            {
                title: "기타",
                key: "업무계-기타",
                disabled: true,
                children: [
                    {
                        title: <RoleMenuTreeCheckboxGroup title={"공통"} />,
                        key: "업무계-기타-공통",
                        disableCheckbox: true,
                    },
                    {
                        title: <RoleMenuTreeCheckboxGroup title={"상품"} />,
                        key: "업무계-기타-상품",
                    },
                    {
                        title: "0-0-3-2",
                        key: "0-0-3-2",
                    },
                    {
                        title: "0-0-3-3",
                        key: "0-0-3-3",
                    },
                    {
                        title: "0-0-3-4",
                        key: "0-0-3-4",
                    },
                    {
                        title: "0-0-3-5",
                        key: "0-0-3-5",
                    },
                    {
                        title: "leaf",
                        key: "0-0-3-6",
                    },
                    {
                        title: "leaf",
                        key: "0-0-3-7",
                    },
                    {
                        title: "leaf",
                        key: "0-0-3-8",
                    },
                    {
                        title: "leaf",
                        key: "0-0-3-9",
                    },
                    {
                        title: "leaf",
                        key: "0-0-3-10",
                    },
                    {
                        title: "leaf",
                        key: "0-0-3-11",
                    },
                    {
                        title: "leaf",
                        key: "0-0-3-12",
                    },
                    {
                        title: "leaf",
                        key: "0-0-3-13",
                    },
                ],
            },
        ],
    },
];

const RoleMenuTree = (props) => {
    const [searchValue, setSearchValue] = useState("");
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);

    const expandHanlder = (expandedKeys) => {
        console.log(expandedKeys);
        setExpandedKeys(expandedKeys);
        setAutoExpandParent(false);
    };
    return (
        <div>
            <h3>메뉴목록</h3>
            <Tree
                onExpand={expandHanlder}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                treeData={menuData}
                height={250}
                blockNode={true}
                selectable={false}
                style={{ marginTop: "10px", width: "100%" }}
            />
        </div>
    );
};

export default RoleMenuTree;
