"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transfer = void 0;
const util_1 = require("../../util");
/**
 * Construct a balance transfer transaction offline.
 *
 * @param args - Arguments specific to this method.
 * @param info - Information required to construct the transaction.
 * @param options - Registry and metadata used for constructing the method.
 */
function transfer(args, info, options) {
    return util_1.createMethod(Object.assign({ method: {
            args,
            name: 'transfer',
            pallet: 'balances',
        } }, info), options);
}
exports.transfer = transfer;
