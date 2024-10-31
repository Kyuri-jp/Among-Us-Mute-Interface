import { Message, OmitPartialGroupDMChannel } from 'discord.js';

import { OnDiscuss } from './game/OnDiscuss';
import { OnGame } from './game/OnGame';
import { Reset } from './game/Reset';
import { CommandBase } from './interfaces/CommandBase';
import { Deaf } from './voice/Deaf';
import { Died } from './voice/Died';
import { Mute } from './voice/Mute';
import { Undeaf } from './voice/Undeaf';
import { Unmute } from './voice/Unmute';

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
        await message.channel.send(`${args[0]} was not found in commands.`);
        return;
    }
    await commands.get(args[0])?.Run(args, message).catch(async error =>{
        console.error(error)
        await message.channel.send(error)
    });
}