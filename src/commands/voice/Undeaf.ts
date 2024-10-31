import { OmitPartialGroupDMChannel, Message } from "discord.js";
import { UndeafAllUser } from "../../channel/voice/Deaf";
import { CommandBase } from "../interfaces/CommandBase";

export class Undeaf implements CommandBase {
    async Run(args: string[], message: OmitPartialGroupDMChannel<Message<boolean>>) {
        if (args.length < 2) {
            await message.channel.send("Please set channel id")
            return;
        }
        await UndeafAllUser(args[1]);
        await message.channel.send("Undeaf all user.")
    }
}