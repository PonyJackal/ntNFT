import { expect } from "chai";

export function shouldBehaveLikeNTNFT(): void {
  describe("addAmin", async function () {
    it("should be able to add admins", async function () {
      // add alice to admin
      await this.ntNFT.connect(this.signers.admin).addAdmin(this.signers.alice.address, true);

      const isAdmin: boolean = await this.ntNFT.admins(this.signers.alice.address);
      expect(isAdmin).to.equal(true);
    });

    it("should revert if non-owner tries to add admin", async function () {
      const tx = this.ntNFT.connect(this.signers.alice).addAdmin(this.signers.alice.address, true);
      await expect(tx).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("should emit an AdminAdded event", async function () {
      // add alice to admin
      expect(await this.ntNFT.connect(this.signers.admin).addAdmin(this.signers.alice.address, true))
        .to.emit(this.ntNFT, "AdminAdded")
        .withArgs(this.signers.admin.address, true);
    });
  });

  describe("mint", async function () {
    it("should be able to mint tokens for admins", async function () {
      // add alice to admin
      await this.ntNFT.connect(this.signers.admin).addAdmin(this.signers.alice.address, true);
      // mint tokens for alice
      await this.ntNFT.connect(this.signers.alice).mint(10);
      // check alice's balance
      const aliceBalance = await this.ntNFT.balanceOf(this.signers.alice.address);
      expect(aliceBalance).to.equal(10);
    });

    it("should revert if non-admin tries to mint", async function () {
      // alice tries to mint tokens
      const tx = this.ntNFT.connect(this.signers.alice).mint(10);
      await expect(tx).to.be.revertedWith("NTNFT: to address is not an admin");
    });
  });

  describe("transfer", async function () {
    it("should be able to transfer tokens to admins", async function () {
      // add deployer to admins
      await this.ntNFT.connect(this.signers.admin).addAdmin(this.signers.admin.address, true);
      // add alice to deployer
      await this.ntNFT.connect(this.signers.admin).addAdmin(this.signers.alice.address, true);
      // mint tokens for alice
      await this.ntNFT.connect(this.signers.alice).mint(10);
      // transfer tokens to owner
      await this.ntNFT
        .connect(this.signers.alice)
        .transferFrom(this.signers.alice.address, this.signers.admin.address, 3);
      // check alice's balance
      const aliceBalance = await this.ntNFT.balanceOf(this.signers.alice.address);
      expect(aliceBalance).to.equal(9);
      // check deployer's balance
      const adminBalance = await this.ntNFT.balanceOf(this.signers.admin.address);
      expect(adminBalance).to.equal(1);
    });

    it("should revert if token is transferred to non-admin", async function () {
      // add alice to admin
      await this.ntNFT.connect(this.signers.admin).addAdmin(this.signers.alice.address, true);
      // alice tries to mint tokens
      await this.ntNFT.connect(this.signers.alice).mint(10);
      // alice tries to transfer tokens to deployer
      const tx = this.ntNFT
        .connect(this.signers.alice)
        .transferFrom(this.signers.alice.address, this.signers.admin.address, 3);

      await expect(tx).to.be.revertedWith("NTNFT: to address is not an admin");
    });
  });
}
