const expect = chai.expect

describe('cEngine tests', () => {

  it('should create', done => {
    let engine = cEngine.create()
    expect(engine).to.exist
    done()
  })

  it('should takes style configs', done => {

    let wrapper = document.createElement('div')    
    document.body.appendChild(wrapper)

    cEngine.create({
      domElement: wrapper,
      autoClear: true,
      step: (
        context, 
        width, 
        height, 
        stepTimeElapsed) => {

      },
      width: 123,
      height: 456,
      style: {
        border: '1px solid black'
      }
    })

    let canvas = wrapper.childNodes[0]
    expect(canvas.style.border).to.equal('1px solid black')

    done()
  })

  it('should step', done => {
    cEngine.create({
      step: function (context, width, height, stepTimeElapsed) {
        expect(this).to.exist
        expect(context).to.exist
        expect(width).to.exist
        expect(height).to.exist
        expect(stepTimeElapsed).to.exist
        done()
      }
    }).step()
  })

  it('should multiple step', done => {
    let steps = 0
    let engine = cEngine.create({
      step: (context) => {
        expect(context).to.exist
        steps++
      }
    })

    engine.step()
    engine.step()
    engine.step()

    expect(steps).to.equal(3)
    done()
  })  

  it('should multiple step per argument', done => {
    let steps = 0
    let engine = cEngine.create({
      step: (context) => {
        expect(context).to.exist
        steps++
      }
    })

    engine.step(3)

    expect(steps).to.equal(3)
    done()
  })  
})
