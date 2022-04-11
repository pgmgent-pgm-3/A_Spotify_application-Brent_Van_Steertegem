export default class Factory {
  constructor() {
    this.inserted = [];
  }

  // eslint-disable-next-line class-methods-use-this
  async make() {
    throw new Error('Factory should contain a make method');
  }

  async makeMany(amount) {
    while (this.inserted.length < amount) {
      // eslint-disable-next-line no-await-in-loop
      await this.make();
    }
  }
}
