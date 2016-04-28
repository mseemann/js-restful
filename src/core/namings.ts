

const namespace     = 'js-restful';
const separator     = ':';

export const getMethod     = 'GET';
export const postMethod    = 'POST';
export const putMethod     = 'PUT';
export const deleteMethod  = 'DELETE';

export function buildFullName(name){
    return namespace + separator + name;
}