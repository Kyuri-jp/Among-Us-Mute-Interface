import { OmitPartialGroupDMChannel, Message } from "discord.js";
import { UndeafAllUser } from "../../channel/voice/Deaf";
import { CommandBase } from "../interfaces/CommandBase";

export class Undeaf implements CommandBase {
    async Run(args: string[], message: OmitPartialGroupDMChannel<Message<boolean>>) {
        if (args.length < 1) {
            console.error("Channel id is incorrect.");
        }
        await UndeafAllUser(args[1]);
        message.channel.send("Undeaf all user.")
    }
}