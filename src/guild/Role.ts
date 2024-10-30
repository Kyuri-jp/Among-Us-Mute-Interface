import { GuildMember } from "discord.js";
import { guild } from "..";

export async function GetRole(roleName: string) {
    const guildId = process.env.GUILD;
    if (!guildId) {
        throw new Error("GUILD ID is not defined in the environment variables.");
    }

    if (!guild) {
        console.error("指定されたギルドが見つかりません。");
        throw new Error("Guild not found.");
    }

    // 役職を検索
    const role = (await guild).roles.cache.find((role) => role.name === roleName);

    if (!role) {
        console.error(`指定された役職 ${roleName} が見つかりません。`);
        throw new Error("Role not found.");
    }
    return role;
}

export async function RoleExists(roleName: string) {
    if (!(await guild).roles.cache.find((role) => role.name === roleName)) 
        return false;
    return true;
}

export async function CreateRole(roleName: string, color: number) {
    (await guild).roles.create({
        name: roleName,
        color: color
    })
    console.log(`Created role : ${roleName}`)
}

export async function HasRole(member: GuildMember, roleName: string): Promise<boolean> {
    // ロールを取得
    const role = await GetRole(roleName);

    if (!role) {
        console.error(`指定されたロール ${roleName} が見つかりません。`);
        return false;
    }

    // メンバーがロールを持っているか確認
    return member.roles.cache.has(role.id);
}
