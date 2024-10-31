import { GuildMember } from "discord.js";
import { GetUserRole } from "../../guild/Role";

export async function GetColor(member: GuildMember){
    return (await GetUserRole(member)).filter(role => role.includes("Color/"))[0] 
}