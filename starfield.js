var starfieldContainer = null
// let stars = []
// let starTimers = []

const startStarfield = () => {
    starfieldContainer = new PIXI.Container()

    starfieldContainer.position.x = 0
    starfieldContainer.position.y = 0
    starfieldContainer.position.width = app.renderer.width
    starfieldContainer.position.height = app.renderer.height

    app.stage.addChild(starfieldContainer)

    const starWidth = app.loader.resources.star1.texture.width
    const starHeight = app.loader.resources.star1.texture.height
    const w = app.renderer.width - starWidth
    const h = app.renderer.height - starHeight

    for (let i = 0; i < 100; i++) {
        const star = new PIXI.AnimatedSprite([
            app.loader.resources.star1.texture, 
            app.loader.resources.star2.texture, 
            app.loader.resources.star3.texture,
            app.loader.resources.star4.texture])
        var x = Math.floor(Math.random() * w) + starWidth / 2
        var y = Math.floor(Math.random() * h) + starHeight / 2

        star.position.x = x
        star.position.y = y
        star.width = Math.ceil(Math.random() * starWidth)
        star.height = star.width + 2// Math.max(star.width, Math.ceil(Math.random() * starHeight))
        starfieldContainer.addChild(star)
        //stars.push(star)
        //starTimers.push(Math.random())

        star.animationSpeed = Math.random() * 0.1
        if (Math.random() > 0.5) {
            star.animationSpeed = -star.animationSpeed
        }

        star.play()
    }
}

const starfieldTwinkles = delta => {

}