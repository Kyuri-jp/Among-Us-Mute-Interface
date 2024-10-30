import { Message, OmitPartialGroupDMChannel } from "discord.js";
import { UnmuteAllUser } from "../../channel/voice/Mute";

export async function RunUnmuteCommand(args:string[],message: OmitPartialGroupDMChannel<Message<boolean>>){
    if (args.length < 1) {
        console.error("Channel id is incorrect.");
    }
    await UnmuteAllUser(args[1]);
    message.channel.send("Unmute all user.")
}