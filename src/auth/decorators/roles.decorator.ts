import { SetMetadata } from '@nestjs/common';
import { role } from '../../users/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: role[]) => SetMetadata(ROLES_KEY, roles);
