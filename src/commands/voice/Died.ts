import { Message, OmitPartialGroupDMChannel } from 'discord.js';

import { MarkerRoles } from '../..';
import { GetUsers } from '../../channel/voice/Property';
import { ToShiftedUpperCase } from '../../core/text/ToShiiftedUpperCase';
import { GetRoleData, HasRole } from '../../guild/Role';
import { CommandBase } from '../interfaces/CommandBase';

export class Died implements CommandBase {
    async Run(args: string[], message: OmitPartialGroupDMChannel<Message<boolean>>) {
        if (!args[1]) {
            await message.channel.send("Please set channel id.")
            return;
        }
        if (!args[2]){            
            await message.channel.send("Please set role.")
            return;
        }
        const role = await GetRoleData(MarkerRoles.DiedPlayer);
        const users = await GetUsers(args[1]);
        const colorRole = "Color/" + ToShiftedUpperCase(args[2]);

        const addedMembers = [];

        for (const [, member] of users) {
            if (await HasRole(member, colorRole)) {
                await member.roles.add(role.id);
                addedMembers.push(member.displayName);
                console.info(`${member.displayName} was added died role.`);
            }
        }

        if (addedMembers.length > 0) {
            await message.channel.send(`Role added to: ${addedMembers.join(', ')}`);
        }else{
            await message.channel.send("Player was not found.")
        }
    }
}