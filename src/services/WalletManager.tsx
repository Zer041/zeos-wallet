import { JsonRpc } from "eosjs";
import { GetCurrencyStatsResult } from "eosjs/dist/eosjs-rpc-interfaces";
import init, { Wallet } from "../assets/pkg/zeos_orchard";
import { KylinConfig } from "../config/EosNetworks";

export type ZeosSaplingAddressSession = {
    data?: {
        publickey: string,
        zeosbalance: string,
        usdbalance: string,
    },
    active?: boolean,
    alias?: string,
    id?: number,
}
export default class WalletManager {

    public static myInstance: WalletManager | null = null;
    public rpc: JsonRpc;
    #wallet: Wallet | undefined;
    #eosAccount: any;
    

    private constructor(rpc: JsonRpc) {
        if(!sessionStorage.getItem('seedPhrase')) {
            throw new Error('Seed phrase must be speecificed');
        }
        this.wallet = Wallet.new(sessionStorage.getItem('seedPhrase')!);
        this.rpc = rpc;
    }
    /**
     * @returns {WalletManager}
     */
    static async getInstance(): Promise<WalletManager> {
        if (WalletManager.myInstance == null) {
            await init();
            WalletManager.myInstance = new WalletManager(
                await new JsonRpc(`${KylinConfig.RPC_PROTOCOL}://${KylinConfig.RPC_HOST}:${KylinConfig.RPC_PORT}`),
            );
        }

        return this.myInstance!;
    }

    set wallet(wallet: Wallet) {
        this.#wallet = wallet;
    }
    
    get wallet(): Wallet {
        return this.#wallet!;
    }

    public getZeosPrivateKey(): void {
        console.log(JSON.parse(this.wallet.to_json_string()));
    }
    private getZeosAddress(diversifierIndex: number): string {
        return this.#wallet!.address(diversifierIndex);
    }

    public setZeosActiveAddress(id: number): ZeosSaplingAddressSession {
        const fixedAddresses: Array<ZeosSaplingAddressSession> =this.getZeosSaplingAddresses();
        
        fixedAddresses.map((address: ZeosSaplingAddressSession) => address.active = false);

        sessionStorage.setItem('saplingAddresses', JSON.stringify(fixedAddresses));
        sessionStorage.setItem('saplingAddresses', JSON.stringify(this.updateZeosAddress({id: id, active: true})));

        return this.getZeosSaplingAddress(id);
    }

    public getZeosActiveAddress(): ZeosSaplingAddressSession {
        return this.getZeosSaplingAddresses()
                   .filter(saplingAddress => saplingAddress.active)[0] || this.getZeosSaplingAddress(1);
    }
    
    public updateZeosAddress(updateAddress: ZeosSaplingAddressSession): void {
        const fixedAddresses: Array<ZeosSaplingAddressSession> =this.getZeosSaplingAddresses();
        
        fixedAddresses.map((address: ZeosSaplingAddressSession) => {
            if(address.id === updateAddress.id) {
                address.active = updateAddress.active ? updateAddress.active : address.active;
                address.alias = updateAddress.alias ? updateAddress.alias : address.alias;
                address.data = updateAddress.data ? updateAddress.data : address.data;
            }
            
            return address;
        })

        sessionStorage.setItem('saplingAddresses', JSON.stringify(fixedAddresses));
    }

    public getZeosSaplingAddresses(): ZeosSaplingAddressSession[] {
        return JSON.parse(sessionStorage.getItem('saplingAddresses')!) || [];
    }

    public getZeosSaplingAddress(id: number): ZeosSaplingAddressSession {
        return this.getZeosSaplingAddresses()
                    .filter(saplingAddress => saplingAddress.id === id)[0];
    }

    public createZeosSaplingAddress(): ZeosSaplingAddressSession {
        const lastSaplingAddressIndex: number = this.getZeosSaplingAddresses()?.length + 1 || 1;

        let fixedSaplingAddress: ZeosSaplingAddressSession = {
            id: lastSaplingAddressIndex,
            alias: '',
            active: false,
            data: {
                publickey: this.getZeosAddress(lastSaplingAddressIndex),
                zeosbalance: 'ZEOS --',
                usdbalance: 'USD --',
            }
        }

        console.log(fixedSaplingAddress);
        const saplingAddress = this.getZeosSaplingAddresses();
        saplingAddress.push(fixedSaplingAddress);
        console.log(saplingAddress);
        sessionStorage.setItem('saplingAddresses', JSON.stringify(saplingAddress));

        return fixedSaplingAddress;
    }

    public deleteSaplingAddress(id: number): void {
        sessionStorage.setItem('saplingAddresses', JSON.stringify(this.getZeosSaplingAddresses().filter(sapling => sapling.id !== id)));
    }

    set eosAccount(account: any) {
        this.#eosAccount = account;
    }

    get eosAccount() {
        return this.#eosAccount;
    }

    async getZeosBalance(): Promise<string> {
        if(!this.eosAccount || !this.eosAccount?.accountName) return '';

        return await this.rpc
            .get_currency_balance("thezeostoken", await this.eosAccount.accountName)
            .then((value: string[]) => value[0] || 'ZEOS 0');
    }

    async getEosBalance(): Promise<string> {
        if(!this.eosAccount || !this.eosAccount?.accountName) return '';
        
        return await this.rpc
            .get_currency_balance("eosio.token", await this.eosAccount.accountName)
            .then((value: string[]) => value[0] || 'EOS 0');
    }
    
    async getUsdBalance(): Promise<string> {
        if(!this.eosAccount || !this.eosAccount?.accountName) return '';

        return await this.rpc
            .get_currency_balance("eosio.token", await this.eosAccount.accountName)
            // .then((value: string[]) => value[0] || 'USD 0');
            .then((value: string[]) => 'USD --')
        }

    async getDappServicesBalance(): Promise<string> {
        if(!this.eosAccount || !this.eosAccount?.accountName) return '';

        return await this.rpc
            .get_currency_balance("dappservices", await this.eosAccount.accountName)
            .then((value: string[]) => value[0] || 'DAPP 0');
    }

    async getCurrencyStats(): Promise<void> {
        // if(!this.eosAccount || !this.eosAccount?.accountName);

        this.rpc
            .get_currency_stats('thezeostoken', 'ZEOS')
            .then((value: GetCurrencyStatsResult) => console.log(value));
    }
}
