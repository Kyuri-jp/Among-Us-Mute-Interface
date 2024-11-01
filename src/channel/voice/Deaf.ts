import { Role } from 'discord.js';

import { HasRole } from '../../guild/Role';
import { GetUsers } from './Property';

export async function DeafAllUser(channelID: string, selectRole?: Role, ignore?: boolean) {
    await ControlDeafAllUser(channelID, true, selectRole, ignore);
}

export async function UndeafAllUser(channelID: string, selectRole?: Role, ignore?: boolean) {
    await ControlDeafAllUser(channelID, false, selectRole, ignore);
}

async function ControlDeafAllUser(channelID: string, type: boolean, selectRole?: Role, ignore?: boolean) {
    for (const [, member] of await GetUsers(channelID)) {
        const hasRole = selectRole && await HasRole(member, selectRole.name);
        
        if (ignore) {
            if (selectRole && !hasRole) {
                await member.voice.setDeaf(type);
                console.info(`${member.displayName} was controlled deaf to ${type}`);
            }
        } else {
            if (!selectRole || hasRole) {
                await member.voice.setDeaf(type);
                console.info(`${member.displayName} was controlled deaf to ${type}`);
            }
        }
    }
}
