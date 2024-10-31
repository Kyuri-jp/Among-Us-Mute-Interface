import { GuildMember } from "discord.js";
import { guild } from "..";

export async function GetRoleData(roleName: string) {
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
 
export async function GetUserRole(member: GuildMember) {
      // ロールを取得し、名前を配列に変換
    const roles = (await member.fetch()).roles.cache.map(role => role.name);
  
    // ロール名を出力
    console.log(`User ${member.user.tag} has the following roles:`, roles);

    return roles;
}

export async function RoleExists(roleName: string) {
    if (!(await guild).roles.cache.find((role) => role.name === roleName)) 
        return false;
    return true;
}

export async function CreateRole(roleName: string, color: number) {
    if (await RoleExists(roleName))
        return;
    (await guild).roles.create({
        name: roleName,
        color: color
    })
    console.log(`Created role : ${roleName}`)
}

export async function HasRole(member: GuildMember, roleName: string): Promise<boolean> {
    // ロールを取得
    const role = await GetRoleData(roleName);

    if (!role) {
        console.error(`指定されたロール ${roleName} が見つかりません。`);
        return false;
    }

    // メンバーがロールを持っているか確認
    return (await member.fetch()).roles.cache.has(role.id);
}
