// bgImg is the background image to be modified.
// fgImg is the foreground image.
// fgOpac is the opacity of the foreground image.
// fgPos is the position of the foreground image in pixels. It can be negative and (0,0) means the top-left pixels of the foreground and background are aligned.
function composite( bgImg, fgImg, fgOpac, fgPos )
{

    let bgData = bgImg.data;
    let fgData = fgImg.data;

    let bgHeight = bgImg.height;
    let bgWidth = bgImg.width;
    let fgHeight = fgImg.height;
    let fgWidth = fgImg.width;

    let offsetX = fgPos.x;
    let offsetY = fgPos.y;

    for(i = 0; i < fgHeight; i++){
        for(j = 0; j < fgWidth; j++){

            let fgIndex = (i * fgWidth + j) * 4;
            let bgX = j + offsetX;
            let bgY = i + offsetY;

            //Ignora pixel fuori dai bordi dello sfondo
            if (bgX < 0 || bgX >= bgWidth || bgY < 0 || bgY >= bgHeight) {
                continue; 
            }
            let bgIndex = (bgY * bgWidth + bgX) * 4;

            let fgAlpha = fgData[fgIndex + 3] / 255 * fgOpac;

            // Blend dei canali R, G, B
            for (let i = 0; i < 3; i++) {
                bgData[bgIndex + i] = fgAlpha * fgData[fgIndex + i] + (1 - fgAlpha) * bgData[bgIndex + i];
            }

            let newAlpha = fgAlpha + (bgData[bgIndex + 3]/255 * (1 - fgAlpha));
            bgData[bgIndex + 3] = newAlpha*255;

        }
    }



}
