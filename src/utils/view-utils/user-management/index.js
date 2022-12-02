import { USER_CLASS_ID } from "../../../configs/class-id";
import { USER } from "../../../configs/property-id/index.ts";

/**
 * function mapUserProperties: getUserClassDefinition 함수(Class ID로 사용자관리의 프로퍼티 조회)로 부터 받아온 Properties를 object형태로 매핑함
 * @param {Array} list
 * [
 *     {propertyId: 1000001, propertyName: '사용자ID', propertyType: 'TEXT', columnName: 'USER_ID', …},
 *     {propertyId: 1000003, propertyName: '사용자이메일', propertyType: 'DATE', columnName: 'EMAIL', …},
 *     {propertyId: 1000004, propertyName: '사용자상태코드', propertyType: 'String', columnName: 'USER_STATUS_CODE', …},
 *     {propertyId: 1000005, propertyName: '국가코드', propertyType: 'Char', columnName: 'NATION_CODE', …},
 *     {propertyId: 1000006, propertyName: '전화번호', propertyType: 'NUMBER', columnName: 'PHONENUM', …},
 *     {propertyId: 1000007, propertyName: '만료일자', propertyType: 'DATE', columnName: 'EXPIRE_DATE', …},
 *     {propertyId: 1000008, propertyName: '부서/소속', propertyType: 'TEXT', columnName: 'DEPARTMENT', …},
 *     {propertyId: 1000009, propertyName: '역할', propertyType: 'TEXT', columnName: 'ROLE', …},
 *     {propertyId: 1000002, propertyName: '사용자명', propertyType: 'TEXT', columnName: 'USER_NAME', …},
 *
 * ]
 * @returns {Object}
 * {
 *    countryName: {propertyId: 1000005, propertyName: '국가코드', propertyType: 'Char', columnName: 'NATION_CODE', …},
 *    department: {propertyId: 1000008, propertyName: '부서/소속', propertyType: 'TEXT', columnName: 'DEPARTMENT', …},
 *    email: {propertyId: 1000003, propertyName: '사용자이메일', propertyType: 'DATE', columnName: 'EMAIL', …},
 *    expireDate: {propertyId: 1000007, propertyName: '만료일자', propertyType: 'DATE', columnName: 'EXPIRE_DATE', …},
 *    phoneNumber: {propertyId: 1000006, propertyName: '전화번호', propertyType: 'NUMBER', columnName: 'PHONENUM', …},
 *    role: {propertyId: 1000009, propertyName: '역할', propertyType: 'TEXT', columnName: 'ROLE', …},
 *    userFullName: {propertyId: 1000001, propertyName: '사용자ID', propertyType: 'TEXT', columnName: 'USER_ID', …},
 *    userName: {propertyId: 1000002, propertyName: '사용자명', propertyType: 'TEXT', columnName: 'USER_NAME', …},
 *    userStatus: {propertyId: 1000004, propertyName: '사용자상태코드', propertyType: 'String', columnName: 'USER_STATUS_CODE', …},
 * }
 */

export const mapUserProperties = (list) => {
    const propertyObj = {};
    for (let ppty of list) {
        switch (ppty.propertyId) {
            case USER.ID:
                propertyObj.userFullName = ppty;
                break;
            case USER.NAME:
                propertyObj.userName = ppty;
                break;
            case USER.EMAIL:
                propertyObj.email = ppty;
                break;
            case USER.STATUS_CODE:
                propertyObj.userStatus = ppty;
                break;
            case USER.NATION_CODE:
                propertyObj.countryName = ppty;
                break;
            case USER.PHONE_NUM:
                propertyObj.phoneNumber = ppty;
                break;
            case USER.EXPIRE_DATE:
                propertyObj.expireDate = ppty;
                break;
            case USER.DEPARTMENT:
                propertyObj.department = ppty;
                break;
            case USER.ROLE:
                propertyObj.role = ppty;
                break;
            default:
                break;
        }
    }
    return propertyObj;
};

/**
 * function unmapUserProperties: form으로 부터 가져온 object 데이터를 생성, 수정 API Request 형식으로 변환.
 * @param {Object} params
 *  {
 *     countryName: ""
 *     email: ""
 *     expireDate: ""
 *     phoneNumber: ""
 *     userFullName: "mark"
 *     userName: "마크"
 *     userStatus: "Y"
 * }
 * @returns {Object}
 * * {
 *   classId: 100
 *   propertyList: [
 *       {propertyId: 1000001, propertyVal: 'mark'},
 *       {propertyId: 1000002, propertyVal: '마크'},
 *       {propertyId: 1000004, propertyVal: 'Y'},
 *   ]
 * }
 */

export const unmapUserProperties = (params) => {
    const body = {
        classId: USER_CLASS_ID,
        propertyList: [],
    };
    for (const property in params) {
        if (typeof params[property] === "undefined" || params[property] === "") {
            continue;
        }
        const args = {};
        switch (property) {
            case "userFullName":
                args.propertyId = USER.ID;
                break;
            case "userName":
                args.propertyId = USER.NAME;
                break;
            case "email":
                args.propertyId = USER.EMAIL;
                break;
            case "userStatus":
                args.propertyId = USER.STATUS_CODE;
                break;
            case "countryName":
                args.propertyId = USER.NATION_CODE;
                break;
            case "phoneNumber":
                args.propertyId = USER.PHONE_NUM;
                break;
            case "expireDate":
                args.propertyId = USER.EXPIRE_DATE;
                break;
            case "department":
                args.propertyId = USER.DEPARTMENT;
                break;
            case "role":
                args.propertyId = USER.ROLE;
                break;
            default:
                break;
        }
        args.propertyVal = params[property];
        body.propertyList.push(args);
    }
    return body;
};

/* function matchDataToMap
* API로부터 받은 데이터를 매핑, element에 데이터를 적용시키기 위함.

* EXAMPLE
* params:

* map:
* {
*   countryName: {propertyId: 1000005, propertyName: '국가코드', propertyType: 'Char', columnName: 'NATION_CODE', …},
*   department: {propertyId: 1000008, propertyName: '부서/소속', propertyType: 'TEXT', columnName: 'DEPARTMENT', …},
*   email: {propertyId: 1000003, propertyName: '사용자이메일', propertyType: 'DATE', columnName: 'EMAIL', …},
*   expireDate: {propertyId: 1000007, propertyName: '만료일자', propertyType: 'DATE', columnName: 'EXPIRE_DATE', …},
*   phoneNumber: {propertyId: 1000006, propertyName: '전화번호', propertyType: 'NUMBER', columnName: 'PHONENUM', …},
*   role: {propertyId: 1000009, propertyName: '역할', propertyType: 'TEXT', columnName: 'ROLE', …},
*   userFullName: {propertyId: 1000001, propertyName: '사용자ID', propertyType: 'TEXT', columnName: 'USER_ID', …},
*   userName: {propertyId: 1000002, propertyName: '사용자명', propertyType: 'TEXT', columnName: 'USER_NAME', …},
*   userStatus: {propertyId: 1000004, propertyName: '사용자상태코드', propertyType: 'String', columnName: 'USER_STATUS_CODE', …},
* }

* data:
* {
*    abbrName: null,
*    classId: 100,
*    createDt: null,
*    cusrId: 1,
*    modifyDt: null,
*    musrId: null,
*    objInd1: null,
*    objInd2: null,
*    objInd3: null,
*    objInd4: null,
*    objInd5: null,
*    objNo1: null,
*    objNo2: null,
*    objRmk1: null,
*    objRmk2: null,
*    objRmk3: null,
*    objRmk4: null,
*    objRmk5: null,
*    objSeq: null,
*    objectId: 2,
*    objectName: null,
*    orgObjectId: null,
*    propertyList: [
*       {objectId: 2, propertyId: 1000001, propertyVal: '사용자ID', columnName: null, …},
*       {objectId: 2, propertyId: 1000002, propertyVal: '사용자명', columnName: null, …},
*       {objectId: 2, propertyId: 1000003, propertyVal: '사용자이메일', columnName: null, …},
*       {objectId: 2, propertyId: 1000004, propertyVal: '사용자상태코드', columnName: null, …},
*       {objectId: 2, propertyId: 1000005, propertyVal: '국가코드', columnName: null, …},
*       {objectId: 2, propertyId: 1000006, propertyVal: '전화번호', columnName: null, …},
*    ]
* }

* return:

* {
*     countryName: "국가코드",
*     email: "사용자이메일",
*     objectId: 2,
*     phoneNumber: "전화번호",
*     userFullName: "사용자ID",
*     userName: "사용자명",
*     userStatus: "사용자상태코드",
* }

*/

export const matchDataToMap = (map, data) => {
    const user = {};
    user.objectId = data.objectId;
    for (let property of data.propertyList) {
        switch (property.propertyId) {
            case map.userFullName.propertyId:
                user.userFullName = property.propertyVal;
                break;
            case map.userName.propertyId:
                user.userName = property.propertyVal;
                break;
            case map.userStatus.propertyId:
                user.userStatus = property.propertyVal;
                break;
            case map.countryName.propertyId:
                user.countryName = property.propertyVal;
                break;
            case map.email.propertyId:
                user.email = property.propertyVal;
                break;
            case map.phoneNumber.propertyId:
                user.phoneNumber = property.propertyVal;
                break;
            case map.expireDate.propertyId:
                user.expireDate = property.propertyVal;
                break;
            default:
                break;
        }
    }
    return user;
};
