import { OmitPartialGroupDMChannel, Message } from "discord.js";
import { MarkerDiedPlayer } from "../..";
import { GetRoleData, HasRole } from "../../guild/Role";
import { CommandBase } from "../interfaces/CommandBase";
import { GetUsers } from "../../channel/voice/Property";
import { ToShiftedUpperCase } from "../../core/text/ToShiiftedUpperCase";

export class Died implements CommandBase {
    async Run(args: string[], message: OmitPartialGroupDMChannel<Message<boolean>>) {
        for (const [, member] of await GetUsers(args[1])) {
            if (await HasRole(member, "Color/" + ToShiftedUpperCase(args[2]))) {
                await member.roles.add((await GetRoleData(MarkerDiedPlayer)).id);
                await message.channel.send(`Role added to ${member.displayName}`);
                console.info(`${member.displayName} was added died role.`)
            }
        }
    }
}