import { ActivityType, Message, OmitPartialGroupDMChannel } from 'discord.js';

import { client, MarkerRoles } from '../..';
import { UndeafAllUser } from '../../channel/voice/Deaf';
import { UnmuteAllUser } from '../../channel/voice/Mute';
import { GetUsers } from '../../channel/voice/Property';
import { GetRoleData } from '../../guild/Role';
import { CommandBase } from '../interfaces/CommandBase';

export class Reset implements CommandBase {
    async Run(args: string[], message: OmitPartialGroupDMChannel<Message<boolean>>) {
        if (args.length < 2) {
            await message.channel.send("Please set channel id")
            return;
        }
        const channelID = args[1];
        const role = await GetRoleData(MarkerRoles.DiedPlayer);
        await Promise.all([UnmuteAllUser(channelID), UndeafAllUser(channelID)]);
        for (const [, member] of await GetUsers((channelID))) {
            await member.roles.remove(role)
            console.info(`${member.displayName} was removed died role.`)
        }
        await message.channel.send("Reset roles and voice state.");
        client.user?.setPresence({
            activities: [{ name: "待機中...", type: ActivityType.Custom }]
        });
    }
}