import { OmitPartialGroupDMChannel, Message } from "discord.js";
import { GetRole } from "../../guild/Role";
import { OnGame } from "../../amongus/voice/OnGame";

export async function RunOnGameCommand(args:string[],message: OmitPartialGroupDMChannel<Message<boolean>>,diedPlayerRole:string) {
    if (args.length < 1) {
        console.error("Channel id is incorrect.");
    }
    await OnGame(args[1], await GetRole(diedPlayerRole));
    message.channel.send("On Gamed")
}