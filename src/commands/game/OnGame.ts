import { OmitPartialGroupDMChannel, Message, ActivityType } from "discord.js";
import { GetRoleData } from "../../guild/Role";
import { Gaming } from "../../au/voice/Gaming";
import { CommandBase } from "../interfaces/CommandBase";
import { client, MarkerDiedPlayer } from "../..";

export class OnGame implements CommandBase {
    async Run(args: string[], message: OmitPartialGroupDMChannel<Message<boolean>>) {
        if (args.length < 2) {
            await message.channel.send("Please set channel id")
            return;
        }
        await Gaming(args[1], await GetRoleData(MarkerDiedPlayer));
        message.channel.send("On Gamed")
        client.user?.setPresence({
            activities: [{ name: "ゲーム中...", type: ActivityType.Custom }]
        });
    }
}