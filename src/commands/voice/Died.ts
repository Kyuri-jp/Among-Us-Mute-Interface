import { OmitPartialGroupDMChannel, Message } from "discord.js";
import { guild, MarkerDiedPlayer } from "../..";
import { GetRole } from "../../guild/Role";
import { GetUserFromMention } from "../../channel/text/Mention";

export async function RunDiedCommand(args:string[],message: OmitPartialGroupDMChannel<Message<boolean>>) {
    if (GetUserFromMention(message) === null)
        return;
    const users = GetUserFromMention(message)!.values()
    const userNames = [];
    for (const member of users) {
        await (await (await guild).members.fetch(member.id)).roles.add(await GetRole(MarkerDiedPlayer))
        userNames.push(member.displayName)
    }
    message.channel.send(`Role added to ${[...userNames].join(" | ")}`);
}