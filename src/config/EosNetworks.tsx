interface ExampleEnv {
    CHAIN_ID: string,
    RPC_PROTOCOL: string,
    RPC_HOST: string,
    RPC_PORT: string
}

export const Jungle3Config: ExampleEnv = {
    CHAIN_ID: '2a02a0053e5a8cf73a56ba0fda11e4d92e0238a4a2aa74fccf46d5a910746840',
    RPC_PROTOCOL: 'https',
    RPC_HOST: 'jungle3.cryptolions.io',
    RPC_PORT: '443',
}
export const KylinConfig: ExampleEnv = {
    CHAIN_ID: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
    RPC_PROTOCOL: 'https',
    RPC_HOST: 'kylin-dsp-1.liquidapps.io',
    RPC_PORT: '443',
}

export const jungle3 = {
    chainId: Jungle3Config.CHAIN_ID,
    rpcEndpoints: [{
        protocol: Jungle3Config.RPC_PROTOCOL,
        host: Jungle3Config.RPC_HOST,
        port: Number(Jungle3Config.RPC_PORT),
    }]
}

export const kylin = {
    chainId: KylinConfig.CHAIN_ID,
    rpcEndpoints: [{
        protocol: KylinConfig.RPC_PROTOCOL,
        host: KylinConfig.RPC_HOST,
        port: Number(KylinConfig.RPC_PORT),
    }]
}