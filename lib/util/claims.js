"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEthereumPayload = exports.getPolkadotStatement = void 0;
const util_1 = require("@polkadot/util");
const util_crypto_1 = require("@polkadot/util-crypto");
const metadata_1 = require("./metadata");
/**
 * Retrieve the statements to sign with `claims.claimAttest` and
 * `claims.attest`. These statements are hardcoded in txwrapper.
 *
 * @param statementKind - The statement kind, can be 'Regular' or 'Saft'.
 */
function getPolkadotStatement(statementKind) {
    // Same as https://github.com/polkadot-js/apps/blob/tbaut-attest/packages/page-claims/src/util.ts#L118
    return statementKind.toString() === 'Regular'
        ? {
            hash: 'Qmc1XYqT6S39WNp2UeiRUrZichUWUPpGEThDE6dAb3f6Ny',
            sentence: 'I hereby agree to the terms of the statement whose SHA-256 multihash is Qmc1XYqT6S39WNp2UeiRUrZichUWUPpGEThDE6dAb3f6Ny. (This may be found at the URL: https://statement.polkadot.network/regular.html)',
            url: 'https://statement.polkadot.network/regular.html',
        }
        : {
            hash: 'QmXEkMahfhHJPzT3RjkXiZVFi77ZeVeuxtAjhojGRNYckz',
            sentence: 'I hereby agree to the terms of the statement whose SHA-256 multihash is QmXEkMahfhHJPzT3RjkXiZVFi77ZeVeuxtAjhojGRNYckz. (This may be found at the URL: https://statement.polkadot.network/saft.html)',
            url: 'https://statement.polkadot.network/saft.html',
        };
}
exports.getPolkadotStatement = getPolkadotStatement;
/**
 * Generate the payload that needs to be signed with the Ethereum key that made
 * a claim. The returned signature is needed as argument for
 * `claims.claimAttest`.
 *
 * @param dest - The destination account to which to pay out the claim.
 * @param statement - The identity of the statement that is being attested to
 * in the signature.
 * @param options - Registry and metadata used for constructing the payload.
 */
function getEthereumPayload(dest, statement, options) {
    const constants = metadata_1.createDecoratedConstants(options.registry, options.metadataRpc);
    const prefix = util_1.u8aToString(constants.claims.prefix.toU8a(true));
    return `${prefix}${util_1.u8aToHex(util_crypto_1.decodeAddress(dest), -1, false)}${statement.sentence}`;
}
exports.getEthereumPayload = getEthereumPayload;
