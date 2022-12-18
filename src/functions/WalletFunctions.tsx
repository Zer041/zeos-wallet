import { EosAction, ZActionDesc, ZeosAuthorization, ZeosTransaction } from "../models/transaction";

export function createZActionDesc(
    to: string,
    d1: number,
    d2: number,
    sc: number,
    memo: string
): ZActionDesc {
    return {
        za_type: 0,
        to: to,
        d1: d1,
        d2: d2,
        sc: sc,
        memo: memo,
    };
}

export function createZeosTransaction(
    fromAccount: string,
    toAccount: string,
    quantity: string,
    memo: string,
    authorization: Array<ZeosAuthorization>,
    zaction_descs: Array<ZActionDesc>
): ZeosTransaction {
    return {
        action: {
            account: 'eosio.token',
            name: 'transfer',
            authorization: authorization,
            data: JSON.stringify({
                from: fromAccount,
                to: toAccount,
                quantity: quantity,
                memo: memo,
            }),
        },
        zaction_descs: zaction_descs || [],
    };
}


