import { Message, OmitPartialGroupDMChannel } from 'discord.js';

import { MarkerRoles } from '../..';
import { GetUsers } from '../../channel/voice/Property';
import { ToShiftedUpperCase } from '../../core/text/ToShiiftedUpperCase';
import { GetRoleData, HasRole } from '../../guild/Role';
import { CommandBase } from '../interfaces/CommandBase';

export class Died implements CommandBase {
    async Run(args: string[], message: OmitPartialGroupDMChannel<Message<boolean>>) {
        const channelId = args[1];
        const selectedRole = args[2]
        if (!channelId) {
            await message.channel.send("Please set channel id.")
            return;
        }
        if (!selectedRole) {
            await message.channel.send("Please set role.")
            return;
        }
        const diedPlayerRole = await GetRoleData(MarkerRoles.DiedPlayer)
        const users = await GetUsers(channelId)
        const colorRole = "Color/" + ToShiftedUpperCase(selectedRole);

        const addedMembers = [];

        for (const [, member] of users) {
            if (await HasRole(member, colorRole)) {
                await member.roles.add(diedPlayerRole.id);
                addedMembers.push(member.displayName);
                console.info(`${member.displayName} was added died role.`);
            }
        }

        if (addedMembers.length > 0) {
            await message.channel.send(`Role added to: ${addedMembers.join(', ')}`);
        } else {
            await message.channel.send("Player was not found.")
        }
    }
}