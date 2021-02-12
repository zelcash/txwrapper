"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegistry = exports.createDecoratedConstants = exports.createDecoratedTx = exports.createMetadata = void 0;
const metadata_1 = require("@polkadot/metadata");
const decorate_1 = require("@polkadot/metadata/decorate");
const types_1 = require("@polkadot/types");
const types_known_1 = require("@polkadot/types-known");
const memoizee_1 = __importDefault(require("memoizee"));
const constants_1 = require("./constants");
/**
 * Hardcode some chain properties of known chains. These are normally returned
 * by `system_properties` call, but since they don't change much, it's pretty
 * safe to hardcode them.
 *
 * @ignore
 * @todo Should we expose this publicly?
 */
const defaultChainProperties = {
    Kusama: {
        ss58Format: constants_1.KUSAMA_SS58_FORMAT,
        tokenDecimals: 12,
        tokenSymbol: 'KSM',
    },
    Polkadot: {
        ss58Format: constants_1.POLKADOT_SS58_FORMAT,
        tokenDecimals: 10,
        tokenSymbol: 'DOT',
    },
    'Polkadot CC1': {
        ss58Format: constants_1.POLKADOT_SS58_FORMAT,
        tokenDecimals: 12,
        tokenSymbol: 'DOT',
    },
    Westend: {
        ss58Format: constants_1.WESTEND_SS58_FORMAT,
        tokenDecimals: 12,
        tokenSymbol: 'WND',
    },
};
/**
 * From a metadata hex string (for example returned by RPC), create a Metadata
 * class instance. Metadata decoding is expensive, so this function is
 * memoized.
 *
 * @ignore
 * @param registry - The registry of the metadata.
 * @param metadata - The metadata as hex string.
 */
function createMetadataUnmemoized(registry, metadataRpc) {
    return new metadata_1.Metadata(registry, metadataRpc);
}
/**
 * @ignore
 */
exports.createMetadata = memoizee_1.default(createMetadataUnmemoized, {
    length: 2,
});
/**
 * From a metadata hex string (for example returned by RPC), create decorated
 * modules with their calls (transactions).
 *
 * @ignore
 * @param registry - The registry of the metadata.
 * @param metadata - The metadata as hex string.
 */
function createDecoratedTx(registry, metadataRpc) {
    const metadata = exports.createMetadata(registry, metadataRpc);
    return decorate_1.decorateExtrinsics(registry, metadata.asLatest, metadata.version);
}
exports.createDecoratedTx = createDecoratedTx;
/**
 * From a metadata hex string (for example returned by RPC), create decorated
 * modules with their constants.
 *
 * @param registry - The registry of the metadata.
 * @param metadata - The metadata as hex string.
 */
function createDecoratedConstants(registry, metadataRpc) {
    return decorate_1.decorateConstants(registry, exports.createMetadata(registry, metadataRpc).asLatest);
}
exports.createDecoratedConstants = createDecoratedConstants;
/**
 * Given a chain name, a spec name, and a spec version, return the
 * corresponding type registry. This function only returns the correct type
 * registry for the following chains:
 * - Kusama,
 * - Polkadot (incl. when running a dev node),
 * - Westend.
 * For other chains, please use `@polkadot/api`s `TypeRegistry` directly:
 * `const registry = new TypeRegistry()`. If needed, you should also register
 * your chain's custom types using `registry.register()`.
 *
 * @see https://github.com/polkadot-js/api/tree/master/packages/types-known
 * @param chainName - The chain to create the type registry for. Returned by
 * RPC `system_chain`.
 * @param specName - The name of the runtime spec. Returned by RPC
 * `state_getRuntimeVersion`.
 * @param specVersion - The spec version of that chain for which we want to
 * create a type registry. Returned by RPC `state_getRuntimeVersion`.
 * @param metadataRpc - If you pass the optional `metadataRpc` argument, then
 * this function will run `registry.setMetadata()`. **Important!** If you don't
 * pass this argument, make sure to call `registry.setMetadata()` yourself!
 */
function getRegistry(chainName, specName, specVersion, metadataRpc) {
    const registry = new types_1.TypeRegistry();
    // Register types specific to chain/runtimeVersion
    registry.register(types_known_1.getSpecTypes(registry, chainName, specName, specVersion));
    // Register the chain properties for this registry
    registry.setChainProperties(registry.createType('ChainProperties', defaultChainProperties[chainName]));
    if (metadataRpc) {
        registry.setMetadata(exports.createMetadata(registry, metadataRpc));
    }
    return registry;
}
exports.getRegistry = getRegistry;
