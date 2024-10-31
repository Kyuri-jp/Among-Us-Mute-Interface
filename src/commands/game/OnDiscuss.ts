import { OmitPartialGroupDMChannel, Message, ActivityType } from "discord.js";
import { Discussing } from "../../au/voice/Discussing";
import { GetRoleData } from "../../guild/Role";
import { CommandBase } from "../interfaces/CommandBase";
import { client, MarkerDiedPlayer } from "../..";

export class OnDiscuss implements CommandBase {
    async Run(args: string[], message: OmitPartialGroupDMChannel<Message<boolean>>) {
        if (args.length < 2) {
            await message.channel.send("Please set channel id")
            return;
        }
        await Discussing(args[1], await GetRoleData(MarkerDiedPlayer));
        message.channel.send("On Discussed")
        client.user?.setPresence({
            activities: [{ name: "会議中...", type: ActivityType.Custom }]
        });
    }
}