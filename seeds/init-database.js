
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('attractioncomment').del()
    .then(function () {
      return knex('bookmark').del();
    }).then(function (){
      return knex('usersubmitattraction').del();
    }).then(function (){
      return knex('attractioninplan').del();
    }).then(function (){
      return knex('plan').del();
    }).then(function (){
      return knex('attraction').del();
    }).then(function (){
      return knex('city').del();
    }).then(function (){
      return knex('users').del();
    }).then(function (){
      return knex('users').insert([
        { id: 1, email: "userman1@gmail.com", password: '123', usertype: "user", gender: "m", age: 18, facebookid: '', googleid: '' },
        { id: 2, email: "adminwoman1@hotmail.com", password: '123', usertype: "admin", gender: "f", age: 23, facebookid: '', googleid: '' },
        { id: 3, email: "userother1@rockmail.com", password: '123', usertype: "user", gender: "other", age: 23, facebookid: '', googleid: '' },
        { id: 4, email: "userother1@rockmail.com", password: '123', usertype: "user", gender: "other", age: 23, facebookid: '', googleid: '' }
      ]);
    }).then(function (){
      return knex('city').insert([
        { id: 1, name: "Hong Kong", description: "Hong Kong (Chinese: 香港; pronunciation in Hong Kong Cantonese: [hœ́ːŋ.kɔ̌ːŋ] (About this soundlisten)), officially the Hong Kong Special Administrative Region of the People's Republic of China, is a special administrative region on the eastern side of the Pearl River estuary in southern China. With over 7.4 million people of various nationalities[c] in a 1,104-square-kilometre (426 sq mi) territory, Hong Kong is the world's fourth-most-densely-populated region.", latitude: 22.28552, longitude: 114.15769, image: '' },
        { id: 2, name: "Osaka", description: "Osaka (大阪市 Ōsaka-shi) (Japanese pronunciation: [oːsaka]; About this soundlisten (help·info)) is a designated city in the Kansai region of Japan. It is the capital city of Osaka Prefecture and the largest component of the Keihanshin Metropolitan Area, the second largest metropolitan area in Japan and among the largest in the world with over 19 million inhabitants. Osaka will host Expo 2025. The current mayor of Osaka is Hirohumi Yoshimura.", latitude: 34.652500, longitude: 135.506302, image: '' },
        { id: 3, name: "Tokyo", description: "Tokyo (東京 Tōkyō, /ˈtoʊkioʊ/;[8] Japanese: [toːkʲoː] (About this soundlisten)), officially Tokyo Metropolis (東京都 Tōkyō-to), one of the 47 prefectures of Japan, has served as the Japanese capital since 1869.[9][10] As of 2014 the Greater Tokyo Area ranked as the most populous metropolitan area in the world.[4] The urban area houses the seat of the Emperor of Japan, of the Japanese government and of the National Diet. Tokyo forms part of the Kantō region on the southeastern side of Japan's main island, Honshu, and includes the Izu Islands and Ogasawara Islands.[11] Tokyo was formerly named Edo when Shōgun Tokugawa Ieyasu made the city as his headquarters in 1603. It became the capital after Emperor Meiji moved his seat to the city from Kyoto in 1868; at that time Edo was renamed Tokyo. Tokyo Metropolis formed in 1943 from the merger of the former Tokyo Prefecture (東京府 Tōkyō-fu) and the city of Tokyo (東京市 Tōkyō-shi).", latitude: 35.652832, longitude: 139.839478, image: '' }
      ]);
    }).then(function (){
      return knex('attraction').insert([
        { id: 1, cityid: 1, type: "shop", latitude: "22.313235", longitude: "114.041271", image: "" },
        { id: 2, cityid: 1, type: "restaurant", latitude: "344.1233", longitude: "50.1231", image: "" },
        { id: 3, cityid: 1, type: "sleep", latitude: "44.338383", longitude: "34.92828", image: "" },
        { id: 4, cityid: 2, type: "restaurant", latitude: "22.313235", longitude: "114.041271", image: "" },
        { id: 5, cityid: 3, type: "go", latitude: "393.292919", longitude: "114.041271", image: "" }
      ]);
    }).then(function (){
      return knex('plan').insert([
        { id: 1, userid: 1, name: 'plan1' },
        { id: 2, userid: 4, name: 'plan2' },
      ]);
    }).then(function (){
      return knex('attractioninplan').insert([
        { id: 1, planid: 1, attractionid: 1, date: new Date(), time: "day" },
        { id: 2, planid: 1, attractionid: 2, date: new Date(), time: "night" },
        { id: 3, planid: 1, attractionid: 3, date: new Date(), time: "night" },
        { id: 4, planid: 1, attractionid: 4, date: new Date(), time: "night" }
      ]);
    }).then(function (){
      return knex('usersubmitattraction').insert([
        { cityid: 1, type: "shop", latitude: "22.313235", longitude: "114.041271", image: "", confirmstatus: "wait" },
        { cityid: 2, type: "restaurant", latitude: "22.313235", longitude: "114.041271", image: "", confirmstatus: "accept" },
        { cityid: 3, type: "sleep", latitude: "22.313235", longitude: "114.041271", image: "", confirmstatus: "accept" },
        { cityid: 2, type: "go", latitude: "22.313235", longitude: "114.041271", image: "", confirmstatus: "decline" },
        { cityid: 2, type: "shop", latitude: "22.313235", longitude: "114.041271", image: "", confirmstatus: "wait" },
        { cityid: 1, type: "restaurant", latitude: "22.313235", longitude: "114.041271", image: "", confirmstatus: "wait" },
        { cityid: 3, type: "sleep", latitude: "22.313235", longitude: "114.041271", image: "", confirmstatus: "wait" },
        { cityid: 1, type: "go", latitude: "22.313235", longitude: "114.041271", image: "", confirmstatus: "wait" },
        { cityid: 3, type: "shop", latitude: "22.313235", longitude: "114.041271", image: "", confirmstatus: "decline" },
        { cityid: 1, type: "shop", latitude: "22.313235", longitude: "114.041271", image: "", confirmstatus: "wait" },
      ]);
    }).then(function (){
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
    }).then(function (){
      return knex('attractioncomment').insert([
        { userid: 1, attractionid: 1, comment: 'i will give rate 5', rate: 5 },
  
  
        { userid: 2, attractionid: 2, comment: 'it is low rate', rate: 1 },
  
  
        { userid: 3, attractionid: 2, comment: 'it is low rate', rate: 3 },
  
  
        { userid: 4, attractionid: 3, comment: 'it is low rate', rate: 3 },
      ]);
    });
  
};
