

const namespace     = 'js-restful';
const separator     = ':';
const prefix        = namespace + separator;

export const httpMethodMarker = prefix + 'HTTP-METHOD';

export const path                   = prefix + 'Path';
export const pathParam              = prefix + 'PathParam';
export const headerParam            = prefix + 'HeaderParam';
export const queryParam             = prefix + 'QueryParam';
export const contextParam           = prefix + 'ContextParam';
export const securityContextParam   = prefix + 'SecurityContextParam';
export const permitAll              = prefix + 'PermitAll';
export const rolesAllowed           = prefix + 'RolesAllowed';
