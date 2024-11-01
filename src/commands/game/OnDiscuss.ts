import { ActivityType, Message, OmitPartialGroupDMChannel } from 'discord.js';

import { client, MarkerRoles } from '../..';
import { Discussing } from '../../au/voice/Discussing';
import { GetRoleData } from '../../guild/Role';
import { CommandBase } from '../interfaces/CommandBase';

export class OnDiscuss implements CommandBase {
    async Run(args: string[], message: OmitPartialGroupDMChannel<Message<boolean>>) {
        if (args.length < 2) {
            message.channel.send("Please set channel id")
            return;
        }
        await Discussing(args[1], await GetRoleData(MarkerRoles.DiedPlayer));
        message.channel.send("On Discussed")
        client.user?.setPresence({
            activities: [{ name: "会議中...", type: ActivityType.Custom }]
        });
    }
}