
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
        { email: "123", password: '$2b$10$LydDZMcaY05OVJ1HLS4uUudeOhiUFCKmFoq3gl.5WLBowancCA6gO', facebookid: '', googleid: '', name: 'userman1', gender: "Male", birthday: new Date(), usertype: "user", image: "" },
        { email: "userman2@gmail.com", password: '$2b$10$LydDZMcaY05OVJ1HLS4uUudeOhiUFCKmFoq3gl.5WLBowancCA6gO', facebookid: '', googleid: '', name: 'userman2', gender: "Female", birthday: new Date(), usertype: "user", image: "" },
        { email: "userman3@gmail.com", password: '$2b$10$LydDZMcaY05OVJ1HLS4uUudeOhiUFCKmFoq3gl.5WLBowancCA6gO', facebookid: '', googleid: '', name: 'userman3', gender: "Female", birthday: new Date(), usertype: "user", image: "" },
        { email: "userman4@gmail.com", password: '$2b$10$LydDZMcaY05OVJ1HLS4uUudeOhiUFCKmFoq3gl.5WLBowancCA6gO', facebookid: '', googleid: '', name: 'userman4', gender: "Female", birthday: new Date(), usertype: "user", image: "" },
        { email: "1234", password: '$2b$10$LydDZMcaY05OVJ1HLS4uUudeOhiUFCKmFoq3gl.5WLBowancCA6gO', facebookid: '', googleid: '', name: 'userman4', gender: "Female", birthday: new Date(), usertype: "user", image: "" },
        { email: "admin", password: '$2b$10$LydDZMcaY05OVJ1HLS4uUudeOhiUFCKmFoq3gl.5WLBowancCA6gO', facebookid: '', googleid: '', name: 'admin', gender: "Female", birthday: new Date(), usertype: "admin", image: "" }

      ]);
    }).then(function () {
      console.log('9');
      return knex('city').insert([
        { name: "Tokyo", description: "Tokyo (東京 Tōkyō, /ˈtoʊkioʊ/;[8] Japanese: [toːkʲoː] (About this soundlisten)), officially Tokyo Metropolis (東京都 Tōkyō-to), one of the 47 prefectures of Japan, has served as the Japanese capital since 1869.[9][10] As of 2014 the Greater Tokyo Area ranked as the most populous metropolitan area in the world.[4] The urban area houses the seat of the Emperor of Japan, of the Japanese government and of the National Diet. Tokyo forms part of the Kantō region on the southeastern side of Japan's main island, Honshu, and includes the Izu Islands and Ogasawara Islands.[11] Tokyo was formerly named Edo when Shōgun Tokugawa Ieyasu made the city as his headquarters in 1603. It became the capital after Emperor Meiji moved his seat to the city from Kyoto in 1868; at that time Edo was renamed Tokyo. Tokyo Metropolis formed in 1943 from the merger of the former Tokyo Prefecture (東京府 Tōkyō-fu) and the city of Tokyo (東京市 Tōkyō-shi).", latitude: 35.652832, longitude: 139.839478, image: '../assets/tokyo.jpg' },
        { name: "Osaka", description: "Osaka (大阪市 Ōsaka-shi) (Japanese pronunciation: [oːsaka]; About this soundlisten (help·info)) is a designated city in the Kansai region of Japan. It is the capital city of Osaka Prefecture and the largest component of the Keihanshin Metropolitan Area, the second largest metropolitan area in Japan and among the largest in the world with over 19 million inhabitants. Osaka will host Expo 2025. The current mayor of Osaka is Hirohumi Yoshimura.", latitude: 34.652500, longitude: 135.506302, image: '../assets/osaka.jpg' },
        { name: "Fukuoka", description: "Fukuoka, capital of Fukuoka Prefecture, sits on the northern shore of Japan’s Kyushu Island. It’s known for ancient temples, beaches and modern shopping malls, including Canal City. Maizuru Park contains ruins of 17th-century Fukuoka Castle. ", latitude: 33.5904, longitude: 130.4017, image: '../assets/fukuoka.jpg' },
        { name: "Hiroshima", description: "Hiroshima, a modern city on Japan’s Honshu Island, was largely destroyed by an atomic bomb during World War II. Today, Hiroshima Peace Memorial Park commemorates the 1945 event. In the park are the ruins of Genbaku Dome, one of the few buildings that was left standing near ground zero.", latitude: 34.3852, longitude: 132.4553, image: '../assets/hiroshima.jpg' },
      ]);
    }).then(function () {
      console.log('10');
      return knex('attraction').insert([
        { cityid: 1, userid: 1, type: "go", name: 'Tokyo Tower', description: 'Tokyo Tower is a communications and observation tower in the Shiba-koen district of Minato, Tokyo, Japan. At 332.9 metres, it is the second-tallest structure in Japan. ', latitude: "35.6586", longitude: "139.7454", confirmstatus: "accept", icon: "../assets/tokyotower.jpg" },
        { cityid: 1, userid: 1, type: "go", name: 'Sensō-ji', description: "Sensō-ji is an ancient Buddhist temple located in Asakusa, Tokyo, Japan. It is Tokyo's oldest temple, and one of its most significant. Formerly associated with the Tendai sect of Buddhism, it became independent after World War II.", latitude: "35.7148", longitude: "139.7967", confirmstatus: "accept", icon: "../assets/sensoji.jpg" },
        { cityid: 1, userid: 1, type: "restaurant", name: 'Hayashi Ramen', description: 'Hayashi has been the best ramen shop within easy walking distance of Shibuya Station since its debut in 2003.', latitude: "35.6573", longitude: "139.6980", confirmstatus: "accept", icon: "../assets/hayashiramen.jpg" },
        { cityid: 1, userid: 1, type: "restaurant", name: 'Sushi No Midori', description: 'Located near Shibuya Station, Sushi Nobu is like a secret getaway at the center of the city with a very relaxing atmosphere. They take great care in preparing their dishes, including their highly recommended Pacific Bluefin Tuna. ', latitude: "35.6583", longitude: "139.6990", confirmstatus: "accept", icon: "../assets/sushinomidori.jpg" },
        { cityid: 1, userid: 1, type: "shop", name: 'Journal Standard Relume', description: 'A clothing retail job description encompasses more duties than simply greeting and helping customers. A clothing store job description includes processing payments, handling the return of merchandise and bagging or packaging clothing.', latitude: "35.6068", longitude: "139.6693", confirmstatus: "accept", icon: "../assets/journalstandard.jpg" },

        { cityid: 2, userid: 2, type: "go", name: 'Universal Studios Japan', description: 'Universal Studios Japan, a theme park with a collection of world-class entertainment for all ages to enjoy.', latitude: "34.6654", longitude: "135.4323", confirmstatus: "accept", icon: "../assets/universalstudio.jpg" },
        { cityid: 2, userid: 2, type: "go", name: 'Osaka Castle', description: 'Osaka Castle is a Japanese castle in Chūō-ku, Osaka, Japan. The castle played a major role in the unification of Japan during the sixteenth century of the Azuchi-Momoyama period.', latitude: "34.6873", longitude: "135.5260", confirmstatus: "accept", icon: "../assets/osakacastle.jpg" },
        { cityid: 2, userid: 2, type: "restaurant", name: 'Kani Doraku', description: 'Kani Dōraku is a Japanese restaurant chain that specialises in crabs. The restaurants are known for their traditional appearance and the largered crab that moves above the main entrance.', latitude: "34.668793", longitude: "135.501498", confirmstatus: "accept", icon: "../assets/kanidoraku.jpg" },
        { cityid: 2, userid: 2, type: "shop", name: 'Namba Marui', description: 'Various brands from Tokyo, Osaka, and from overseas can all be found at this mall.', latitude: "34.6656", longitude: "135.5011", confirmstatus: "accept", icon: "../assets/nanbamarui.jpg" },
        { cityid: 2, userid: 2, type: "shop", name: 'Shinsaibashi', description: 'Shinsaibashi is a district in the Chūō-ku ward of Osaka, Japan and the city main shopping area. At its center is Shinsaibashi-suji, a covered shopping street.', latitude: "34.6937", longitude: "135.5022", confirmstatus: "accept", icon: "../assets/shinsaibashi.jpg" },
        
        { cityid: 3, userid: 3, type: "shop", name: 'Canal City Hakata', description: 'Canal City Hakata is a large shopping and entertainment complex in Fukuoka, Japan. Called the city within the city, it boasts numerous attractions including shops', latitude: "33.5898", longitude: "130.4107", confirmstatus: "accept", icon: "../assets/canalcityhakata.jpg" },
        { cityid: 3, userid: 3, type: "restaurant", name: 'Ichiran Ramen', description: 'Ichiran Ramen (一蘭, Ichiran) is a Japanese ramen food-service business specializing in tonkotsu ramen. The chain restaurant began in Fukuoka.', latitude: "33.5897", longitude: "130.4207", confirmstatus: "accept", icon: "/assets/ichiranramen.jpg" },
        { cityid: 3, userid: 3, type: "restaurant", name: 'Ramen Danbo', description: 'The simple but delicious umami from the pork in infused in every strand of the noodles, giving it a distinct flavor.', latitude: "393.292919", longitude: "33.5917", confirmstatus: "accept", icon: "../assets/ramendanbo.jpg" },
        { cityid: 3, userid: 3, type: "restaurant", name: 'Yakitori Hachibei', description: 'Yakitori no Hachibei, which started in Fukuoka and now has branches in Tokyo and overseas, is known as the original upscale yakitori restaurant, serving creative skewers in a stylish environment. ', latitude: "33.585323", longitude: "130.39989", confirmstatus: "accept", icon: "../assets/yakitorihachibei.jpg" },
        { cityid: 3, userid: 3, type: "go", name: 'Fukuoka Castle', description: 'Fukuoka Castle is a Japanese castle located in Chūō-ku, Fukuoka, Japan. It is also known as Maizuru Castle or Seki Castle. Completed in the early Edo period.', latitude: "33.589542", longitude: "130.39307", confirmstatus: "accept", icon: "../assets/fukuokacastle.jpg" },
        
        
        { cityid: 4, userid: 1, type: "go", name: 'go1', description: 'description5', latitude: "393.292919", longitude: "114.041271", confirmstatus: "wait", icon: "/assets/banner.png" },
        { cityid: 4, userid: 1, type: "go", name: 'go1', description: 'description5', latitude: "393.292919", longitude: "114.041271", confirmstatus: "wait", icon: "/assets/banner.png" },
        { cityid: 4, userid: 1, type: "go", name: 'go1', description: 'description5', latitude: "393.292919", longitude: "114.041271", confirmstatus: "wait", icon: "/assets/banner.png" },
        { cityid: 4, userid: 1, type: "go", name: 'go1', description: 'description5', latitude: "393.292919", longitude: "114.041271", confirmstatus: "wait", icon: "/assets/banner.png" },
        { cityid: 4, userid: 1, type: "go", name: 'go1', description: 'description5', latitude: "393.292919", longitude: "114.041271", confirmstatus: "wait", icon: "/assets/banner.png" },
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
