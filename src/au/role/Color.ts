import { Guild, GuildMember } from 'discord.js';

import { GetUserRole } from '../../guild/Role';

export async function GetColors (guild:Guild) {
    return guild.roles.cache.filter(role=> role.name.includes("Color/"));
}

export async function GetColor(member: GuildMember) {
    return (await GetUserRole(member)).filter(role => role.includes("Color/"))[0]
}