let temp
describe("simple test", () => {
  //beforeEach는 test()가 실행할 때마다 실행해주는 전처리기
  beforeEach(() => {
    temp = 1
  })
  //afterEach의 경우 test()가 종료될 때마다 실행하는 후처리기
  afterEach(() => {
    temp = 0
  })

  test("1 is 1", () => {
    expect(1).toBe(1)
  })

  test("[1,2,3] is [1,2,3]", () => {
    expect([1, 2, 3]).toEqual(1)
  })
})
// 위 예시에서 몇번의 테스트를 하더라도 temp는 1이 된다.

// 비동기 함수, 특히 API를 Call하는 함수를 테스트할 때 백엔드 서버의 상황에 따라 테스트 결과가 달라질 수 있다는 문제가 있다.

// 이러한 문제를 Mock 함수로 해결할 수 있다.

// jest 환경에서는 fetch와 같은 함수를 제공하지 않는다.

// 따라서 fetch를 임의로 만들어주면 테스트 환경에서의 fetch는 내가 만든 가짜 fetch가 실행된다.
