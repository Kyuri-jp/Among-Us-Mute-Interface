import { ActivityType, Message, OmitPartialGroupDMChannel } from 'discord.js';

import { client, MarkerRoles } from '../..';
import { Gaming } from '../../au/voice/Gaming';
import { GetRoleData } from '../../guild/Role';
import { CommandBase } from '../interfaces/CommandBase';

export class OnGame implements CommandBase {
    async Run(args: string[], message: OmitPartialGroupDMChannel<Message<boolean>>) {
        if (args.length < 2) {
            await message.channel.send("Please set channel id")
            return;
        }
        await Gaming(args[1], await GetRoleData(MarkerRoles.DiedPlayer));
        message.channel.send("On Gamed")
        client.user?.setPresence({
            activities: [{ name: "ゲーム中...", type: ActivityType.Custom }]
        });
    }
}