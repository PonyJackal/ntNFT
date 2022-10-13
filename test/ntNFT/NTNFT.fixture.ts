import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ethers } from "hardhat";

import type { NTNFT } from "../../src/types/contracts/NTNFT";
import type { NTNFT__factory } from "../../src/types/factories/contracts/NTNFT__factory";

export async function deployNTNFTFixture(): Promise<{ ntNFT: NTNFT }> {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const admin: SignerWithAddress = signers[0];

  const ntNFTFactory: NTNFT__factory = <NTNFT__factory>await ethers.getContractFactory("NTNFT");
  const ntNFT: NTNFT = <NTNFT>await ntNFTFactory.connect(admin).deploy();
  await ntNFT.deployed();

  return { ntNFT };
}
