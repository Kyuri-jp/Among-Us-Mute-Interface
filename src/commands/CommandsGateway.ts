import { Message, OmitPartialGroupDMChannel } from "discord.js";
import { RunMuteCommand } from "./voice/Mute";
import { RunDeafCommand } from "./voice/Deaf";
import { RunUndeafCommand } from "./voice/Undeaf";
import { RunUnmuteCommand } from "./voice/Unmute";
import { RunOnGameCommand } from "./voice/OnGame";
import { MarkerDiedPlayer } from "..";
import { RunOnDiscussCommand } from "./voice/OnDiscuss";
import { RunResetCommand } from "./voice/Reset";
import { RunDiedCommand } from "./voice/Died";

export async function CommandsGateway(args: string[], message: OmitPartialGroupDMChannel<Message<boolean>>) {
    switch (args[0]) {
        case "mute":
            await RunMuteCommand(args, message)
            break;
        case "unmute":
            await RunUnmuteCommand(args, message)
            break;
        case "deaf":
            await RunDeafCommand(args, message);
            break;
        case "undeaf":
            await RunUndeafCommand(args, message);
            break;
        case "ongame":  
            await RunOnGameCommand(args, message, MarkerDiedPlayer);
            break;
        case "ondiscuss":
            await RunOnDiscussCommand(args, message, MarkerDiedPlayer);
            break;
        case "died":
            await RunDiedCommand(args,message)
            break;
        case "reset":
            await RunResetCommand(args, message,MarkerDiedPlayer);
            break;
        default:
            console.warn(`${args[0]} was not found in commands.`);
            message.channel.send(`${args[0]} was not found in commands.`);
            break;
    }
}