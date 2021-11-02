import { TransformInterceptor } from './data.interceptor';

describe('DataInterceptor', () => {
  it('should be defined', () => {
    expect(new TransformInterceptor()).toBeDefined();
  });
});
