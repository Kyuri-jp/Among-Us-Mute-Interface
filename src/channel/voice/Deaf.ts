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
    const promises = [];
    
    for (const [, member] of await GetUsers(channelID)) {
        if (member.voice.deaf !== type) {
            const hasRole = selectRole && await HasRole(member, selectRole.name);

            if (ignore) {
                if (selectRole && !hasRole) {
                    promises.push(member.voice.setDeaf(type).then(() => {
                        console.info(`${member.displayName} was controlled Deaf to ${type}`);
                    }));
                }
            } else {
                if (!selectRole || hasRole) {
                    promises.push(member.voice.setDeaf(type).then(() => {
                        console.info(`${member.displayName} was controlled Deaf to ${type}`);
                    }));
                }
            }
        }
    }

    // すべてのミュート操作が完了するのを待つ
    await Promise.all(promises);
}
