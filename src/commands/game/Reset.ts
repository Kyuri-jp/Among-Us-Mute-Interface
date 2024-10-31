import { OmitPartialGroupDMChannel, Message, ActivityType } from "discord.js";
import { GetRoleData } from "../../guild/Role";
import { UndeafAllUser } from "../../channel/voice/Deaf";
import { UnmuteAllUser } from "../../channel/voice/Mute";
import { GetUsers } from "../../channel/voice/Property";
import { CommandBase } from "../interfaces/CommandBase";
import { client, MarkerDiedPlayer } from "../..";

export class Reset implements CommandBase {
    async Run(args: string[], message: OmitPartialGroupDMChannel<Message<boolean>>) {
        if (args.length < 2) {
            await message.channel.send("Please set channel id")
            return;
        }
        await UnmuteAllUser((args[1]));
        await UndeafAllUser((args[1]));
        for (const [, member] of await GetUsers((args[1]))) {
            await member.roles.remove(await GetRoleData(MarkerDiedPlayer))
            console.info(`${member.displayName} was removed died role.`)
        }
        await message.channel.send("Reset roles and voice state.");
        client.user?.setPresence({
            activities: [{ name: "待機中...", type: ActivityType.Custom }]
        });
    }
}