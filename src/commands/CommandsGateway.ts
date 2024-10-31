import { Message, OmitPartialGroupDMChannel } from "discord.js";
import { CommandBase } from "./interfaces/CommandBase";
import { Mute } from "./voice/Mute";
import { Deaf } from "./voice/Deaf";
import { OnGame } from "./game/OnGame";
import { OnDiscuss } from "./game/OnDiscuss";
import { Died } from "./voice/Died";
import { Reset } from "./game/Reset";
import { Undeaf } from "./voice/Undeaf";
import { Unmute } from "./voice/Unmute";

const commands = new Map<string, CommandBase>();
commands.set("mute", new Mute);
commands.set("unmute", new Unmute);
commands.set("deaf", new Deaf);
commands.set("undeaf", new Undeaf);
commands.set("reset", new Reset);
commands.set("died", new Died);
commands.set("ongame", new OnGame);
commands.set("ondiscuss", new OnDiscuss);

export async function CommandsGateway(args: string[], message: OmitPartialGroupDMChannel<Message<boolean>>) {
    if (!Array.from(commands.keys()).includes(args[0])) {
        console.warn(`${args[0]} was not found in commands.`);
        message.channel.send(`${args[0]} was not found in commands.`);
        return;
    }
    await commands.get(args[0])?.Run(args, message).catch(async error =>{
        console.error(error)
        await message.channel.send(error)
    });
}