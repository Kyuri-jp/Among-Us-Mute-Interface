import { OmitPartialGroupDMChannel, Message } from "discord.js";
import { OnDiscuss } from "../../amongus/voice/OnDiscuss";
import { GetRole } from "../../guild/Role";

export async function RunOnDiscussCommand(args:string[],message: OmitPartialGroupDMChannel<Message<boolean>>,diedPlayerRole:string) {
    if (args.length < 1) {
        console.error("Channel id is incorrect.");
    }
    await OnDiscuss(args[1], await GetRole(diedPlayerRole));
    message.channel.send("On Discussed")
}