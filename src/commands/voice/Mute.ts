import { Message, OmitPartialGroupDMChannel } from "discord.js";
import { MuteAllUser } from "../../channel/voice/Mute";
import { CommandBase } from "../interfaces/CommandBase";

export class Mute implements CommandBase {
    async Run(args: string[], message: OmitPartialGroupDMChannel<Message<boolean>>) {
        if (args.length < 1) {
            console.error("Channel id is incorrect.");
        }
        await MuteAllUser(args[1]);
        message.channel.send("Mute all user.")
    }
}