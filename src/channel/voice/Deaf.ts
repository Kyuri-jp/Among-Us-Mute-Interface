import { Role } from "discord.js";
import { GetUsers } from "./Property"
import { HasRole } from "../../guild/Role";

export async function DeafAllUser(channelID: string, selectRole?: Role, ignore?: boolean) {
    await DeafControlAllUser(channelID, true, selectRole, ignore);
}

export async function UndeafAllUser(channelID: string, selectRole?: Role, ignore?: boolean) {
    await DeafControlAllUser(channelID, false, selectRole, ignore);
}

async function DeafControlAllUser(channelID: string, type: boolean, selectRole?: Role, ignore?: boolean) {
    for (const [, member] of await GetUsers(channelID)) {
        if (ignore === undefined) {
            if (!selectRole) {
                await member.voice.setDeaf(type);
                console.info(`${member.displayName} was controled deaf to ${type}`)
            } else if (selectRole && await HasRole(member, selectRole.name)) {
                await member.voice.setDeaf(type);
            }
        } else {
            console.warn("Ingored Deaf")
            if (!selectRole){
                console.warn("Role is undefined")
            }else if (!await HasRole(member, selectRole.name)) {
                await member.voice.setDeaf(type);
                console.info(`${member.displayName} was controled deaf to ${type}`)
            }
        }
    }
}
