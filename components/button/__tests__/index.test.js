function test(){
return 2;
}
describe('Button', () => {


  it('create primary button', () => {
       expect(test()).toEqual(1);
  });

});
