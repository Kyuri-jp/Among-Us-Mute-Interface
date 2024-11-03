import { Message, OmitPartialGroupDMChannel } from 'discord.js';

import { DeafAllUser } from '../../channel/voice/Deaf';
import { CommandBase } from '../interfaces/CommandBase';

export class Deaf implements CommandBase{
    async Run(args: string[], message: OmitPartialGroupDMChannel<Message<boolean>>): Promise<void> {
        if (!args[1]) {
            await message.channel.send("Please set channel id")
            return;
        }
        await DeafAllUser(args[1]);
        await message.channel.send("Deaf all user.")
    }
}