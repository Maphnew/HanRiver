const utils = {};

utils.wildCardSearch = (list, input) => {
    const searchText = (item) => {
        for (let key in item) {
            if (item[key] == null) {
                continue;
            }
            if (
                item[key]
                    .toString()
                    .toUpperCase()
                    .indexOf(input.toString().toUpperCase()) !== -1
            ) {
                return true;
            }
        }
    };
    list = list.filter((value) => searchText(value));
    return list;
};

/**
 *
 * @param {Object} map
 * example:
 * {
 *  countryName: {propertyId: 1000005, propertyName: '국가코드', propertyType: 'Char', columnName: 'NATION_CODE', …},
 *  department: {propertyId: 1000008, propertyName: '부서/소속', propertyType: 'TEXT', columnName: 'DEPARTMENT', …},
 *  email: {propertyId: 1000003, propertyName: '사용자이메일', propertyType: 'DATE', columnName: 'EMAIL', …},
 *  expireDate: {propertyId: 1000007, propertyName: '만료일자', propertyType: 'DATE', columnName: 'EXPIRE_DATE', …},
 *  phoneNumber: {propertyId: 1000006, propertyName: '전화번호', propertyType: 'NUMBER', columnName: 'PHONENUM', …},
 *  role: {propertyId: 1000009, propertyName: '역할', propertyType: 'TEXT', columnName: 'ROLE', …},
 *  userFullName: {propertyId: 1000001, propertyName: '사용자ID', propertyType: 'TEXT', columnName: 'USER_ID', …},
 *  userName: {propertyId: 1000002, propertyName: '사용자명', propertyType: 'TEXT', columnName: 'USER_NAME', …},
 *  userStatus: {propertyId: 1000004, propertyName: '사용자상태코드', propertyType: 'String', columnName: 'USER_STATUS_CODE', …},
 * }
 * @param {Object} params
 * example: {
 *  countryName: "",
 *  email: "",
 *  expireDate: "",
 *  phoneNumber: "",
 *  userFullName: "mark",
 *  userName: "마크",
 *  userStatus: "Y",
 * }
 * @returns {Object}
 * example: {
 *  mql: '1000001==mark;1000002==마크;1000004==Y;1000005==usa'
 * }
 */
utils.buildMqlQuery = (map, params) => {
    const args = {
        mql: "",
    };
    let query = "";
    for (const property in params) {
        if (
            typeof params[property] === "undefined" ||
            params[property] === "" ||
            params[property] === "all"
        ) {
            continue;
        }
        query += `${map[property].columnName}=like=%${params[property]}%;`;
    }

    if (query.length !== 0) {
        args.mql = query.slice(0, -1);
    }

    return args;
};

utils.isEmptyObject = (object) => {
    return Object.keys(object).length === 0 && object.constructor === Object;
};

export default utils;
