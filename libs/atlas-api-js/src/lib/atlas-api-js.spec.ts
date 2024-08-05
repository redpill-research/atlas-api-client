import { createAtlasApiClient } from './atlas-api-js';

describe('atlasApiJs', () => {
  it('should work', () => {
    const client = createAtlasApiClient({ baseUrl: 'https://api.atls.rs' });
    expect(client.authConfirm).toBeDefined();
    expect(client.authStart).toBeDefined();
    expect(client.createOrder).toBeDefined();
    expect(client.generateInviteCode).toBeDefined();
    expect(client.getAllOrders).toBeDefined();
    expect(client.getCountries).toBeDefined();
    expect(client.getOrderById).toBeDefined();
    expect(client.getProductsByCountry).toBeDefined();
    expect(client.getProductsById).toBeDefined();
    expect(client.getReferralInfo).toBeDefined();
    expect(client.searchProducts).toBeDefined();
    expect(client.sendInvite).toBeDefined();
  });
});
