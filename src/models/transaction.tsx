export type ActionName = 'transfer' | 'exec';

export type EosActionAuthorization = {
    actor: string,
    permission: string
};

export type EosActionData = {
    from: string,
    to: string,
    quantity: string,
    memo: string
};

export type EosAction = {
    account: string,
    name: ActionName,
    authorization: Array<EosActionAuthorization>,
    data: EosActionData | string,
};

export type ZActionDesc = {
    za_type: number,
    to: string,
    d1: number,
    d2: number,
    sc: number,
    memo: string,
};

export type ZeosTransaction = {
    action: EosAction,
    zaction_descs: Array<ZActionDesc>,
};

export type ZeosAuthorization = {
    actor: string,
    permission: string,
};