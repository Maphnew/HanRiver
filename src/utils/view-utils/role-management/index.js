import { ROLE_CLASS_ID } from "../../../configs/class-id";
import { ROLE } from "../../../configs/property-id/index.ts";

/**
 * function mapRoleProperties
 *
 * @param {Array} list
 * [
 *  {propertyId: 1010001, propertyName: '역할코드', propertyType: 'TEXT', columnName: 'ROLE_CODE', propertyFormat: null, …},
 *  {propertyId: 1010002, propertyName: '역할명', propertyType: 'TEXT', columnName: 'ROLE_NAME', propertyFormat: null, …},
 *  {propertyId: 1010005, propertyName: '수정일자', propertyType: 'DATE', columnName: 'MODIFY_DT', propertyFormat: null, …},
 *  {propertyId: 1010003, propertyName: '생성일자', propertyType: 'DATE', columnName: 'CREATE_DT', propertyFormat: null, …},
 *  {propertyId: 1010004, propertyName: '생성사용자ID', propertyType: 'TEXT', columnName: 'CREATE_USER', propertyFormat: null, …},
 *  {propertyId: 1010006, propertyName: '수정사용자ID', propertyType: 'TEXT', columnName: 'MODIFY_USER', propertyFormat: null, …},
 * ]
 * @returns {Object}
 * {
 *  roleCode: {propertyId: 1010001, propertyName: '역할코드', propertyType: 'TEXT', columnName: 'ROLE_CODE', propertyFormat: null, …},
 *  roleCreateDate: {propertyId: 1010003, propertyName: '생성일자', propertyType: 'DATE', columnName: 'CREATE_DT', propertyFormat: null, …},
 *  roleCreateUser: {propertyId: 1010004, propertyName: '생성사용자ID', propertyType: 'TEXT', columnName: 'CREATE_USER', propertyFormat: null, …},
 *  roleModifyDate: {propertyId: 1010005, propertyName: '수정일자', propertyType: 'DATE', columnName: 'MODIFY_DT', propertyFormat: null, …},
 *  roleModifyUser: {propertyId: 1010006, propertyName: '수정사용자ID', propertyType: 'TEXT', columnName: 'MODIFY_USER', propertyFormat: null, …},
 *  roleName: {propertyId: 1010002, propertyName: '역할명', propertyType: 'TEXT', columnName: 'ROLE_NAME', propertyFormat: null, …},
 * }
 */

export const mapRoleProperties = (list) => {
    const roleObject = {};
    for (let ppty of list) {
        switch (ppty.propertyId) {
            case ROLE.CODE:
                roleObject.roleCode = ppty;
                break;
            case ROLE.NAME:
                roleObject.roleName = ppty;
                break;
            case ROLE.CREATE_DATE:
                roleObject.roleCreateDate = ppty;
                break;
            case ROLE.CREATE_USER:
                roleObject.roleCreateUser = ppty;
                break;
            case ROLE.MODIFY_DATE:
                roleObject.roleModifyDate = ppty;
                break;
            case ROLE.MODIFY_USER:
                roleObject.roleModifyUser = ppty;
                break;
            default:
                break;
        }
    }
    return roleObject;
};

/**
 *
 * @param {Object} params
 * {
 *  roleCode: "MSV-000039"
 *  roleName: "DA"
 * }
 * @returns
 * {
 *   classId: 101,
 *   propertyList: [
 *     {propertyId: 1010001, propertyVal: 'MSV-000039'},
 *     {propertyId: 1010002, propertyVal: 'DA'},
 *   ]
 * }
 */

export const unmapRoleProperties = (params) => {
    const body = {
        classId: ROLE_CLASS_ID,
        propertyList: [],
    };
    for (const property in params) {
        if (typeof params[property] === "undefined" || params[property] === "") {
            continue;
        }
        const args = {};
        switch (property) {
            case "roleCode":
                args.propertyId = ROLE.CODE;
                break;
            case "roleName":
                args.propertyId = ROLE.NAME;
                break;
            default:
                break;
        }
        args.propertyVal = params[property];
        body.propertyList.push(args);
    }
    return body;
};

/**
 * function matchDataToMap
 *
 * @param {Object} map
 * {
 *  roleCode: {propertyId: 1010001, propertyName: '역할코드', propertyType: 'TEXT', columnName: 'ROLE_CODE', propertyFormat: null, …},
 *  roleCreateDate: {propertyId: 1010003, propertyName: '생성일자', propertyType: 'DATE', columnName: 'CREATE_DT', propertyFormat: null, …},
 *  roleCreateUser: {propertyId: 1010004, propertyName: '생성사용자ID', propertyType: 'TEXT', columnName: 'CREATE_USER', propertyFormat: null, …},
 *  roleModifyDate: {propertyId: 1010005, propertyName: '수정일자', propertyType: 'DATE', columnName: 'MODIFY_DT', propertyFormat: null, …},
 *  roleModifyUser: {propertyId: 1010006, propertyName: '수정사용자ID', propertyType: 'TEXT', columnName: 'MODIFY_USER', propertyFormat: null, …},
 *  roleName: {propertyId: 1010002, propertyName: '역할명', propertyType: 'TEXT', columnName: 'ROLE_NAME', propertyFormat: null, …},
 * }
 * @param {Array} data
 * {
 *  abbrName: null
 *  classId: 101
 *  createDt: null
 *  cusrId: 1
 *  modifyDt: null
 *  musrId: null
 *  objInd1: null
 *  objInd2: null
 *  objInd3: null
 *  objInd4: null
 *  objInd5: null
 *  objNo1: null
 *  objNo2: null
 *  objRmk1: null
 *  objRmk2: null
 *  objRmk3: null
 *  objRmk4: null
 *  objRmk5: null
 *  objSeq: null
 *  objectId: 95
 *  objectName: null
 *  orgObjectId: null
 *  propertyList: [
 *      {objectId: 95, propertyId: 1010001, propertyVal: 'MODELER', columnName: null, propertyFormat: null, …},
 *      {objectId: 95, propertyId: 1010002, propertyVal: '모델러', columnName: null, propertyFormat: null, …},
 *      {objectId: 95, propertyId: 1010003, propertyVal: '2022-01-06 07:04:27', columnName: null, propertyFormat: null, …},
 *      {objectId: 95, propertyId: 1010004, propertyVal: '1', columnName: null, propertyFormat: null, …},
 *      {objectId: 95, propertyId: 1010005, propertyVal: '2022-01-06 07:04:27', columnName: null, propertyFormat: null, …},
 *      {objectId: 95, propertyId: 1010006, propertyVal: '1', columnName: null, propertyFormat: null, …},
 *  ]
 * }
 * @returns
 */

export const matchDataToMap = (map, data) => {
    const role = {};
    role.objectId = data.objectId;
    role.roleCreateDate = data.createDt;
    role.roleCreateUser = data.cusrId;
    role.roleModifyDate = data.modifyDt;
    role.roleModifyUser = data.musrId;
    for (let property of data.propertyList) {
        switch (property.propertyId) {
            case map.roleCode.propertyId:
                role.roleCode = property.propertyVal;
                break;
            case map.roleName.propertyId:
                role.roleName = property.propertyVal;
                break;
            default:
                break;
        }
    }
    return role;
};
