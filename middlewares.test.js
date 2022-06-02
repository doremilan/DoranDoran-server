describe("계산 테스트", () => {
  const a = 1,
    b = 2

  test("a + b는 3이다.", () => {
    expect(a + b).toEqual(3)
  })
})

/*
 describe('그룹 테스트 설명 문자열', () => {
    const a = 1, b = 2; // 테스트에 사용할 일회용 가짜 변수 선언
  
    test('개별 테스트 설명 문자열', () => {
       expect(검증대상).toXxx(기대결과);
    });
 });
 */
