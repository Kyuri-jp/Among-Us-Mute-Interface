import { OmitPartialGroupDMChannel, Message } from "discord.js";
import { GetRoleData } from "../../guild/Role";
import { UndeafAllUser } from "../../channel/voice/Deaf";
import { UnmuteAllUser } from "../../channel/voice/Mute";
import { GetUsers } from "../../channel/voice/Property";
import { CommandBase } from "../interfaces/CommandBase";
import { MarkerDiedPlayer } from "../..";

export class Reset implements CommandBase {
    async Run(args: string[], message: OmitPartialGroupDMChannel<Message<boolean>>) {
        if (args.length < 1) {
            console.error("Channel id is incorrect.");
        }
        await UnmuteAllUser((args[1]));
        await UndeafAllUser((args[1]));
        for (const [, member] of await GetUsers((args[1]))) {
            member.roles.remove(await GetRoleData(MarkerDiedPlayer))
        }
        message.channel.send("Reset roles and more.");
    }
}