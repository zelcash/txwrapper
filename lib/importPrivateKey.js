"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importPrivateKey = void 0;
const keyring_1 = require("@polkadot/keyring");
const util_1 = require("@polkadot/util");
const constants_1 = require("./util/constants");
// Using an interface above so that KeyringPair shows up in docs
/**
 * Import a private key and create a KeyringPair.
 * @param privateKey - The private key of the key pair.
 * @param ss58Format - The SS58 encoding of the address.
 */
function importPrivateKey(privateKey, ss58Format = constants_1.KUSAMA_SS58_FORMAT) {
    const keyring = new keyring_1.Keyring({ type: 'ed25519' });
    keyring.setSS58Format(ss58Format);
    if (typeof privateKey === 'string') {
        return keyring.addFromSeed(util_1.hexToU8a(privateKey));
    }
    return keyring.addFromSeed(privateKey);
}
exports.importPrivateKey = importPrivateKey;
//# sourceMappingURL=importPrivateKey.js.map