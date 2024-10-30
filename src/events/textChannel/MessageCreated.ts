import { Message, OmitPartialGroupDMChannel } from "discord.js";
import { CommandsGateway } from "../../commands/CommandsGateway";

export async function MessageCreated(prefix: string, args: string[], message: OmitPartialGroupDMChannel<Message<boolean>>) {
    if (message.content.includes(prefix)){
        console.info("The content is command.")
        await CommandsGateway(args,message)
    }
}