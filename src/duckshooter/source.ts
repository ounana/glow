import gun_lens from './images/gun_lens.png'
import blast from './images/blast.png'
import duck_1 from './images/duck_1.png'
import duck_2 from './images/duck_2.png'
import duck_3 from './images/duck_3.png'
import duck_4 from './images/duck_4.png'

import DS_SHOT from './sounds/ds_shot.ogg'
import DS_DUCK_HIT from './sounds/ds_duck_hit.ogg'

export interface Images {
  [key: string]: HTMLImageElement
}

export async function loadImages() {
  const [
    GUN_LENS,
    BLAST,
    DUCK_1,
    DUCK_2,
    DUCK_3,
    DUCK_4,
  ] = await Promise.all([
    loadImage(gun_lens),
    loadImage(blast),
    loadImage(duck_1),
    loadImage(duck_2),
    loadImage(duck_3),
    loadImage(duck_4),
  ])
  return {
    GUN_LENS,
    BLAST,
    DUCK_1,
    DUCK_2,
    DUCK_3,
    DUCK_4,
  }
}

const loadImage = (url: string) => new Promise<HTMLImageElement>((resolve, reject) => {
  const image = new Image()
  image.src = url
  image.onload = () => {
    resolve(image)
  }
  image.onerror = err => {
    reject(err)
  }
})

export const SOUNDS = {
  DS_SHOT,
  DS_DUCK_HIT
}