import { StatementKind } from '@polkadot/types/interfaces';
import { OptionsWithMeta } from './types';
/**
 * Object representing a Polkadot statement.
 */
export interface PolkadotStatement {
    /**
     * The statement's SHA-256 multihash.
     */
    hash: string;
    /**
     * The English human-readable sentence to sign.
     */
    sentence: string;
    /**
     * The url at which the statement is hosted.
     */
    url: string;
}
/**
 * Retrieve the statements to sign with `claims.claimAttest` and
 * `claims.attest`. These statements are hardcoded in txwrapper.
 *
 * @param statementKind - The statement kind, can be 'Regular' or 'Saft'.
 */
export declare function getPolkadotStatement(statementKind: StatementKind | 'Regular' | 'Saft'): PolkadotStatement;
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
export declare function getEthereumPayload(dest: string, statement: PolkadotStatement, options: OptionsWithMeta): string;
