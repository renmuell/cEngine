const assert = chai.assert

describe('cEngine.file tests', () => {
  it('should create and api test', done => {

    const engine = cEngine.create({
      plugins: {
        file: cEngine.file.create()
      }
    })

    assert.isFunction(engine.plugins.file.saveToFile, 'saveToFile api exist')
    assert.isFunction(engine.plugins.file.loadFile, 'loadFile api exist')

    done()

  })
})