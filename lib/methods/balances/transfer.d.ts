import { Args, BaseTxInfo, OptionsWithMeta, UnsignedTransaction } from '../../util';
export interface BalancesTransferArgs extends Args {
    /**
     * The recipient address, SS-58 encoded.
     */
    dest: string;
    /**
     * The amount to send.
     */
    value: number | string;
}
/**
 * Construct a balance transfer transaction offline.
 *
 * @param args - Arguments specific to this method.
 * @param info - Information required to construct the transaction.
 * @param options - Registry and metadata used for constructing the method.
 */
export declare function transfer(args: BalancesTransferArgs, info: BaseTxInfo, options: OptionsWithMeta): UnsignedTransaction;
