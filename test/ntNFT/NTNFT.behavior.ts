import { expect } from "chai";

export function shouldBehaveLikeNTNFT(): void {
  describe("addAmin", async function () {
    it("should be able to add admins", async function () {
      await this.ntNFT.connect(this.signers.admin).addAdmin(this.signers.alice.address, true);

      const isAdmin: boolean = await this.ntNFT.admins(this.signers.alice.address);
      expect(isAdmin).to.equal(true);
    });

    it("should revert if non-owner tries to add admin", async function () {
      const tx = this.ntNFT.connect(this.signers.alice).addAdmin(this.signers.alice.address, true);
      await expect(tx).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("should emit an AdminAdded event", async function () {
      expect(await this.ntNFT.connect(this.signers.admin).addAdmin(this.signers.alice.address, true))
        .to.emit(this.ntNFT, "AdminAdded")
        .withArgs(this.signers.admin.address, true);
    });
  });
}
