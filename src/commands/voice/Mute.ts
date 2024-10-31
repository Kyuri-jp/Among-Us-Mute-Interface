import { Message, OmitPartialGroupDMChannel } from "discord.js";
import { MuteAllUser } from "../../channel/voice/Mute";
import { CommandBase } from "../interfaces/CommandBase";

export class Mute implements CommandBase {
    async Run(args: string[], message: OmitPartialGroupDMChannel<Message<boolean>>) {
        if (args.length < 2) {
            await message.channel.send("Please set channel id")
            return;
        }
        await MuteAllUser(args[1]);
        await message.channel.send("Mute all user.")
    }
}