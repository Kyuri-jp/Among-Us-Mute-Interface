import { OmitPartialGroupDMChannel, Message } from "discord.js";
import { GetRoleData } from "../../guild/Role";
import { Gaming } from "../../au/voice/Gaming";
import { CommandBase } from "../interfaces/CommandBase";
import { MarkerDiedPlayer } from "../..";

export class OnGame implements CommandBase {
    async Run(args: string[], message: OmitPartialGroupDMChannel<Message<boolean>>) {
        if (args.length < 1) {
            console.error("Channel id is incorrect.");
        }
        await Gaming(args[1], await GetRoleData(MarkerDiedPlayer));
        message.channel.send("On Gamed")
    }
}