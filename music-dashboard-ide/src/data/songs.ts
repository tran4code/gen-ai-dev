import { Track } from './types';

export const tracks: Track[] = [
  // Taylor Swift
  { id: 't01', name: 'Anti-Hero', artist: { id: 'a01', name: 'Taylor Swift' }, album: { id: 'al01', name: 'Midnights', imageUrl: '/images/album-placeholder.svg', releaseYear: 2022 }, duration_ms: 200690, popularity: 95, explicit: false, track_number: 3 },
  { id: 't02', name: 'Blank Space', artist: { id: 'a01', name: 'Taylor Swift' }, album: { id: 'al02', name: '1989', imageUrl: '/images/album-placeholder.svg', releaseYear: 2014 }, duration_ms: 231833, popularity: 90, explicit: false, track_number: 2 },
  { id: 't03', name: 'Shake It Off', artist: { id: 'a01', name: 'Taylor Swift' }, album: { id: 'al02', name: '1989', imageUrl: '/images/album-placeholder.svg', releaseYear: 2014 }, duration_ms: 219200, popularity: 88, explicit: false, track_number: 6 },
  { id: 't04', name: 'Cruel Summer', artist: { id: 'a01', name: 'Taylor Swift' }, album: { id: 'al03', name: 'Lover', imageUrl: '/images/album-placeholder.svg', releaseYear: 2019 }, duration_ms: 178427, popularity: 93, explicit: false, track_number: 2 },
  { id: 't05', name: 'Love Story', artist: { id: 'a01', name: 'Taylor Swift' }, album: { id: 'al04', name: 'Fearless', imageUrl: '/images/album-placeholder.svg', releaseYear: 2008 }, duration_ms: 235733, popularity: 85, explicit: false, track_number: 3 },
  { id: 't06', name: 'Lavender Haze', artist: { id: 'a01', name: 'Taylor Swift' }, album: { id: 'al01', name: 'Midnights', imageUrl: '/images/album-placeholder.svg', releaseYear: 2022 }, duration_ms: 202396, popularity: 82, explicit: false, track_number: 1 },
  { id: 't07', name: 'Karma', artist: { id: 'a01', name: 'Taylor Swift' }, album: { id: 'al01', name: 'Midnights', imageUrl: '/images/album-placeholder.svg', releaseYear: 2022 }, duration_ms: 204852, popularity: 80, explicit: false, track_number: 11 },

  // Drake
  { id: 't08', name: 'God\'s Plan', artist: { id: 'a02', name: 'Drake' }, album: { id: 'al05', name: 'Scorpion', imageUrl: '/images/album-placeholder.svg', releaseYear: 2018 }, duration_ms: 198973, popularity: 92, explicit: true, track_number: 5 },
  { id: 't09', name: 'Hotline Bling', artist: { id: 'a02', name: 'Drake' }, album: { id: 'al06', name: 'Views', imageUrl: '/images/album-placeholder.svg', releaseYear: 2016 }, duration_ms: 267067, popularity: 89, explicit: true, track_number: 15 },
  { id: 't10', name: 'One Dance', artist: { id: 'a02', name: 'Drake' }, album: { id: 'al06', name: 'Views', imageUrl: '/images/album-placeholder.svg', releaseYear: 2016 }, duration_ms: 173987, popularity: 87, explicit: true, track_number: 12 },
  { id: 't11', name: 'In My Feelings', artist: { id: 'a02', name: 'Drake' }, album: { id: 'al05', name: 'Scorpion', imageUrl: '/images/album-placeholder.svg', releaseYear: 2018 }, duration_ms: 217925, popularity: 84, explicit: true, track_number: 14 },
  { id: 't12', name: 'Started From the Bottom', artist: { id: 'a02', name: 'Drake' }, album: { id: 'al07', name: 'Nothing Was the Same', imageUrl: '/images/album-placeholder.svg', releaseYear: 2013 }, duration_ms: 177893, popularity: 82, explicit: true, track_number: 6 },

  // The Weeknd
  { id: 't13', name: 'Blinding Lights', artist: { id: 'a03', name: 'The Weeknd' }, album: { id: 'al08', name: 'After Hours', imageUrl: '/images/album-placeholder.svg', releaseYear: 2020 }, duration_ms: 200040, popularity: 96, explicit: false, track_number: 9 },
  { id: 't14', name: 'Starboy', artist: { id: 'a03', name: 'The Weeknd' }, album: { id: 'al09', name: 'Starboy', imageUrl: '/images/album-placeholder.svg', releaseYear: 2016 }, duration_ms: 230453, popularity: 91, explicit: true, track_number: 1 },
  { id: 't15', name: 'Save Your Tears', artist: { id: 'a03', name: 'The Weeknd' }, album: { id: 'al08', name: 'After Hours', imageUrl: '/images/album-placeholder.svg', releaseYear: 2020 }, duration_ms: 215627, popularity: 90, explicit: false, track_number: 11 },
  { id: 't16', name: 'Can\'t Feel My Face', artist: { id: 'a03', name: 'The Weeknd' }, album: { id: 'al10', name: 'Beauty Behind the Madness', imageUrl: '/images/album-placeholder.svg', releaseYear: 2015 }, duration_ms: 213520, popularity: 86, explicit: false, track_number: 5 },
  { id: 't17', name: 'The Hills', artist: { id: 'a03', name: 'The Weeknd' }, album: { id: 'al10', name: 'Beauty Behind the Madness', imageUrl: '/images/album-placeholder.svg', releaseYear: 2015 }, duration_ms: 242253, popularity: 85, explicit: true, track_number: 6 },
  { id: 't18', name: 'After Hours', artist: { id: 'a03', name: 'The Weeknd' }, album: { id: 'al08', name: 'After Hours', imageUrl: '/images/album-placeholder.svg', releaseYear: 2020 }, duration_ms: 361027, popularity: 83, explicit: true, track_number: 14 },

  // Billie Eilish
  { id: 't19', name: 'bad guy', artist: { id: 'a04', name: 'Billie Eilish' }, album: { id: 'al11', name: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?', imageUrl: '/images/album-placeholder.svg', releaseYear: 2019 }, duration_ms: 194088, popularity: 93, explicit: false, track_number: 2 },
  { id: 't20', name: 'Happier Than Ever', artist: { id: 'a04', name: 'Billie Eilish' }, album: { id: 'al12', name: 'Happier Than Ever', imageUrl: '/images/album-placeholder.svg', releaseYear: 2021 }, duration_ms: 298899, popularity: 86, explicit: true, track_number: 15 },
  { id: 't21', name: 'lovely', artist: { id: 'a04', name: 'Billie Eilish' }, album: { id: 'al11', name: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?', imageUrl: '/images/album-placeholder.svg', releaseYear: 2019 }, duration_ms: 200186, popularity: 88, explicit: false, track_number: 14 },
  { id: 't22', name: 'everything i wanted', artist: { id: 'a04', name: 'Billie Eilish' }, album: { id: 'al13', name: 'everything i wanted', imageUrl: '/images/album-placeholder.svg', releaseYear: 2019 }, duration_ms: 245426, popularity: 84, explicit: false, track_number: 1 },
  { id: 't23', name: 'ocean eyes', artist: { id: 'a04', name: 'Billie Eilish' }, album: { id: 'al14', name: 'dont smile at me', imageUrl: '/images/album-placeholder.svg', releaseYear: 2017 }, duration_ms: 200107, popularity: 82, explicit: false, track_number: 4 },

  // Ed Sheeran
  { id: 't24', name: 'Shape of You', artist: { id: 'a05', name: 'Ed Sheeran' }, album: { id: 'al15', name: '÷', imageUrl: '/images/album-placeholder.svg', releaseYear: 2017 }, duration_ms: 233713, popularity: 94, explicit: false, track_number: 4 },
  { id: 't25', name: 'Perfect', artist: { id: 'a05', name: 'Ed Sheeran' }, album: { id: 'al15', name: '÷', imageUrl: '/images/album-placeholder.svg', releaseYear: 2017 }, duration_ms: 263400, popularity: 91, explicit: false, track_number: 5 },
  { id: 't26', name: 'Thinking Out Loud', artist: { id: 'a05', name: 'Ed Sheeran' }, album: { id: 'al16', name: 'x', imageUrl: '/images/album-placeholder.svg', releaseYear: 2014 }, duration_ms: 281560, popularity: 87, explicit: false, track_number: 7 },
  { id: 't27', name: 'Photograph', artist: { id: 'a05', name: 'Ed Sheeran' }, album: { id: 'al16', name: 'x', imageUrl: '/images/album-placeholder.svg', releaseYear: 2014 }, duration_ms: 258987, popularity: 83, explicit: false, track_number: 10 },
  { id: 't28', name: 'Castle on the Hill', artist: { id: 'a05', name: 'Ed Sheeran' }, album: { id: 'al15', name: '÷', imageUrl: '/images/album-placeholder.svg', releaseYear: 2017 }, duration_ms: 261154, popularity: 80, explicit: false, track_number: 2 },

  // Dua Lipa
  { id: 't29', name: 'Levitating', artist: { id: 'a06', name: 'Dua Lipa' }, album: { id: 'al17', name: 'Future Nostalgia', imageUrl: '/images/album-placeholder.svg', releaseYear: 2020 }, duration_ms: 203064, popularity: 92, explicit: false, track_number: 5 },
  { id: 't30', name: 'Don\'t Start Now', artist: { id: 'a06', name: 'Dua Lipa' }, album: { id: 'al17', name: 'Future Nostalgia', imageUrl: '/images/album-placeholder.svg', releaseYear: 2020 }, duration_ms: 183290, popularity: 89, explicit: false, track_number: 3 },
  { id: 't31', name: 'New Rules', artist: { id: 'a06', name: 'Dua Lipa' }, album: { id: 'al18', name: 'Dua Lipa', imageUrl: '/images/album-placeholder.svg', releaseYear: 2017 }, duration_ms: 209320, popularity: 86, explicit: false, track_number: 10 },
  { id: 't32', name: 'Physical', artist: { id: 'a06', name: 'Dua Lipa' }, album: { id: 'al17', name: 'Future Nostalgia', imageUrl: '/images/album-placeholder.svg', releaseYear: 2020 }, duration_ms: 193829, popularity: 81, explicit: false, track_number: 4 },

  // Kendrick Lamar
  { id: 't33', name: 'HUMBLE.', artist: { id: 'a07', name: 'Kendrick Lamar' }, album: { id: 'al19', name: 'DAMN.', imageUrl: '/images/album-placeholder.svg', releaseYear: 2017 }, duration_ms: 177000, popularity: 91, explicit: true, track_number: 8 },
  { id: 't34', name: 'DNA.', artist: { id: 'a07', name: 'Kendrick Lamar' }, album: { id: 'al19', name: 'DAMN.', imageUrl: '/images/album-placeholder.svg', releaseYear: 2017 }, duration_ms: 185493, popularity: 86, explicit: true, track_number: 2 },
  { id: 't35', name: 'Swimming Pools', artist: { id: 'a07', name: 'Kendrick Lamar' }, album: { id: 'al20', name: 'good kid, m.A.A.d city', imageUrl: '/images/album-placeholder.svg', releaseYear: 2012 }, duration_ms: 313627, popularity: 83, explicit: true, track_number: 8 },
  { id: 't36', name: 'Money Trees', artist: { id: 'a07', name: 'Kendrick Lamar' }, album: { id: 'al20', name: 'good kid, m.A.A.d city', imageUrl: '/images/album-placeholder.svg', releaseYear: 2012 }, duration_ms: 393373, popularity: 85, explicit: true, track_number: 5 },
  { id: 't37', name: 'LOYALTY.', artist: { id: 'a07', name: 'Kendrick Lamar' }, album: { id: 'al19', name: 'DAMN.', imageUrl: '/images/album-placeholder.svg', releaseYear: 2017 }, duration_ms: 213400, popularity: 79, explicit: true, track_number: 7 },

  // Ariana Grande
  { id: 't38', name: 'thank u, next', artist: { id: 'a08', name: 'Ariana Grande' }, album: { id: 'al21', name: 'thank u, next', imageUrl: '/images/album-placeholder.svg', releaseYear: 2019 }, duration_ms: 207333, popularity: 90, explicit: true, track_number: 1 },
  { id: 't39', name: '7 rings', artist: { id: 'a08', name: 'Ariana Grande' }, album: { id: 'al21', name: 'thank u, next', imageUrl: '/images/album-placeholder.svg', releaseYear: 2019 }, duration_ms: 178627, popularity: 88, explicit: true, track_number: 5 },
  { id: 't40', name: 'positions', artist: { id: 'a08', name: 'Ariana Grande' }, album: { id: 'al22', name: 'Positions', imageUrl: '/images/album-placeholder.svg', releaseYear: 2020 }, duration_ms: 172652, popularity: 84, explicit: true, track_number: 1 },
  { id: 't41', name: 'no tears left to cry', artist: { id: 'a08', name: 'Ariana Grande' }, album: { id: 'al23', name: 'Sweetener', imageUrl: '/images/album-placeholder.svg', releaseYear: 2018 }, duration_ms: 205280, popularity: 82, explicit: false, track_number: 1 },
  { id: 't42', name: 'Into You', artist: { id: 'a08', name: 'Ariana Grande' }, album: { id: 'al24', name: 'Dangerous Woman', imageUrl: '/images/album-placeholder.svg', releaseYear: 2016 }, duration_ms: 244267, popularity: 80, explicit: false, track_number: 4 },

  // Post Malone
  { id: 't43', name: 'Sunflower', artist: { id: 'a09', name: 'Post Malone' }, album: { id: 'al25', name: 'Hollywood\'s Bleeding', imageUrl: '/images/album-placeholder.svg', releaseYear: 2019 }, duration_ms: 158040, popularity: 93, explicit: false, track_number: 3 },
  { id: 't44', name: 'Circles', artist: { id: 'a09', name: 'Post Malone' }, album: { id: 'al25', name: 'Hollywood\'s Bleeding', imageUrl: '/images/album-placeholder.svg', releaseYear: 2019 }, duration_ms: 215280, popularity: 90, explicit: false, track_number: 6 },
  { id: 't45', name: 'rockstar', artist: { id: 'a09', name: 'Post Malone' }, album: { id: 'al26', name: 'beerbongs & bentleys', imageUrl: '/images/album-placeholder.svg', releaseYear: 2018 }, duration_ms: 218147, popularity: 87, explicit: true, track_number: 12 },
  { id: 't46', name: 'Congratulations', artist: { id: 'a09', name: 'Post Malone' }, album: { id: 'al27', name: 'Stoney', imageUrl: '/images/album-placeholder.svg', releaseYear: 2016 }, duration_ms: 220293, popularity: 84, explicit: true, track_number: 7 },
  { id: 't47', name: 'Better Now', artist: { id: 'a09', name: 'Post Malone' }, album: { id: 'al26', name: 'beerbongs & bentleys', imageUrl: '/images/album-placeholder.svg', releaseYear: 2018 }, duration_ms: 231267, popularity: 82, explicit: true, track_number: 5 },

  // BTS
  { id: 't48', name: 'Dynamite', artist: { id: 'a10', name: 'BTS' }, album: { id: 'al28', name: 'BE', imageUrl: '/images/album-placeholder.svg', releaseYear: 2020 }, duration_ms: 199054, popularity: 91, explicit: false, track_number: 7 },
  { id: 't49', name: 'Butter', artist: { id: 'a10', name: 'BTS' }, album: { id: 'al29', name: 'Butter', imageUrl: '/images/album-placeholder.svg', releaseYear: 2021 }, duration_ms: 164442, popularity: 87, explicit: false, track_number: 1 },
  { id: 't50', name: 'Boy With Luv', artist: { id: 'a10', name: 'BTS' }, album: { id: 'al30', name: 'MAP OF THE SOUL: PERSONA', imageUrl: '/images/album-placeholder.svg', releaseYear: 2019 }, duration_ms: 229773, popularity: 84, explicit: false, track_number: 1 },
  { id: 't51', name: 'Permission to Dance', artist: { id: 'a10', name: 'BTS' }, album: { id: 'al29', name: 'Butter', imageUrl: '/images/album-placeholder.svg', releaseYear: 2021 }, duration_ms: 187573, popularity: 80, explicit: false, track_number: 2 },

  // Harry Styles
  { id: 't52', name: 'As It Was', artist: { id: 'a11', name: 'Harry Styles' }, album: { id: 'al31', name: "Harry's House", imageUrl: '/images/album-placeholder.svg', releaseYear: 2022 }, duration_ms: 167303, popularity: 94, explicit: false, track_number: 4 },
  { id: 't53', name: 'Watermelon Sugar', artist: { id: 'a11', name: 'Harry Styles' }, album: { id: 'al32', name: 'Fine Line', imageUrl: '/images/album-placeholder.svg', releaseYear: 2019 }, duration_ms: 174000, popularity: 89, explicit: false, track_number: 7 },
  { id: 't54', name: 'Adore You', artist: { id: 'a11', name: 'Harry Styles' }, album: { id: 'al32', name: 'Fine Line', imageUrl: '/images/album-placeholder.svg', releaseYear: 2019 }, duration_ms: 207133, popularity: 85, explicit: false, track_number: 5 },
  { id: 't55', name: 'Late Night Talking', artist: { id: 'a11', name: 'Harry Styles' }, album: { id: 'al31', name: "Harry's House", imageUrl: '/images/album-placeholder.svg', releaseYear: 2022 }, duration_ms: 177893, popularity: 82, explicit: false, track_number: 2 },

  // SZA
  { id: 't56', name: 'Kill Bill', artist: { id: 'a12', name: 'SZA' }, album: { id: 'al33', name: 'SOS', imageUrl: '/images/album-placeholder.svg', releaseYear: 2022 }, duration_ms: 153947, popularity: 93, explicit: true, track_number: 1 },
  { id: 't57', name: 'Snooze', artist: { id: 'a12', name: 'SZA' }, album: { id: 'al33', name: 'SOS', imageUrl: '/images/album-placeholder.svg', releaseYear: 2022 }, duration_ms: 201800, popularity: 88, explicit: true, track_number: 7 },
  { id: 't58', name: 'Good Days', artist: { id: 'a12', name: 'SZA' }, album: { id: 'al34', name: 'Good Days', imageUrl: '/images/album-placeholder.svg', releaseYear: 2020 }, duration_ms: 279204, popularity: 84, explicit: true, track_number: 1 },
  { id: 't59', name: 'Love Galore', artist: { id: 'a12', name: 'SZA' }, album: { id: 'al35', name: 'Ctrl', imageUrl: '/images/album-placeholder.svg', releaseYear: 2017 }, duration_ms: 275200, popularity: 81, explicit: true, track_number: 2 },

  // Bad Bunny
  { id: 't60', name: 'Tití Me Preguntó', artist: { id: 'a13', name: 'Bad Bunny' }, album: { id: 'al36', name: 'Un Verano Sin Ti', imageUrl: '/images/album-placeholder.svg', releaseYear: 2022 }, duration_ms: 241667, popularity: 91, explicit: true, track_number: 4 },
  { id: 't61', name: 'Me Porto Bonito', artist: { id: 'a13', name: 'Bad Bunny' }, album: { id: 'al36', name: 'Un Verano Sin Ti', imageUrl: '/images/album-placeholder.svg', releaseYear: 2022 }, duration_ms: 178427, popularity: 88, explicit: true, track_number: 8 },
  { id: 't62', name: 'Dakiti', artist: { id: 'a13', name: 'Bad Bunny' }, album: { id: 'al37', name: 'EL ÚLTIMO TOUR DEL MUNDO', imageUrl: '/images/album-placeholder.svg', releaseYear: 2020 }, duration_ms: 205093, popularity: 86, explicit: true, track_number: 3 },
  { id: 't63', name: 'Yonaguni', artist: { id: 'a13', name: 'Bad Bunny' }, album: { id: 'al38', name: 'Yonaguni', imageUrl: '/images/album-placeholder.svg', releaseYear: 2021 }, duration_ms: 213100, popularity: 83, explicit: true, track_number: 1 },

  // Olivia Rodrigo
  { id: 't64', name: 'drivers license', artist: { id: 'a14', name: 'Olivia Rodrigo' }, album: { id: 'al39', name: 'SOUR', imageUrl: '/images/album-placeholder.svg', releaseYear: 2021 }, duration_ms: 242014, popularity: 90, explicit: true, track_number: 3 },
  { id: 't65', name: 'good 4 u', artist: { id: 'a14', name: 'Olivia Rodrigo' }, album: { id: 'al39', name: 'SOUR', imageUrl: '/images/album-placeholder.svg', releaseYear: 2021 }, duration_ms: 178147, popularity: 88, explicit: true, track_number: 6 },
  { id: 't66', name: 'vampire', artist: { id: 'a14', name: 'Olivia Rodrigo' }, album: { id: 'al40', name: 'GUTS', imageUrl: '/images/album-placeholder.svg', releaseYear: 2023 }, duration_ms: 219724, popularity: 86, explicit: true, track_number: 1 },
  { id: 't67', name: 'deja vu', artist: { id: 'a14', name: 'Olivia Rodrigo' }, album: { id: 'al39', name: 'SOUR', imageUrl: '/images/album-placeholder.svg', releaseYear: 2021 }, duration_ms: 215320, popularity: 83, explicit: true, track_number: 5 },

  // Doja Cat
  { id: 't68', name: 'Say So', artist: { id: 'a15', name: 'Doja Cat' }, album: { id: 'al41', name: 'Hot Pink', imageUrl: '/images/album-placeholder.svg', releaseYear: 2019 }, duration_ms: 237893, popularity: 87, explicit: true, track_number: 5 },
  { id: 't69', name: 'Kiss Me More', artist: { id: 'a15', name: 'Doja Cat' }, album: { id: 'al42', name: 'Planet Her', imageUrl: '/images/album-placeholder.svg', releaseYear: 2021 }, duration_ms: 208867, popularity: 86, explicit: true, track_number: 5 },
  { id: 't70', name: 'Need to Know', artist: { id: 'a15', name: 'Doja Cat' }, album: { id: 'al42', name: 'Planet Her', imageUrl: '/images/album-placeholder.svg', releaseYear: 2021 }, duration_ms: 210613, popularity: 83, explicit: true, track_number: 3 },
  { id: 't71', name: 'Woman', artist: { id: 'a15', name: 'Doja Cat' }, album: { id: 'al42', name: 'Planet Her', imageUrl: '/images/album-placeholder.svg', releaseYear: 2021 }, duration_ms: 172627, popularity: 80, explicit: true, track_number: 6 },

  // Adele
  { id: 't72', name: 'Easy On Me', artist: { id: 'a16', name: 'Adele' }, album: { id: 'al43', name: '30', imageUrl: '/images/album-placeholder.svg', releaseYear: 2021 }, duration_ms: 224695, popularity: 89, explicit: false, track_number: 3 },
  { id: 't73', name: 'Rolling in the Deep', artist: { id: 'a16', name: 'Adele' }, album: { id: 'al44', name: '21', imageUrl: '/images/album-placeholder.svg', releaseYear: 2011 }, duration_ms: 228293, popularity: 87, explicit: false, track_number: 1 },
  { id: 't74', name: 'Someone Like You', artist: { id: 'a16', name: 'Adele' }, album: { id: 'al44', name: '21', imageUrl: '/images/album-placeholder.svg', releaseYear: 2011 }, duration_ms: 285240, popularity: 85, explicit: false, track_number: 11 },
  { id: 't75', name: 'Hello', artist: { id: 'a16', name: 'Adele' }, album: { id: 'al45', name: '25', imageUrl: '/images/album-placeholder.svg', releaseYear: 2015 }, duration_ms: 295502, popularity: 84, explicit: false, track_number: 1 },
  { id: 't76', name: 'Set Fire to the Rain', artist: { id: 'a16', name: 'Adele' }, album: { id: 'al44', name: '21', imageUrl: '/images/album-placeholder.svg', releaseYear: 2011 }, duration_ms: 242946, popularity: 82, explicit: false, track_number: 4 },

  // Bruno Mars
  { id: 't77', name: 'Uptown Funk', artist: { id: 'a17', name: 'Bruno Mars' }, album: { id: 'al46', name: 'Uptown Special', imageUrl: '/images/album-placeholder.svg', releaseYear: 2015 }, duration_ms: 269333, popularity: 90, explicit: false, track_number: 4 },
  { id: 't78', name: 'Just the Way You Are', artist: { id: 'a17', name: 'Bruno Mars' }, album: { id: 'al47', name: 'Doo-Wops & Hooligans', imageUrl: '/images/album-placeholder.svg', releaseYear: 2010 }, duration_ms: 220867, popularity: 85, explicit: false, track_number: 2 },
  { id: 't79', name: '24K Magic', artist: { id: 'a17', name: 'Bruno Mars' }, album: { id: 'al48', name: '24K Magic', imageUrl: '/images/album-placeholder.svg', releaseYear: 2016 }, duration_ms: 226907, popularity: 84, explicit: false, track_number: 1 },
  { id: 't80', name: 'That\'s What I Like', artist: { id: 'a17', name: 'Bruno Mars' }, album: { id: 'al48', name: '24K Magic', imageUrl: '/images/album-placeholder.svg', releaseYear: 2016 }, duration_ms: 206693, popularity: 83, explicit: false, track_number: 5 },

  // Imagine Dragons
  { id: 't81', name: 'Believer', artist: { id: 'a18', name: 'Imagine Dragons' }, album: { id: 'al49', name: 'Evolve', imageUrl: '/images/album-placeholder.svg', releaseYear: 2017 }, duration_ms: 204347, popularity: 88, explicit: false, track_number: 4 },
  { id: 't82', name: 'Radioactive', artist: { id: 'a18', name: 'Imagine Dragons' }, album: { id: 'al50', name: 'Night Visions', imageUrl: '/images/album-placeholder.svg', releaseYear: 2012 }, duration_ms: 186813, popularity: 85, explicit: false, track_number: 1 },
  { id: 't83', name: 'Thunder', artist: { id: 'a18', name: 'Imagine Dragons' }, album: { id: 'al49', name: 'Evolve', imageUrl: '/images/album-placeholder.svg', releaseYear: 2017 }, duration_ms: 187147, popularity: 84, explicit: false, track_number: 9 },
  { id: 't84', name: 'Demons', artist: { id: 'a18', name: 'Imagine Dragons' }, album: { id: 'al50', name: 'Night Visions', imageUrl: '/images/album-placeholder.svg', releaseYear: 2012 }, duration_ms: 177307, popularity: 83, explicit: false, track_number: 4 },
  { id: 't85', name: 'Natural', artist: { id: 'a18', name: 'Imagine Dragons' }, album: { id: 'al51', name: 'Origins', imageUrl: '/images/album-placeholder.svg', releaseYear: 2018 }, duration_ms: 189467, popularity: 81, explicit: false, track_number: 1 },

  // Lana Del Rey
  { id: 't86', name: 'Summertime Sadness', artist: { id: 'a19', name: 'Lana Del Rey' }, album: { id: 'al52', name: 'Born to Die', imageUrl: '/images/album-placeholder.svg', releaseYear: 2012 }, duration_ms: 265867, popularity: 86, explicit: false, track_number: 9 },
  { id: 't87', name: 'Young and Beautiful', artist: { id: 'a19', name: 'Lana Del Rey' }, album: { id: 'al53', name: 'The Great Gatsby', imageUrl: '/images/album-placeholder.svg', releaseYear: 2013 }, duration_ms: 236267, popularity: 82, explicit: false, track_number: 6 },
  { id: 't88', name: 'Video Games', artist: { id: 'a19', name: 'Lana Del Rey' }, album: { id: 'al52', name: 'Born to Die', imageUrl: '/images/album-placeholder.svg', releaseYear: 2012 }, duration_ms: 283640, popularity: 80, explicit: false, track_number: 3 },
  { id: 't89', name: 'West Coast', artist: { id: 'a19', name: 'Lana Del Rey' }, album: { id: 'al54', name: 'Ultraviolence', imageUrl: '/images/album-placeholder.svg', releaseYear: 2014 }, duration_ms: 257733, popularity: 78, explicit: false, track_number: 5 },

  // Khalid
  { id: 't90', name: 'Location', artist: { id: 'a20', name: 'Khalid' }, album: { id: 'al55', name: 'American Teen', imageUrl: '/images/album-placeholder.svg', releaseYear: 2017 }, duration_ms: 219773, popularity: 83, explicit: false, track_number: 2 },
  { id: 't91', name: 'Young Dumb & Broke', artist: { id: 'a20', name: 'Khalid' }, album: { id: 'al55', name: 'American Teen', imageUrl: '/images/album-placeholder.svg', releaseYear: 2017 }, duration_ms: 203307, popularity: 82, explicit: false, track_number: 4 },
  { id: 't92', name: 'Talk', artist: { id: 'a20', name: 'Khalid' }, album: { id: 'al56', name: 'Free Spirit', imageUrl: '/images/album-placeholder.svg', releaseYear: 2019 }, duration_ms: 197867, popularity: 80, explicit: false, track_number: 3 },

  // Rihanna
  { id: 't93', name: 'Umbrella', artist: { id: 'a21', name: 'Rihanna' }, album: { id: 'al57', name: 'Good Girl Gone Bad', imageUrl: '/images/album-placeholder.svg', releaseYear: 2007 }, duration_ms: 275573, popularity: 84, explicit: false, track_number: 2 },
  { id: 't94', name: 'We Found Love', artist: { id: 'a21', name: 'Rihanna' }, album: { id: 'al58', name: 'Talk That Talk', imageUrl: '/images/album-placeholder.svg', releaseYear: 2011 }, duration_ms: 215307, popularity: 82, explicit: false, track_number: 1 },
  { id: 't95', name: 'Diamonds', artist: { id: 'a21', name: 'Rihanna' }, album: { id: 'al59', name: 'Unapologetic', imageUrl: '/images/album-placeholder.svg', releaseYear: 2012 }, duration_ms: 225253, popularity: 83, explicit: false, track_number: 1 },
  { id: 't96', name: 'Stay', artist: { id: 'a21', name: 'Rihanna' }, album: { id: 'al59', name: 'Unapologetic', imageUrl: '/images/album-placeholder.svg', releaseYear: 2012 }, duration_ms: 240067, popularity: 81, explicit: false, track_number: 5 },
  { id: 't97', name: 'Work', artist: { id: 'a21', name: 'Rihanna' }, album: { id: 'al60', name: 'ANTI', imageUrl: '/images/album-placeholder.svg', releaseYear: 2016 }, duration_ms: 219320, popularity: 84, explicit: true, track_number: 4 },

  // Coldplay
  { id: 't98', name: 'Yellow', artist: { id: 'a22', name: 'Coldplay' }, album: { id: 'al61', name: 'Parachutes', imageUrl: '/images/album-placeholder.svg', releaseYear: 2000 }, duration_ms: 266773, popularity: 84, explicit: false, track_number: 4 },
  { id: 't99', name: 'The Scientist', artist: { id: 'a22', name: 'Coldplay' }, album: { id: 'al62', name: 'A Rush of Blood to the Head', imageUrl: '/images/album-placeholder.svg', releaseYear: 2002 }, duration_ms: 309200, popularity: 85, explicit: false, track_number: 4 },
  { id: 't100', name: 'Fix You', artist: { id: 'a22', name: 'Coldplay' }, album: { id: 'al63', name: 'X&Y', imageUrl: '/images/album-placeholder.svg', releaseYear: 2005 }, duration_ms: 296440, popularity: 86, explicit: false, track_number: 4 },
  { id: 't101', name: 'Viva la Vida', artist: { id: 'a22', name: 'Coldplay' }, album: { id: 'al64', name: 'Viva la Vida', imageUrl: '/images/album-placeholder.svg', releaseYear: 2008 }, duration_ms: 242280, popularity: 87, explicit: false, track_number: 7 },
  { id: 't102', name: 'Something Just Like This', artist: { id: 'a22', name: 'Coldplay' }, album: { id: 'al65', name: 'A Head Full of Dreams', imageUrl: '/images/album-placeholder.svg', releaseYear: 2017 }, duration_ms: 247160, popularity: 85, explicit: false, track_number: 14 },
];

export const uniqueArtists = [...new Set(tracks.map(t => t.artist.name))];
export const uniqueAlbums = [...new Map(tracks.map(t => [t.album.id, t.album])).values()];
