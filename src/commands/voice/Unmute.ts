import { Message, OmitPartialGroupDMChannel } from "discord.js";
import { UnmuteAllUser } from "../../channel/voice/Mute";
import { CommandBase } from "../interfaces/CommandBase";

export class Unmute implements CommandBase {
    async Run(args: string[], message: OmitPartialGroupDMChannel<Message<boolean>>) {
        if (args.length < 2) {
            await message.channel.send("Please set channel id")
            return;
        }
        await UnmuteAllUser(args[1]);
        await message.channel.send("Unmute all user.")
    }
}