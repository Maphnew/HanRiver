import { Card, Col, Input, Row, Tree } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { forwardRef, useState } from "react";

import {
    loop,
    findDragObject,
    dropOnTheFirstOrder,
    dropOnTheLastOrder,
    dropOnWhereYouPut,
} from "../../../../utils/tree";
import MenuTreeNode from "./MenuTreeNode";

// TODO: API 데이터 구조 확인 후 전체 로직 수정 필요
const rowData = [
    {
        key: "업무계",
        children: [
            {
                key: "공통",
                children: [{ key: "사용자" }, { key: "역할" }, { key: "메뉴" }],
            },
            {
                key: "상품",
                children: [{ key: "설정" }],
            },
            {
                key: "영업",
                children: [
                    { key: "배치" },
                    { key: "메시지" },
                    { key: "1" },
                    { key: "2" },
                    { key: "3" },
                    { key: "4" },
                    { key: "5" },
                    { key: "6" },
                    { key: "7" },
                    { key: "8" },
                    { key: "9" },
                    { key: "10" },
                    { key: "11" },
                    { key: "12" },
                    { key: "13" },
                    { key: "14" },
                    { key: "15" },
                    { key: "16" },
                    { key: "17" },
                    { key: "18" },
                    { key: "19" },
                    { key: "20" },
                    { key: "21" },
                    { key: "22" },
                    { key: "23" },
                    { key: "24" },
                    { key: "25" },
                    { key: "26" },
                    { key: "27" },
                    { key: "28" },
                    { key: "29" },
                    { key: "30" },
                    { key: "31" },
                    { key: "32" },
                    { key: "end" },
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
        node.unvisibleTitle = title;
        // TODO: loop 함수에서 적용되는 title -> component 변환 중복 제거
        node.title = <MenuTreeNode title={title} nodeKey={node.key} createNode={createNode} />;
        if (node.children) {
            node.children = updateTreeKeys(node.key, node.children);
            node.children = generateTitles(node.children);
        }
        return node;
    });
};

const createNode = (text) => {
    console.log("createNode", text);
};

const gData = generateTitles(rowData);

// TODO: 전역변수 제거 필요
const dataList = [];
const generateList = (nodes) => {
    for (const node of nodes) {
        const { key, title, unvisibleTitle } = node;
        dataList.push({ key, title, unvisibleTitle });
        if (node.children) {
            generateList(node.children);
        }
    }
};

generateList(gData);

const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some((item) => item.key === key)) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey;
};

const HighlightedMenuTreeNode = (props) => {
    const { index, node, searchValue } = props;
    const beforeStr = node.unvisibleTitle.substr(0, index);
    const afterStr = node.unvisibleTitle.substr(index + searchValue.length);
    return (
        <MenuTreeNode
            title={
                <span>
                    {beforeStr}
                    <span className="site-tree-search-value">{searchValue}</span>
                    {afterStr}
                </span>
            }
            nodeKey={node.key}
            createNode={createNode}
        />
    );
};

const MenuTree = forwardRef((props, ref) => {
    const { componentHeight } = props;
    const [treeData, setTreeData] = useState(gData);
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [autoExpandParent, setAutoExpandParent] = useState(true);

    const expandHandler = (expandedKeys) => {
        setExpandedKeys(expandedKeys);
        setAutoExpandParent(false);
    };

    const inputChangeHandler = (e) => {
        const { value } = e.target;
        const keys = dataList
            .map((item) => {
                if (item.unvisibleTitle.indexOf(value) > -1) {
                    return getParentKey(item.key, treeData);
                }
                return null;
            })
            .filter((item, i, self) => {
                return item && self.indexOf(item) === i;
            });
        setExpandedKeys(keys);
        setSearchValue(value);
        setAutoExpandParent(true);
    };
    const loop = (treeData) => {
        return treeData.map((node) => {
            const index = node.unvisibleTitle.indexOf(searchValue);
            const highlightedTitle =
                index > -1 ? (
                    <HighlightedMenuTreeNode index={index} node={node} searchValue={searchValue} />
                ) : (
                    node.title
                );

            if (node.children) {
                return {
                    title: highlightedTitle,
                    unvisibleTitle: node.unvisibleTitle,
                    key: node.key,
                    children: loop(node.children),
                };
            }

            return {
                title: highlightedTitle,
                unvisibleTitle: node.unvisibleTitle,
                key: node.key,
            };
        });
    };
    const selectHandler = (selectedKeys, info) => {
        console.log("selected:", selectedKeys, info);
    };
    const dropHandler = (info) => {
        const dropKey = info.node.key;
        const dragKey = info.dragNode.key;
        const dropPos = info.node.pos.split("-");
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
        let data = [...treeData];
        console.log(data);
        const dragObj = findDragObject(data, dragKey);

        if (!info.dropToGap) {
            // Drop on the content
            data = dropOnTheFirstOrder(data, dropKey, dragObj);
        } else if (
            (info.node.children || []).length > 0 && // has children
            info.node.expanded && // is expanded
            dropPosition === 1 // on the bottom gap
        ) {
            data = dropOnTheLastOrder(data, dropKey, dragObj);
        } else {
            data = dropOnWhereYouPut(data, dropKey, dragObj, dropPosition);
        }
        setTreeData(data);
    };
    return (
        <div
            ref={ref}
            style={{
                height: "100%",
                borderTop: "2px solid #ee8a1b",
            }}
        >
            <Card
                style={{
                    height: "100%",
                }}
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Input
                            placeholder="Search"
                            prefix={<SearchOutlined />}
                            onChange={inputChangeHandler}
                            allowClear
                        />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Tree
                            onExpand={expandHandler}
                            expandedKeys={expandedKeys}
                            autoExpandParent={autoExpandParent}
                            treeData={loop(treeData)}
                            defaultExpandedKeys={["0-0-0"]}
                            onSelect={selectHandler}
                            selectable={true}
                            draggable={{ icon: false }}
                            blockNode={true}
                            onDrop={dropHandler}
                            height={componentHeight * 0.85}
                        />
                    </Col>
                </Row>
            </Card>
        </div>
    );
});

MenuTree.displayName = "MenuTree";

export default MenuTree;
