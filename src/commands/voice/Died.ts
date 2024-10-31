import { OmitPartialGroupDMChannel, Message } from "discord.js";
import { guild, MarkerDiedPlayer } from "../..";
import { GetRoleData } from "../../guild/Role";
import { GetUserFromMention } from "../../channel/text/Mention";
import { CommandBase } from "../interfaces/CommandBase";

export class Died implements CommandBase {
    async Run(args: string[], message: OmitPartialGroupDMChannel<Message<boolean>>) {
        if (GetUserFromMention(message) === null)
            return;
        const users = GetUserFromMention(message)!.values()
        const userNames = [];
        for (const member of users) {
            await (await (await guild).members.fetch(member.id)).roles.add(await GetRoleData(MarkerDiedPlayer))
            userNames.push(member.displayName)
        }
        message.channel.send(`Role added to ${[...userNames].join(" | ")}`);
    }
}