import { Signer } from "@ethersproject/abstract-signer";
import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import type { NTNFT } from "../../src/types/contracts/NTNFT";
import type { NTNFT__factory } from "../../src/types/factories/contracts/NTNFT__factory";
import { readContractAddress } from "../deploy/addresses/utils";
import { readValue, writeValue } from "./values/utils";

task("NTNFT:addAdmin").setAction(async function (taskArguments: TaskArguments, { ethers }) {});
