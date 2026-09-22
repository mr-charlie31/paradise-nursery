import aloeVera from '../assets/plants/aloe-vera.svg'
import echeveria from '../assets/plants/echeveria.svg'
import barrelCactus from '../assets/plants/barrel-cactus.svg'
import jadePlant from '../assets/plants/jade-plant.svg'
import zebraHaworthia from '../assets/plants/zebra-haworthia.svg'
import bunnyEarCactus from '../assets/plants/bunny-ear-cactus.svg'
import snakePlant from '../assets/plants/snake-plant.svg'
import goldenPothos from '../assets/plants/golden-pothos.svg'
import monstera from '../assets/plants/monstera.svg'
import philodendron from '../assets/plants/philodendron.svg'
import bostonFern from '../assets/plants/boston-fern.svg'
import zzPlant from '../assets/plants/zz-plant.svg'
import peaceLily from '../assets/plants/peace-lily.svg'
import orchid from '../assets/plants/orchid.svg'
import anthurium from '../assets/plants/anthurium.svg'
import africanViolet from '../assets/plants/african-violet.svg'
import jasmine from '../assets/plants/jasmine.svg'
import birdOfParadise from '../assets/plants/bird-of-paradise.svg'

export const plantCategories = [
  {
    name: 'Succulents & Cacti',
    plants: [
      { id: 1, name: 'Aloe Vera', price: 12.99, image: aloeVera },
      { id: 2, name: 'Echeveria', price: 9.99, image: echeveria },
      { id: 3, name: 'Barrel Cactus', price: 14.99, image: barrelCactus },
      { id: 4, name: 'Jade Plant', price: 16.99, image: jadePlant },
      { id: 5, name: 'Zebra Haworthia', price: 11.99, image: zebraHaworthia },
      { id: 6, name: 'Bunny Ear Cactus', price: 15.99, image: bunnyEarCactus },
    ],
  },
  {
    name: 'Foliage Plants',
    plants: [
      { id: 7, name: 'Snake Plant', price: 18.99, image: snakePlant },
      { id: 8, name: 'Golden Pothos', price: 14.99, image: goldenPothos },
      { id: 9, name: 'Monstera Deliciosa', price: 29.99, image: monstera },
      { id: 10, name: 'Heartleaf Philodendron', price: 19.99, image: philodendron },
      { id: 11, name: 'Boston Fern', price: 13.99, image: bostonFern },
      { id: 12, name: 'ZZ Plant', price: 21.99, image: zzPlant },
    ],
  },
  {
    name: 'Flowering Plants',
    plants: [
      { id: 13, name: 'Peace Lily', price: 22.99, image: peaceLily },
      { id: 14, name: 'Phalaenopsis Orchid', price: 34.99, image: orchid },
      { id: 15, name: 'Anthurium', price: 24.99, image: anthurium },
      { id: 16, name: 'African Violet', price: 12.99, image: africanViolet },
      { id: 17, name: 'Jasmine', price: 17.99, image: jasmine },
      { id: 18, name: 'Bird of Paradise', price: 39.99, image: birdOfParadise },
    ],
  },
]
