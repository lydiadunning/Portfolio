function makeProjectImageChanger (projectName, imageCount) {   
    // assumes all images are png files, named with the project name followed by a number, 
    // with the numbers in sequential order starting from 1. 
    // the imageCount variable specifies the number of images associated with a project.
    return {
        totalImageCount: imageCount,
        currentImageCount: 1,
        projectName: projectName,
        imageId: `${projectName}-images`,
        imageElement: document.getElementById(`${projectName}-images`),
        incrementCount: function () {
            this.currentImageCount = ((this.currentImageCount < this.totalImageCount) ? this.currentImageCount + 1 : 1)
        },
        decrementCount: function () {
            this.currentImageCount = (this.currentImageCount > 1 ? this.currentImageCount - 1 : this.totalImageCount)
        },
        getImageName: function () {
            return `./files/images/${this.projectName}${this.currentImageCount}.png`
        },
        writeImageToSite: function () {
            const newImage = document.createElement("img");
            newImage.src = this.getImageName()
            newImage.id = this.imageId
            this.imageElement.replaceWith(newImage)
            this.imageElement = document.getElementById(this.imageId)
        }
    }
}

function makeProjectImageHandler (images) {
    // assumes that the image is in an <a> tag, with an arrow before and an arrow after, each with the expected id
    // like this:
    // <p id="projectName-back"> &lt </p> <a><image></a> <p id="projectName-next"> &gt </p>
    return {
        images: images,
        previousInput: document.getElementById(`${images.projectName}-back`),
        nextInput: document.getElementById(`${images.projectName}-next`),
        previousHandler: function () {
            images.decrementCount()
            images.writeImageToSite()
        },
        nextHandler: function () {
            images.incrementCount()
            images.writeImageToSite()
        },
        addHandlers: function () {
            this.previousInput.addEventListener('click', this.previousHandler)
            this.nextInput.addEventListener('click', this.nextHandler)
        }
    }
}

// requiring an onload event before adding event handlers prevents errors due to image load delays.
addEventListener('load', (event) => {
    const dittyImageHandler = makeProjectImageHandler(makeProjectImageChanger('Ditty', 4))
    dittyImageHandler.addHandlers()
    const iknowImageHandler = makeProjectImageHandler(makeProjectImageChanger('iknow', 4))
    iknowImageHandler.addHandlers()
});
