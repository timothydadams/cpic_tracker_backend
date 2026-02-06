export const adminUser = {
  id: 'admin-uuid',
  email: 'admin@test.com',
  roles: ['Admin'],
  isGlobalAdmin: true,
  isCPICAdmin: false,
  isCPICMember: false,
  isImplementer: false,
};

export const cpicAdminUser = {
  id: 'cpic-admin-uuid',
  email: 'cpicadmin@test.com',
  roles: ['CPIC Admin'],
  isGlobalAdmin: false,
  isCPICAdmin: true,
  isCPICMember: false,
  isImplementer: false,
};

export const cpicMemberUser = {
  id: 'cpic-member-uuid',
  email: 'cpicmember@test.com',
  roles: ['CPIC Member'],
  isGlobalAdmin: false,
  isCPICAdmin: false,
  isCPICMember: true,
  isImplementer: false,
};

export const implementerUser = {
  id: 'implementer-uuid',
  email: 'implementer@test.com',
  roles: ['Implementer'],
  isGlobalAdmin: false,
  isCPICAdmin: false,
  isCPICMember: false,
  isImplementer: true,
};

export const viewerUser = {
  id: 'viewer-uuid',
  email: 'viewer@test.com',
  roles: ['Viewer'],
  isGlobalAdmin: false,
  isCPICAdmin: false,
  isCPICMember: false,
  isImplementer: false,
};
