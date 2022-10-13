import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ethers } from "hardhat";

import type { Signers } from "../types";
import { shouldBehaveLikeNTNFT } from "./NTNFT.behavior";
import { deployNTNFTFixture } from "./NTNFT.fixture";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.alice = signers[1];

    this.loadFixture = loadFixture;
  });

  describe("NTNFT", function () {
    beforeEach(async function () {
      const { ntNFT } = await this.loadFixture(deployNTNFTFixture);
      this.ntNFT = ntNFT;
    });

    shouldBehaveLikeNTNFT();
  });
});
