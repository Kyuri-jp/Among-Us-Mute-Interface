import { Role } from "discord.js";
import { GetUsers } from "./Property"
import { HasRole } from "../../guild/Role";

export async function MuteAllUser(channelID: string, selectRole?: Role, ignore?: boolean) {
    await MuteControlAllUser(channelID, true, selectRole, ignore);
}

export async function UnmuteAllUser(channelID: string, selectRole?: Role, ignore?: boolean) {
    await MuteControlAllUser(channelID, false, selectRole, ignore);
}

async function MuteControlAllUser(channelID: string, type: boolean, selectRole?: Role, ignore?: boolean) {
    for (const [, member] of await GetUsers(channelID)) {
        console.log(`Mute Target : ${member.displayName}`)
        if (ignore === undefined) {
            if (!selectRole) {
                await member.voice.setMute(type);
                console.log(`Mute ${type} : ${member.displayName}`)
            } else if (selectRole && await HasRole(member, selectRole.name)) {
                await member.voice.setMute(type);
                console.log(`Mute ${type} : ${member.displayName}`)
            }
        } else {
            console.log("Ingored Mute")
            if (!selectRole){
                console.warn("Role is undefined")
            }else if (!await HasRole(member, selectRole.name)) {
                await member.voice.setMute(type);
                console.log(`Mute ${type} : ${member.displayName}`)
            }
        }
    }
}