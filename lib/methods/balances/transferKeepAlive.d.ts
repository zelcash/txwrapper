import { BaseTxInfo, OptionsWithMeta, UnsignedTransaction } from '../../util';
import { BalancesTransferArgs } from './transfer';
export declare type BalancesTransferKeepAliveArgs = BalancesTransferArgs;
/**
 * Construct a balance transfer transaction offline.
 *
 * @param args - Arguments specific to this method.
 * @param info - Information required to construct the transaction.
 * @param options - Registry and metadata used for constructing the method.
 */
export declare function transferKeepAlive(args: BalancesTransferKeepAliveArgs, info: BaseTxInfo, options: OptionsWithMeta): UnsignedTransaction;
