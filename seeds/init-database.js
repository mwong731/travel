
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('attractioncomment').del()
    .then(function () {
      console.log('1');
      return knex('bookmark').del();
    }).then(function () {
      console.log('3');
      return knex('attractioninplan').del();
    }).then(function () {
      console.log('4');
      return knex('plan').del();
    }).then(function () {
      console.log('5.5');
      return knex('attractionimage').del();
    }).then(function () {
      console.log('5');
      return knex('attraction').del();
    }).then(function () {
      console.log('6');
      return knex('city').del();
    }).then(function () {
      console.log('7');
      return knex('users').del();
    }).then(function () {
      console.log('8');
      return knex('users').insert([
        { email: "userman1@gmail.com", password: '123', facebookid: '', googleid: '', name: 'userman1', gender: "Male", birthday: new Date(), usertype: "user", image: "" },
        { email: "userman2@gmail.com", password: '123', facebookid: '', googleid: '', name: 'userman2', gender: "Female", birthday: new Date(), usertype: "user", image: "" },
        { email: "userman3@gmail.com", password: '123', facebookid: '', googleid: '', name: 'userman3', gender: "Female", birthday: new Date(), usertype: "user", image: "" },
        { email: "userman4@gmail.com", password: '123', facebookid: '', googleid: '', name: 'userman4', gender: "Female", birthday: new Date(), usertype: "user", image: "" }

      ]);
    }).then(function () {
      console.log('9');
      return knex('city').insert([
        { name: "Hong Kong", description: "Hong Kong (Chinese: 香港; pronunciation in Hong Kong Cantonese: [hœ́ːŋ.kɔ̌ːŋ] (About this soundlisten)), officially the Hong Kong Special Administrative Region of the People's Republic of China, is a special administrative region on the eastern side of the Pearl River estuary in southern China. With over 7.4 million people of various nationalities[c] in a 1,104-square-kilometre (426 sq mi) territory, Hong Kong is the world's fourth-most-densely-populated region.", latitude: 22.28552, longitude: 114.15769, image: '/assets/banner.png' },
        { name: "Osaka", description: "Osaka (大阪市 Ōsaka-shi) (Japanese pronunciation: [oːsaka]; About this soundlisten (help·info)) is a designated city in the Kansai region of Japan. It is the capital city of Osaka Prefecture and the largest component of the Keihanshin Metropolitan Area, the second largest metropolitan area in Japan and among the largest in the world with over 19 million inhabitants. Osaka will host Expo 2025. The current mayor of Osaka is Hirohumi Yoshimura.", latitude: 34.652500, longitude: 135.506302, image: '/assets/banner.png' },
        { name: "Tokyo", description: "Tokyo (東京 Tōkyō, /ˈtoʊkioʊ/;[8] Japanese: [toːkʲoː] (About this soundlisten)), officially Tokyo Metropolis (東京都 Tōkyō-to), one of the 47 prefectures of Japan, has served as the Japanese capital since 1869.[9][10] As of 2014 the Greater Tokyo Area ranked as the most populous metropolitan area in the world.[4] The urban area houses the seat of the Emperor of Japan, of the Japanese government and of the National Diet. Tokyo forms part of the Kantō region on the southeastern side of Japan's main island, Honshu, and includes the Izu Islands and Ogasawara Islands.[11] Tokyo was formerly named Edo when Shōgun Tokugawa Ieyasu made the city as his headquarters in 1603. It became the capital after Emperor Meiji moved his seat to the city from Kyoto in 1868; at that time Edo was renamed Tokyo. Tokyo Metropolis formed in 1943 from the merger of the former Tokyo Prefecture (東京府 Tōkyō-fu) and the city of Tokyo (東京市 Tōkyō-shi).", latitude: 35.652832, longitude: 139.839478, image: '/assets/banner.png' }
      ]);
    }).then(function () {
      console.log('10');
      return knex('attraction').insert([
        { cityid: 1, userid: 1, type: "shop", name: 'shop1', description: 'description1', latitude: "22.313235", longitude: "114.041271", confirmstatus: "accept" },
        { cityid: 1, userid: 1, type: "restaurant", name: 'restaurant1', description: 'description2', latitude: "344.1233", longitude: "50.1231", confirmstatus: "accept" },
        { cityid: 1, userid: 1, type: "sleep", name: 'sleep1', description: 'description3', latitude: "44.338383", longitude: "34.92828", confirmstatus: "accept" },
        { cityid: 2, userid: 1, type: "restaurant", name: 'restaurant2', description: 'description4', latitude: "22.313235", longitude: "114.041271", confirmstatus: "accept" },
        { cityid: 3, userid: 1, type: "go", name: 'go1', description: 'description5', latitude: "393.292919", longitude: "114.041271", confirmstatus: "accept" },
        { cityid: 1, userid: 1, type: "go", name: 'go2', description: 'description4', latitude: "44.338383", longitude: "34.92828", confirmstatus: "accept" },
        { cityid: 1, userid: 1, type: "go", name: 'go2', description: 'description4', latitude: "44.338383", longitude: "34.92828", confirmstatus: "accept" },
      ]);
    }).then(function () {
      console.log('10.5');
      return knex('attractionimage').insert([
        { attractionid: 1, image: '/assets/banner.png' },
        { attractionid: 1, image: '/assets/banner.png' },
        { attractionid: 1, image: '/assets/banner.png' },
        { attractionid: 1, image: '/assets/banner.png' },
        { attractionid: 1, image: '/assets/banner.png' },
      ]);
    }).then(function () {
      console.log('11');
      return knex('plan').insert([
        { userid: 1, name: 'plan1' },
        { userid: 2, name: 'plan2' },
      ]);
    }).then(function () {
      console.log('12');
      return knex('attractioninplan').insert([
        { planid: 1, attractionid: 1, date: new Date(), time: "day" },
        { planid: 1, attractionid: 2, date: new Date(), time: "night" },
        { planid: 1, attractionid: 3, date: new Date(), time: "night" },
        { planid: 1, attractionid: 4, date: new Date(), time: "night" }
      ]);
    }).then(function () {
      console.log('14');
      return knex('bookmark').insert([
        { userid: 1, attractionid: 1 },
        { userid: 1, attractionid: 2 },
        { userid: 1, attractionid: 3 },
        { userid: 1, attractionid: 4 },
        { userid: 1, attractionid: 5 },

        { userid: 2, attractionid: 2 },
        { userid: 2, attractionid: 3 },

        { userid: 3, attractionid: 2 },
        { userid: 3, attractionid: 4 },
        { userid: 3, attractionid: 1 },

        { userid: 4, attractionid: 1 },
        { userid: 4, attractionid: 2 },
        { userid: 4, attractionid: 5 },
      ]);
    }).then(function () {
      console.log('15');
      return knex('attractioncomment').insert([
        { userid: 1, attractionid: 1, comment: 'i will give rate 5', rate: 5 },


        { userid: 2, attractionid: 2, comment: 'it is low rate', rate: 1 },


        { userid: 3, attractionid: 2, comment: 'it is low rate', rate: 3 },


        { userid: 4, attractionid: 3, comment: 'it is low rate', rate: 3 },
      ]);
    });

};
