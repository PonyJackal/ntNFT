import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import type { NTNFT } from "../../src/types/contracts/NTNFT";
import type { NTNFT__factory } from "../../src/types/factories/contracts/NTNFT__factory";
import { readContractAddress, writeContractAddress } from "./addresses/utils";

task("deploy:NTNFT").setAction(async function (taskArguments: TaskArguments, { ethers }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const ntNFTFactory: NTNFT__factory = <NTNFT__factory>await ethers.getContractFactory("NTNFT");
  const ntNFT: NTNFT = <NTNFT>await ntNFTFactory.connect(signers[0]).deploy();
  await ntNFT.deployed();

  writeContractAddress("ntNFT", ntNFT.address);
  console.log("NTNFT deployed to: ", ntNFT.address);
});

task("verify:NTNFT").setAction(async function (taskArguments: TaskArguments, { run }) {
  const address = readContractAddress("ntNFT");

  try {
    await run("verify:verify", {
      address,
      constructorArguments: [],
    });
  } catch (err) {
    console.log(err);
  }
});
