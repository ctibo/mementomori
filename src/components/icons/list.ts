import algo from '$assets/tokens/algo.svg?raw';
import twitter from '$fa/brands/twitter.svg?raw';
import discord from '$fa/brands/discord.svg?raw';
import xmark from '$fa/solid/xmark.svg?raw';
import users from '$fa/solid/users.svg?raw';
import arrowRightLong from '$fa/solid/arrow-right-long.svg?raw';
import proposals from '$fa/regular/file-signature.svg?raw';
import vote from '$fa/solid/check.svg?raw';



/**
 * Merge all imports in a single list
 * ==================================================
 */
const list: Record<string, string> = {
  algo,
  discord,
  twitter,
  close: xmark,
  proposals,
  vote,
  users: users,
  arrowRight: arrowRightLong,
}
export default list;
