import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

import type { NTNFT } from "../src/types/contracts/NTNFT";

type Fixture<T> = () => Promise<T>;

declare module "mocha" {
  export interface Context {
    ntNFT: NTNFT;
    loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
    signers: Signers;
  }
}

export interface Signers {
  admin: SignerWithAddress;
  alice: SignerWithAddress;
  andy: SignerWithAddress;
}
