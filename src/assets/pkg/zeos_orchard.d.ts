/* tslint:disable */
/* eslint-disable */
/**
* @param {any} _js_objects
* @returns {Promise<string>}
*/
export function test1(_js_objects: any): Promise<string>;
/**
* @returns {Promise<any>}
*/
export function test_get_table_rows(): Promise<any>;
/**
* @param {string} index
* @returns {Promise<any>}
*/
export function test_merkle_hash_fetch(index: string): Promise<any>;
/**
* @param {string} leaf_index
* @param {string} leaf_count
* @returns {Promise<any>}
*/
export function test_merkle_path_fetch(leaf_index: string, leaf_count: string): Promise<any>;
/**
* @returns {Promise<any>}
*/
export function test_get_global(): Promise<any>;
/**
* @returns {Promise<any>}
*/
export function test_fetch_notes(): Promise<any>;
/**
* @returns {Promise<void>}
*/
export function test_proof_upload(): Promise<void>;
/**
* A ZEOS wallet.
*/
export class Wallet {
  free(): void;
/**
* Creates a new wallet from seed phrase
* @param {string} seed
* @returns {Wallet}
*/
  static new(seed: string): Wallet;
/**
* Restores a wallet from JSON string
* @param {string} json
* @returns {Wallet}
*/
  static restore(json: string): Wallet;
/**
* Converts a wallet to JSON formatted string to be restored later using
* the 'restore' function above.
* @returns {string}
*/
  to_json_string(): string;
/**
* Returns the address of a certain diversifier as hex string
* @param {number} diversifier_index
* @returns {string}
*/
  address(diversifier_index: number): string;
/**
* Synchronize wallet state with contract state
* @returns {Promise<void>}
*/
  sync(): Promise<void>;
/**
* @param {string} js_action_descs
* @param {string} js_eos_auth
* @returns {Promise<string>}
*/
  create_transaction(js_action_descs: string, js_eos_auth: string): Promise<string>;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly test1: (a: number) => number;
  readonly test_get_table_rows: () => number;
  readonly test_merkle_hash_fetch: (a: number, b: number) => number;
  readonly test_merkle_path_fetch: (a: number, b: number, c: number, d: number) => number;
  readonly test_get_global: () => number;
  readonly test_fetch_notes: () => number;
  readonly test_proof_upload: () => number;
  readonly __wbg_wallet_free: (a: number) => void;
  readonly wallet_new: (a: number, b: number) => number;
  readonly wallet_restore: (a: number, b: number) => number;
  readonly wallet_to_json_string: (a: number, b: number) => void;
  readonly wallet_address: (a: number, b: number, c: number) => void;
  readonly wallet_sync: (a: number) => number;
  readonly wallet_create_transaction: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h4c56fc4c538480d0: (a: number, b: number, c: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__h6dfeb7d93d72f10e: (a: number, b: number, c: number, d: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
