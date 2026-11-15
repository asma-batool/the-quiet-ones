# The Quiet Ones

**An interactive bedtime story about the robots and spacecraft humanity left on the Moon, on Mars and in deep space, and what they taught us.**

NASA Space Apps Challenge 2026 · Challenge: *Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars*

**Live site:** https://YOUR-SITE.netlify.app  ← replace after deploying

---

## The story

Zoya, a 10-year-old in Karachi, can't sleep on a hot night. She takes her telescope to the roof and asks the Moon if anyone is up there. Something answers: **Echo**, the Apollo 11 laser mirror. It is the one Apollo experiment still working today, because scientists on Earth still bounce lasers off it.

Echo introduces Zoya to its neighbours, the machines that have gone quiet:

| Chapter | Machines |
|---|---|
| 1. The Night the Moon Answered | Echo (Apollo 11 Laser Ranging Retroreflector) |
| 2. Neighbours on the Moon | Eagle (Lunar Module descent stage), Surveyor 3, Buggy (Lunar Roving Vehicle), Rumble (Apollo seismometer) |
| 3. The Quiet Ones of Mars | Oppy (Opportunity), Ingenuity, Viking 1, Sojourner, Spirit, Phoenix, InSight |
| 4. The Wanderers | Pioneer 10, Kepler, NEAR Shoemaker, Dawn |
| 5. Still Here | Why quiet doesn't mean forgotten |

**Audience:** children aged about 7 to 12, and anyone curious. About 10 minutes.

## Learning by doing

Each mission's key science becomes something the reader does:

- **Fire a laser at the Moon.** The beam takes the real 2.5-second round trip and shows the Earth–Moon distance (384,400 km).
- **Make a moonquake** and watch the seismometer trace.
- **Drive Oppy's marathon:** the odometer counts to 45.16 km and passes the 42.2 km marathon mark.
- **Fly Ingenuity** and watch it pass its planned 5 flights on the way to 72.
- **Find a planet like Kepler:** slide a planet across a star and watch the brightness curve dip.
- **Map of the Quiet Ones:** every machine you met, with a mission card for each.

## Accessibility

- Works on desktop, tablets, phones and phones turned sideways
- **Read to me** narration, with a different voice per character (Web Speech API)
- Bigger-text and less-movement settings; respects the device's reduced-motion setting
- Full keyboard control (arrow keys), swipe on touch screens, screen-reader descriptions for every scene
- Plain language: short sentences, every hard word explained the first time it appears

## Design choices for children

- Machines never "die" or "sleep forever". They **go quiet**. Children often link sleep and death, so we avoid that.
- Endings are honest but gentle: Oppy's last dust storm is framed around what she achieved.
- Hardware is drawn to match the real spacecraft (Echo's 100 mirror cells, Oppy's camera-head eyes, Phoenix's round solar panels). The friendly faces are the storybook part.

## How it's built

- One self-contained `index.html`: HTML, CSS and vanilla JavaScript. No framework, no build step needed to run it.
- **All illustrations are drawn in code (SVG).** No photos, no AI-generated images.
- Sound effects are generated with the Web Audio API; narration uses the Web Speech API.
- Source is split in `src/` (`story.js` = all dialogue and mission facts, `art.js` = illustrations, `interactions.js`, `engine.js`, `style.css`). Run `python3 build.py` to rebuild `index.html`.
- Tested with automated browser screenshots of every scene at desktop, phone and phone-landscape sizes.

## NASA data used

Every fact, date and number comes from NASA sources:

- **NASA Space Science Data Coordinated Archive (NSSDCA):** mission records for the Apollo 11 Lunar Module (1969-059C), Lunar Roving Vehicle (1971-063C) and Apollo 12 ALSEP (1969-099C)
- **NASA Science mission pages:** Surveyor 3, Mars Pathfinder/Sojourner, Spirit and Opportunity, Viking 1, InSight, Ingenuity, Pioneer 10, Kepler, NEAR Shoemaker, Dawn
- **NASA/JPL news (2026):** Perseverance completing a marathon-distance drive on Mars, used in the finale

## Use of AI

The story text and code were written with help from Claude (Anthropic), an AI assistant. The team chose the concept, characters and missions, and reviewed every fact against the NASA sources above. No AI-generated images are used.

## References

- NSSDCA: https://nssdc.gsfc.nasa.gov/
- Apollo 11 Lunar Module: https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C
- Lunar Roving Vehicle: https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C
- Apollo 12 ALSEP: https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C
- Surveyor 3: https://science.nasa.gov/mission/surveyor-3/
- Mars Pathfinder: https://science.nasa.gov/mission/mars-pathfinder/
- Spirit and Opportunity: https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/
- Viking 1: https://science.nasa.gov/mission/viking-1/
- InSight: https://science.nasa.gov/mission/insight/
- Ingenuity: https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/
- Pioneer 10: https://science.nasa.gov/mission/pioneer-10/
- Kepler: https://science.nasa.gov/mission/kepler/
- NEAR Shoemaker: https://science.nasa.gov/mission/near-shoemaker/
- Dawn: https://science.nasa.gov/mission/dawn/
- Perseverance marathon (NASA/JPL, June 2026): https://www.jpl.nasa.gov/images/pia26726-nasas-hirise-captures-perseverance-marking-a-milestone-on-mars/
- Fonts: Fredoka and Nunito (Google Fonts, SIL Open Font License)
- Tools: HTML, CSS, JavaScript, SVG, Web Speech API, Web Audio API, Playwright (testing), Claude (AI assistant)

## Next steps

- Urdu version for Pakistani classrooms
- Real NASA orbital photos of each landing site inside the mission cards
- A short quiz at the end, and testing with real children

*Student project for the NASA Space Apps Challenge. Not endorsed by NASA.*
