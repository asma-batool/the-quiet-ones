/* ============================================================
   THE QUIET ONES — story data
   Writers: edit lines here. Keep each line short (under ~20 words),
   explain every hard word the first time it appears, and never
   describe a machine "dying" or "sleeping forever" — machines
   "go quiet". (Kids link sleep and death; we avoid that.)
   ============================================================ */

const CHARS = {
  zoya:      { name: 'Zoya',          color: '#f2a541', voice: { pitch: 1.35, rate: 1.0 } },
  echo:      { name: 'Echo',          color: '#7fb4ff', voice: { pitch: 0.85, rate: 0.92 } },
  eagle:     { name: 'Eagle',         color: '#e8b73c', voice: { pitch: 0.9,  rate: 0.95 } },
  surveyor:  { name: 'Surveyor 3',    color: '#9fd3c7', voice: { pitch: 1.05, rate: 0.95 } },
  lrv:       { name: 'Buggy',         color: '#ffb067', voice: { pitch: 1.2,  rate: 1.1 } },
  seismo:    { name: 'Rumble',        color: '#c5b8ff', voice: { pitch: 0.75, rate: 0.9 } },
  oppy:      { name: 'Oppy',          color: '#ff8f6b', voice: { pitch: 1.15, rate: 1.0 } },
  ingenuity: { name: 'Ingenuity',     color: '#6ee7c8', voice: { pitch: 1.45, rate: 1.12 } },
  pioneer:   { name: 'Pioneer 10',    color: '#b8c4ff', voice: { pitch: 0.7,  rate: 0.88 } },
  kepler:    { name: 'Kepler',        color: '#ffd56b', voice: { pitch: 1.0,  rate: 1.0 } },
  narrator:  { name: '',              color: '#c9c3d8', voice: { pitch: 1.0,  rate: 0.95 } }
};

/* Mission cards. status: 'still' (still working) or 'quiet'. */
const CARDS = {
  echo: {
    name: 'Echo', real: 'Apollo 11 Laser Ranging Retroreflector', place: 'moon',
    where: 'Sea of Tranquility, the Moon', when: 'Placed in July 1969', status: 'still',
    statusText: 'Still working today!',
    size: 'About as wide as a big pizza box',
    facts: [
      'A panel of 100 special mirrors that always bounce light straight back where it came from.',
      'Scientists on Earth still shine lasers at it and time how long the light takes to return.',
      'Thanks to it, we know the Moon drifts away from Earth by almost 4 cm every year.'
    ],
    link: { href: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C', label: 'Apollo 11 Lunar Module in NASA’s catalog' }
  },
  eagle: {
    name: 'Eagle', real: 'Apollo 11 Lunar Module descent stage', place: 'moon',
    where: 'Sea of Tranquility, the Moon', when: 'Landed 20 July 1969', status: 'quiet',
    statusText: 'Quiet since 1969',
    size: 'Wider than a car is long',
    facts: [
      'The Lunar Module had two halves. The bottom half landed, and the top half flew the astronauts back up.',
      'The bottom half stayed behind and worked as a launch pad.',
      'Six of these launch pads are on the Moon, one from each Apollo landing.'
    ],
    link: { href: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C', label: 'Apollo 11 Lunar Module in NASA’s catalog' }
  },
  surveyor: {
    name: 'Surveyor 3', real: 'Surveyor 3 robotic lander', place: 'moon',
    where: 'Ocean of Storms, the Moon', when: 'Landed April 1967', status: 'quiet',
    statusText: 'Quiet since 1967',
    size: 'Taller than a grown-up',
    facts: [
      'Robot landers like Surveyor proved the Moon’s ground was safe to land on.',
      'It dug into the soil with a little scoop and took thousands of pictures.',
      'In 1969, Apollo 12 astronauts walked over and brought pieces of it back to Earth. The first time people visited a robot on another world!'
    ],
    link: { href: 'https://science.nasa.gov/mission/surveyor-3/', label: 'Surveyor 3 on NASA Science' }
  },
  lrv: {
    name: 'Buggy', real: 'Lunar Roving Vehicle (Moon buggy)', place: 'moon',
    where: 'Apollo 15, 16 and 17 landing sites', when: 'Driven in 1971 and 1972', status: 'quiet',
    statusText: 'Parked since 1972',
    size: 'About as long as a small car',
    facts: [
      'An electric car, built to fold up and ride to the Moon tucked into the side of the Lunar Module.',
      'Its wheels were made of springy wire mesh, because rubber tyres would not work there.',
      'It let astronauts explore much farther from their spaceship than walking.'
    ],
    link: { href: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C', label: 'Lunar Roving Vehicle in NASA’s catalog' }
  },
  seismo: {
    name: 'Rumble', real: 'Apollo seismometer (part of ALSEP)', place: 'moon',
    where: 'Apollo landing sites', when: 'Listening 1969 to 1977', status: 'quiet',
    statusText: 'Switched off in 1977',
    size: 'Small enough for an astronaut to carry',
    facts: [
      'A seismometer feels the ground shake, even very gently.',
      'Apollo astronauts set up science stations with seismometers that kept working long after they left.',
      'They found that the Moon has quakes too, called moonquakes.'
    ],
    link: { href: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C', label: 'Apollo 12 science station in NASA’s catalog' }
  },
  oppy: {
    name: 'Oppy', real: 'Opportunity Mars rover', place: 'mars',
    where: 'Perseverance Valley, Mars', when: 'Worked 2004 to 2018', status: 'quiet',
    statusText: 'Quiet since 2018',
    size: 'About the size of a golf cart',
    facts: [
      'Built to work for 90 Martian days. It kept going for almost 15 years.',
      'Drove more than 45 km, longer than a marathon race.',
      'Found tiny round stones (nicknamed blueberries) that formed in water. Mars was once wet!'
    ],
    link: { href: 'https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/', label: 'Spirit and Opportunity on NASA Science' }
  },
  ingenuity: {
    name: 'Ingenuity', real: 'Ingenuity Mars Helicopter', place: 'mars',
    where: 'Jezero Crater, Mars', when: 'Flew 2021 to 2024', status: 'quiet',
    statusText: 'Grounded since 2024',
    size: 'Its body is about the size of a tissue box',
    facts: [
      'On 19 April 2021 it became the first helicopter to fly on another world.',
      'It was planned to fly up to 5 times. It flew 72 times!',
      'Mars air is very thin, about 1% as thick as Earth’s, so its blades had to spin super fast.'
    ],
    link: { href: 'https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/', label: 'Ingenuity on NASA Science' }
  },
  viking: {
    name: 'Viking 1', real: 'Viking 1 lander', place: 'mars',
    where: 'Chryse Planitia, Mars', when: 'Worked 1976 to 1982', status: 'quiet',
    statusText: 'Quiet since 1982',
    size: 'About as wide as a car',
    facts: [
      'The first US spacecraft to land safely on Mars and do its job.',
      'It sent home some of the first pictures taken on the ground on Mars.',
      'It kept working for more than six years.'
    ],
    link: { href: 'https://science.nasa.gov/mission/viking-1/', label: 'Viking 1 on NASA Science' }
  },
  sojourner: {
    name: 'Sojourner', real: 'Sojourner rover (Mars Pathfinder)', place: 'mars',
    where: 'Ares Vallis, Mars', when: 'Drove in 1997', status: 'quiet',
    statusText: 'Quiet since 1997',
    size: 'About the size of a microwave oven',
    facts: [
      'The very first rover on Mars.',
      'It was planned to work for one week. It lasted almost three months.',
      'It showed that small robot cars could explore another planet.'
    ],
    link: { href: 'https://science.nasa.gov/mission/mars-pathfinder/', label: 'Mars Pathfinder on NASA Science' }
  },
  spirit: {
    name: 'Spirit', real: 'Spirit Mars rover', place: 'mars',
    where: 'Gusev Crater, Mars', when: 'Worked 2004 to 2010', status: 'quiet',
    statusText: 'Quiet since 2010',
    size: 'About the size of a golf cart',
    facts: [
      'Oppy’s twin! They landed on opposite sides of Mars in 2004.',
      'Found clues that hot water once bubbled up from the ground.',
      'Got stuck in soft sand in 2009 and went quiet in 2010.'
    ],
    link: { href: 'https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/', label: 'Spirit and Opportunity on NASA Science' }
  },
  phoenix: {
    name: 'Phoenix', real: 'Phoenix Mars lander', place: 'mars',
    where: 'Near the north pole of Mars', when: 'Worked in 2008', status: 'quiet',
    statusText: 'Quiet since 2008',
    size: 'Its two round solar panels open wider than a car',
    facts: [
      'Landed in the icy far north of Mars.',
      'Dug a little trench with its robot arm and found water ice just under the soil.',
      'Spotted snow falling from Martian clouds!'
    ],
    link: { href: 'https://nssdc.gsfc.nasa.gov/', label: 'NASA Space Science Data Coordinated Archive' }
  },
  insight: {
    name: 'InSight', real: 'InSight Mars lander', place: 'mars',
    where: 'Elysium Planitia, Mars', when: 'Worked 2018 to 2022', status: 'quiet',
    statusText: 'Quiet since 2022',
    size: 'About as long as a car with its panels open',
    facts: [
      'Its seismometer felt more than 1,300 marsquakes.',
      'Those quakes helped scientists learn what the inside of Mars is like.',
      'Dust slowly covered its solar panels until it ran out of power.'
    ],
    link: { href: 'https://science.nasa.gov/mission/insight/', label: 'InSight on NASA Science' }
  },
  pioneer: {
    name: 'Pioneer 10', real: 'Pioneer 10 deep-space probe', place: 'space',
    where: 'Heading out of our solar system', when: 'Launched March 1972', status: 'quiet',
    statusText: 'Too far to hear since 2003',
    size: 'Its dish is wider than a grown-up is tall',
    facts: [
      'The first spacecraft to fly through the asteroid belt.',
      'The first to fly past Jupiter, in 1973.',
      'Carries a metal plaque with a picture message, in case anyone out there ever finds it.'
    ],
    link: { href: 'https://science.nasa.gov/mission/pioneer-10/', label: 'Pioneer 10 on NASA Science' }
  },
  kepler: {
    name: 'Kepler', real: 'Kepler Space Telescope', place: 'space',
    where: 'Drifting around the Sun, trailing behind Earth', when: 'Worked 2009 to 2018', status: 'quiet',
    statusText: 'Out of fuel since 2018',
    size: 'Longer than a grown-up is tall',
    facts: [
      'Stared at stars and watched for tiny dips in their light.',
      'A dip can mean a planet just passed in front of the star.',
      'Found more than 2,600 planets around other stars.'
    ],
    link: { href: 'https://science.nasa.gov/mission/kepler/', label: 'Kepler on NASA Science' }
  },
  near: {
    name: 'NEAR Shoemaker', real: 'NEAR Shoemaker spacecraft', place: 'space',
    where: 'Resting on asteroid Eros', when: 'Landed February 2001', status: 'quiet',
    statusText: 'Quiet since 2001',
    size: 'About as big as a small car',
    facts: [
      'The first spacecraft to circle an asteroid.',
      'Then it became the first to land on one, even though it was never built for landing!',
      'Eros is shaped a bit like a giant peanut.'
    ],
    link: { href: 'https://science.nasa.gov/mission/near-shoemaker/', label: 'NEAR Shoemaker on NASA Science' }
  },
  dawn: {
    name: 'Dawn', real: 'Dawn spacecraft', place: 'space',
    where: 'Circling the dwarf planet Ceres', when: 'Worked 2007 to 2018', status: 'quiet',
    statusText: 'Out of fuel since 2018',
    size: 'Its solar wings stretch wider than a bus is long',
    facts: [
      'The first spacecraft to circle two different worlds: Vesta, then Ceres.',
      'Found shiny, salty bright spots on Ceres.',
      'It ran out of fuel and keeps circling Ceres quietly.'
    ],
    link: { href: 'https://science.nasa.gov/mission/dawn/', label: 'Dawn on NASA Science' }
  }
};

/* Map order */
const MAP_GROUPS = [
  { place: 'moon',  title: 'On the Moon',   ids: ['echo', 'eagle', 'surveyor', 'lrv', 'seismo'] },
  { place: 'mars',  title: 'On Mars',       ids: ['oppy', 'ingenuity', 'viking', 'sojourner', 'spirit', 'phoenix', 'insight'] },
  { place: 'space', title: 'Out in space',  ids: ['pioneer', 'kepler', 'near', 'dawn'] }
];

const CHAPTERS = [
  { n: 1, title: 'The Night the Moon Answered', art: 'chapter1' },
  { n: 2, title: 'Neighbours on the Moon',      art: 'chapter2' },
  { n: 3, title: 'The Quiet Ones of Mars',      art: 'chapter3' },
  { n: 4, title: 'The Wanderers',               art: 'chapter4' },
  { n: 5, title: 'Still Here',                  art: 'chapter5' }
];

/* Scenes. line.act = interaction shown with that line. line.cards = buttons to open cards. */
const SCENES = [
  { type: 'title', art: 'title', alt: 'A girl on a rooftop in Karachi looks up at a huge full Moon. A tiny light twinkles on it.' },

  { type: 'chapter', ch: 1 },
  { ch: 1, art: 'rooftop', alt: 'Zoya stands on a Karachi rooftop at night beside her telescope and water tanks, looking up at the full Moon.',
    lines: [
      { who: 'zoya', text: 'It was too hot to sleep in Karachi. So I took my telescope up to the roof.' },
      { who: 'zoya', text: 'The Moon was huge tonight. I wondered… is anyone up there?' }
    ] },
  { ch: 1, art: 'moonGlint', alt: 'A close-up of the Moon. One tiny point of light twinkles on its surface.',
    lines: [
      { who: 'echo', text: 'Hello down there! Nobody lives on the Moon…' },
      { who: 'echo', text: '…but we are here. The machines people left behind.' },
      { who: 'zoya', text: 'Wait. Is the Moon talking to me?!' }
    ] },
  { ch: 1, art: 'echoIntro', card: 'echo', alt: 'Echo, a flat panel covered in 100 round mirrors, stands on grey Moon dust. Behind it is the gold base of the Eagle lander. Earth glows in the black sky.',
    lines: [
      { who: 'echo', text: 'Not the Moon. Me! You can call me Echo.' },
      { who: 'echo', text: 'I’m a mirror. Well, 100 tiny mirrors in one panel.' },
      { who: 'echo', text: 'Astronauts Neil Armstrong and Buzz Aldrin set me down here in July 1969. They were the first people to walk on the Moon.' }
    ] },
  { ch: 1, art: 'laser', wide: true, card: 'echo', alt: 'Earth in the lower left and the Moon in the upper right. An observatory on Earth points toward the Moon.',
    lines: [
      { who: 'echo', text: 'Even today, scientists on Earth shine lasers at me.' },
      { who: 'echo', text: 'I bounce the light straight back to them. Want to try? Press the button!', act: 'laser' }
    ] },
  { ch: 1, art: 'measure', wide: true, card: 'echo', alt: 'Earth and the Moon with a long dotted measuring line between them, labelled 384,400 kilometres.',
    lines: [
      { who: 'echo', text: 'By timing the light, scientists can measure exactly how far away the Moon is.' },
      { who: 'echo', text: 'That’s how they found out the Moon moves away from Earth by almost 4 cm every year. About as fast as your fingernails grow!' },
      { who: 'zoya', text: 'So you’ve been working for more than 50 years?' },
      { who: 'echo', text: 'Yes! And I’m not the only one up here. Want to meet my neighbours?' }
    ] },

  { type: 'chapter', ch: 2 },
  { ch: 2, art: 'eagleScene', card: 'eagle', alt: 'The Eagle: a gold, eight-sided base on four spindly legs with a ladder, standing on the Moon. Echo waves from nearby.',
    lines: [
      { who: 'eagle', text: 'Hi! I’m Eagle. Well, the bottom half of Eagle, the spaceship that landed Neil and Buzz.' },
      { who: 'eagle', text: 'When it was time to go home, my top half blasted off. I was their launch pad!' },
      { who: 'echo', text: 'There are six launch pads like Eagle up here. One from each Moon landing.' }
    ] },
  { ch: 2, art: 'surveyorAlone', card: 'surveyor', alt: 'Surveyor 3, a three-legged robot lander with a tall mast and solar panel, sits alone inside a small crater.',
    lines: [
      { who: 'surveyor', text: 'I’m Surveyor 3, a robot lander. I came here in 1967, before any people did.' },
      { who: 'surveyor', text: 'My job was to test the ground. Was it hard enough to land on? Or soft like powder?' },
      { who: 'surveyor', text: 'It was safe! So people could come next. Then I waited…' }
    ] },
  { ch: 2, art: 'surveyorVisit', card: 'surveyor', alt: 'Two astronauts in white spacesuits walk down into the crater toward a delighted Surveyor 3.',
    lines: [
      { who: 'surveyor', text: 'Two and a half years later, Apollo 12 landed just a short walk away. Astronauts came to visit me!' },
      { who: 'surveyor', text: 'They took my camera back to Earth, so scientists could see how space had changed it.' },
      { who: 'echo', text: 'It was the first time people ever visited a robot on another world.' }
    ] },
  { ch: 2, art: 'lrvScene', card: 'lrv', alt: 'Buggy, the Moon buggy, is parked on the grey hills with its wire wheels and umbrella-shaped antenna. Tyre tracks curve behind it.',
    lines: [
      { who: 'lrv', text: 'Beep beep! I’m Buggy, a Moon car. Astronauts drove me to explore far from their spaceship.' },
      { who: 'lrv', text: 'I run on batteries, my wheels are made of springy wire, and I’m about as fast as a bicycle.' },
      { who: 'lrv', text: 'Three Moon buggies are still parked up here, right where the astronauts left us.' }
    ] },
  { ch: 2, art: 'seismoScene', card: 'seismo', alt: 'Rumble, a small silver drum sitting on a shiny blanket on the Moon, next to a wavy line that shows shaking.',
    lines: [
      { who: 'seismo', text: 'I’m Rumble, a seismometer. That’s a machine that feels the ground shake.' },
      { who: 'seismo', text: 'Guess what? The Moon has quakes too! Moonquakes. I listened for them until 1977.' },
      { who: 'echo', text: 'Want to feel one? Press the button and watch Rumble’s line wiggle.', act: 'quake' }
    ] },

  { type: 'chapter', ch: 3 },
  { ch: 3, art: 'toMars', alt: 'Echo on the Moon looks up at a glowing red dot in the black sky: Mars.',
    lines: [
      { who: 'echo', text: 'Some of my friends went much farther. All the way to Mars!' },
      { who: 'zoya', text: 'Mars? That’s so far away!' },
      { who: 'echo', text: 'No people have been there yet. Only robots. Let’s meet them.' }
    ] },
  { ch: 3, art: 'oppyScene', card: 'oppy', alt: 'Oppy, a six-wheeled rover with wide solar panels and two camera eyes on a tall mast, rolls across red Mars sand.',
    lines: [
      { who: 'oppy', text: 'Hi! I’m Opportunity, but everyone calls me Oppy. I’m a rover, a robot car for exploring.' },
      { who: 'oppy', text: 'I landed on Mars in 2004. I was built to work for just 90 days.' },
      { who: 'oppy', text: 'Guess what? I kept going for almost 15 years!' }
    ] },
  { ch: 3, art: 'blueberries', card: 'oppy', alt: 'A magnifying circle shows tiny grey-blue round stones on red rock, with Oppy’s arm reaching in.',
    lines: [
      { who: 'oppy', text: 'I found tiny round stones. Scientists nicknamed them “blueberries”!' },
      { who: 'oppy', text: 'Stones like these form in water. So a long, long time ago, Mars was wet.' }
    ] },
  { ch: 3, art: 'marathon', card: 'oppy', alt: 'A long winding track crosses Mars with a finish banner marked marathon, 42.2 km.',
    lines: [
      { who: 'oppy', text: 'I also drove a very long way. Press the button to see how far!', act: 'odometer' }
    ] },
  { ch: 3, art: 'dustStorm', card: 'oppy', alt: 'A soft orange dust storm fills the sky. Oppy rests with dusty solar panels and calm closed eyes.',
    lines: [
      { who: 'echo', text: 'In 2018, a giant dust storm covered the whole of Mars.' },
      { who: 'echo', text: 'The dust blocked the sunlight. Oppy’s solar panels couldn’t make power, so she went quiet.' },
      { who: 'echo', text: 'Scientists called her more than 1,000 times. She didn’t answer. But her job was done, and she did it brilliantly.' },
      { who: 'zoya', text: 'Poor Oppy…' },
      { who: 'echo', text: 'Don’t be too sad. Everything she found is still helping scientists today.' }
    ] },
  { ch: 3, art: 'ingenuityFly', card: 'ingenuity', alt: 'Ingenuity, a tiny helicopter with two long stacked rotor blades and four thin legs, hovers above a crater on Mars.',
    lines: [
      { who: 'ingenuity', text: 'My turn, my turn! I’m Ingenuity, a tiny helicopter. I rode to Mars tucked under a rover’s belly.' },
      { who: 'ingenuity', text: 'Mars air is super thin. Nobody knew if anything could fly there!' },
      { who: 'ingenuity', text: 'The plan was 5 flights. Press the button to see how many I did!', act: 'flights' }
    ] },
  { ch: 3, art: 'ingenuityRest', card: 'ingenuity', alt: 'Ingenuity rests on a sand ripple with one broken blade, smiling, under a blue Martian sunset.',
    lines: [
      { who: 'ingenuity', text: 'In 2024, my rotor blades got broken on a landing. So now I stay put.' },
      { who: 'ingenuity', text: 'But I’ll always be the first helicopter to fly on another world. Ever!' },
      { who: 'narrator', text: 'Fun fact: sunsets on Mars look blue!' }
    ] },
  { ch: 3, art: 'marsFamily', wide: true, alt: 'Five more Mars robots in a row: Viking 1, Sojourner, Spirit, Phoenix on icy ground, and InSight with its dome.',
    lines: [
      { who: 'echo', text: 'Mars has more quiet friends. Tap one to meet them!', cards: ['viking', 'sojourner', 'spirit', 'phoenix', 'insight'] }
    ] },

  { type: 'chapter', ch: 4 },
  { ch: 4, art: 'pioneerScene', card: 'pioneer', alt: 'Pioneer 10, with a big white dish and two long arms, flies through dark space past striped Jupiter.',
    lines: [
      { who: 'pioneer', text: 'Hellooo… from very far away. I’m Pioneer 10. I left Earth in 1972.' },
      { who: 'pioneer', text: 'I was the first spacecraft to fly past Jupiter, the biggest planet.' },
      { who: 'pioneer', text: 'I carry a picture message on a metal plate, in case anyone out there ever finds me.' },
      { who: 'echo', text: 'His voice got too faint to hear in 2003. But he’s still flying, out beyond the planets.' }
    ] },
  { ch: 4, art: 'keplerScene', card: 'kepler', alt: 'Kepler, a tube-shaped space telescope with a solar panel, watches a bright star. A small chart shows the star’s brightness.',
    lines: [
      { who: 'kepler', text: 'I’m Kepler, a space telescope. I stared at stars to find planets.' },
      { who: 'kepler', text: 'When a planet passes in front of its star, the star gets a tiny bit dimmer. Slide the planet and watch!', act: 'transit' },
      { who: 'kepler', text: 'I found more than 2,600 planets that way!' }
    ] },
  { ch: 4, art: 'wanderers', wide: true, alt: 'Left: NEAR Shoemaker resting on Eros, a peanut-shaped asteroid. Right: Dawn with long solar wings circling Ceres, which has bright spots.',
    lines: [
      { who: 'echo', text: 'Some explorers visited asteroids (giant space rocks) and dwarf planets (tiny round worlds).' },
      { who: 'echo', text: 'Tap one to meet them!', cards: ['near', 'dawn'] }
    ] },

  { type: 'chapter', ch: 5 },
  { ch: 5, art: 'rooftopThink', alt: 'Zoya stands quietly on the rooftop beside her telescope, thinking, with the Moon above.',
    lines: [
      { who: 'zoya', text: 'So all of you are just… switched off?' },
      { who: 'echo', text: 'Some of us are quiet now. But quiet doesn’t mean forgotten.' }
    ] },
  { ch: 5, art: 'skyLights', alt: 'The night sky over Karachi. Tiny lights twinkle on the Moon and on red Mars, one for each robot.',
    lines: [
      { who: 'echo', text: 'Every one of us taught people something new. That’s how the next explorers got built.' },
      { who: 'echo', text: 'New robots are exploring Mars right now. In 2026, a rover called Perseverance drove a whole marathon, just like Oppy did!' },
      { who: 'echo', text: 'And in 2026, astronauts flew all the way around the Moon again. One day soon, people will walk up here once more.' },
      { who: 'echo', text: 'Here’s everyone you met tonight. Open the map and say hi again!', act: 'map' }
    ] },
  { ch: 5, art: 'goodnight', alt: 'Zoya waves at the Moon. A tiny green laser light twinkles back.',
    lines: [
      { who: 'echo', text: 'Tonight, someone will shine a laser at me. And I’ll send it back, like always.' },
      { who: 'echo', text: 'Maybe one day, Zoya, you’ll build the next one of us.' },
      { who: 'zoya', text: 'Goodnight, Echo! I’ll come back and wave tomorrow.' }
    ] },

  { type: 'end', art: 'end', alt: 'The End. The Moon glows over the rooftop.' }
];
