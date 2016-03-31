const expect = chai.expect

describe('cEngine tests', () => {
  it('should create', done => {
    cEngine.create()
    done()
  })

  it('should step', done => {
    cEngine.create({
      step: (context) => {
        expect(context).to.exist
        done()
      }
    }).step()
  })
})
