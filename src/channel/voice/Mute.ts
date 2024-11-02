import { Role } from 'discord.js';

import { HasRole } from '../../guild/Role';
import { GetUsers } from './Property';

export async function MuteAllUser(channelID: string, selectRole?: Role, ignore?: boolean) {
    await ControlMuteAllUser(channelID, true, selectRole, ignore);
}

export async function UnmuteAllUser(channelID: string, selectRole?: Role, ignore?: boolean) {
    await ControlMuteAllUser(channelID, false, selectRole, ignore);
}

async function ControlMuteAllUser(channelID: string, type: boolean, selectRole?: Role, ignore?: boolean) {
    const promises = [];
    
    for (const [, member] of await GetUsers(channelID)) {
        if (member.voice.mute !== type) {
            const hasRole = selectRole && await HasRole(member, selectRole.name);

            if (ignore) {
                if (selectRole && !hasRole) {
                    promises.push(member.voice.setMute(type).then(() => {
                        console.info(`${member.displayName} was controlled Mute to ${type}`);
                    }));
                }
            } else {
                if (!selectRole || hasRole) {
                    promises.push(member.voice.setMute(type).then(() => {
                        console.info(`${member.displayName} was controlled Mute to ${type}`);
                    }));
                }
            }
        }
    }
    
    await Promise.all(promises);
}

