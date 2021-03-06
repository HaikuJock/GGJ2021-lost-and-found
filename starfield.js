var starfieldContainer = null
let stars = []
let starSpeeds = []
var starSpeedX = 0
var starSpeedY = 0

const startStarfield = () => {
    const colors = [0x98b5c6, 0xfdfde6, 0xffffff, 0xfafabc, 0xfafa92, 0x7ec3f2, 0xa1d6f9]
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

    for (let i = 0; i < 200; i++) {
        const star = new PIXI.AnimatedSprite([
            app.loader.resources.star1.texture, 
            app.loader.resources.star2.texture, 
            app.loader.resources.star3.texture,
            app.loader.resources.star4.texture])
        var x = Math.floor(Math.random() * w) + starWidth / 2
        var y = Math.floor(Math.random() * h) + starHeight / 2

        star.position.x = x
        star.position.y = y
        star.width = Math.ceil(Math.random() * starWidth) + 1
        star.height = star.width + 2// Math.max(star.width, Math.ceil(Math.random() * starHeight))

        var speed = 1 / Math.max(1, (starWidth - star.width) * 2)

        starfieldContainer.addChild(star)
        stars.push(star)
        starSpeeds.push(speed)
        //starTimers.push(Math.random())
        var colorIndex = Math.floor(Math.random() * colors.length)
        star.tint = colors[colorIndex]

        star.animationSpeed = Math.random() * 0.1
        if (Math.random() > 0.5) {
            star.animationSpeed = -star.animationSpeed
        }

        star.play()
    }
}

const starfieldTwinkles = delta => {
    if (starSpeedX != 0
        || starSpeedY != 0) {
            const w = app.renderer.width
            const h = app.renderer.height
            var goneOffscreen = []

            for (let i = 0; i < stars.length; i++) {
                const star = stars[i]
                const starSpeed = starSpeeds[i]
                star.position.x += delta * starSpeedX * starSpeed
                star.position.y += delta * starSpeedY * starSpeed

                if (star.position.x < 0
                    || star.position.x >= w
                    || star.position.y < 0
                    || star.position.y >= h) {
                        goneOffscreen.push(star)
                    }
            };

            goneOffscreen.forEach(star => {
                if (star.position.x < 0) {
                    star.position.x = w
                    star.position.y = Math.floor(Math.random() * h)
                } else if (star.position.x >= w) {
                    star.position.x = 0
                    star.position.y = Math.floor(Math.random() * h)
                } else if (star.position.y < 0) {
                    star.position.y = h
                    star.position.x = Math.floor(Math.random() * w)
                } else if (star.position.y >= h) {
                    star.position.y = 0
                    star.position.x = Math.floor(Math.random() * w)
                }
            });
        }
}
