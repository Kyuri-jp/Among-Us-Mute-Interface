import { OmitPartialGroupDMChannel, Message } from "discord.js";
import { DeafAllUser } from "../../channel/voice/Deaf";

export async function RunDeafCommand(args:string[],message: OmitPartialGroupDMChannel<Message<boolean>>) {
    if (args.length < 1) {
        console.error("Channel id is incorrect.");
    }
    await DeafAllUser(args[1]);
    message.channel.send("Deaf all user.")
}