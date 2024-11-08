import { GuildMember, Role } from 'discord.js';

import { guild } from '../';

export async function GetRoleData(roleName: string) {
    const role = (await guild).roles.cache.find((role) => role.name === roleName);

    if (!role) {
        console.error(`Selected role : ${roleName} was not found.`);
        throw new Error("Role not found.");
    }
    return role;
}

export async function GetUserRole(member: GuildMember) {
    const roles = (await member.fetch()).roles.cache.map(role => role.name);
    console.log(`User ${member.user.tag} has the following roles:`, roles);
    return roles;
}

export async function RoleExists(roleName: string) {
    return (await guild).roles.cache.some(role => role.name === roleName);
}

export async function CreateRole(roleName: string, color: number) {
    if (!await RoleExists(roleName)) {
        (await guild).roles.create({
            name: roleName,
            color: color
        })
        console.log(`Created role : ${roleName}`)
    }
}

export async function HasRole(member: GuildMember, role: Role): Promise<boolean> {

    if ((await guild).roles.cache.has(role.name)) {
        console.error(`Selected role : ${role.name} was not found.`);
        return false;
    }
    
    return (await member.fetch()).roles.cache.has(role.id);
}
