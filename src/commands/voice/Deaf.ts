import { OmitPartialGroupDMChannel, Message } from "discord.js";
import { DeafAllUser } from "../../channel/voice/Deaf";
import { CommandBase } from "../interfaces/CommandBase";

export class Deaf implements CommandBase{
    async Run(args: string[], message: OmitPartialGroupDMChannel<Message<boolean>>): Promise<void> {
        if (args.length < 1) {
            console.error("Channel id is incorrect.");
        }
        await DeafAllUser(args[1]);
        message.channel.send("Deaf all user.")
    }
}