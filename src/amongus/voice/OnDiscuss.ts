import { Role } from "discord.js";
import { UndeafAllUser } from "../../channel/voice/Deaf";
import { MuteAllUser } from "../../channel/voice/Mute";

export async function OnDiscuss(channelID: string, diedPlayersRole: Role) {
    await MuteAllUser(channelID, diedPlayersRole);
    await UndeafAllUser(channelID);
}