interface ToLoad {
  playerSpriteSheet: string;
  engineSpriteSheet: string;
  beamEnemySpriteSheet: string;
  explosionSpriteSheet: string;
  commonEnemySpriteSheet: string;
}

export interface InitSprite {
  image: HTMLImageElement;
  isLoaded: boolean;
}

type Images = {
  playerSpriteSheet: InitSprite;
  engineSpriteSheet: InitSprite;
  beamEnemySpriteSheet: InitSprite;
  explosionSpriteSheet: InitSprite;
  commonEnemySpriteSheet: InitSprite;
};

class Resources {
  toLoad: ToLoad;
  images: Images;

  constructor() {
    // Everything we plan to download
    this.toLoad = {
      playerSpriteSheet: "/tyrian-space-ship.png",
      engineSpriteSheet: "/jet-engine-sprite.png",
      beamEnemySpriteSheet: "/beam-enemy.png",
      explosionSpriteSheet: "/explosion.png",
      commonEnemySpriteSheet: "/common-enemy.png",
    };

    // A bucket to keep all of our images
    this.images = {} as Images;

    // Load each image
    Object.keys(this.toLoad).forEach((key) => {
      const img = new Image();
      img.src = this.toLoad[key as keyof ToLoad];
      this.images[key as keyof Images] = {
        image: img,
        isLoaded: false,
      };
      img.onload = () => {
        this.images[key as keyof Images].isLoaded = true;
      };
    });
  }
}

// Create one instance for the whole app to use
export const resources = new Resources();
