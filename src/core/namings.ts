

const namespace     = 'js-restful';
const separator     = ':';

export const httpMethodMarker = namespace + separator + 'HTTP-METHOD';

export const getMethod     = httpMethodMarker +  separator + 'GET';
export const postMethod    = httpMethodMarker +  separator + 'POST';
export const putMethod     = httpMethodMarker +  separator + 'PUT';
export const deleteMethod  = httpMethodMarker +  separator + 'DELETE';

export const path          = namespace + separator + 'Path';
export const pathParam     = namespace + separator + 'PathParam';
export const headerParam   = namespace + separator + 'HeaderParam';
