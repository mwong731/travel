
exports.up = function (knex, Promise) {
   return Promise.all([
      knex.schema.createTable('users', (table) => {
         table.increments();
         table.string("email");
         table.string("password");
         table.string("facebookid");
         table.string("googleid");
         table.string("name");
         table.enu("gender", ["Male", "Female"]);
         table.date('birthday');
         table.enu("usertype", ["user", "admin"]);
         //table.timestamps(false, true);
      }).createTable('city', (table) => {
         table.increments();
         table.string("name");
         table.text("description");
         table.float("latitude");
         table.float("longitude");
         table.string("image");
         //table.timestamps(false, true);
      }).createTable('attraction', (table) => {
         table.increments();
         table.integer('cityid');
         table.foreign('cityid').references('city.id');
         table.string('name');
         table.string('description');
         table.enu("type", ['shop', 'restaurant', 'sleep', 'go']);
         table.float("latitude");
         table.float("longitude");
         table.string("image");
         //table.timestamps(false, true);
      }).createTable('attractionimage', (table) => {
         table.increments();
         table.integer('attractionid');
         table.foreign('attractionid').references('attraction.id');
         table.string("image");
         //table.timestamps(false, true);
      }).createTable('usersubmitattraction', (table) => {
         table.increments();
         table.integer('cityid');
         table.foreign('cityid').references('city.id');
         table.string('name');
         table.string('description');
         table.enu("type", ['shop', 'restaurant', 'sleep', 'go']);
         table.float("latitude");
         table.float("longitude");
         table.string("image");
         //table.timestamps(false, true);
         table.enu("confirmstatus" , ["accept","decline","wait"]);
         //table.timestamps(false, true);
      }).createTable('bookmark', (table) => {
         table.increments();
         table.integer('userid');
         table.foreign('userid').references('users.id');
         table.integer('attractionid');
         table.foreign('attractionid').references('attraction.id');
         table.unique(['userid' , 'attractionid']);
         //table.timestamps(false, true);
      }).createTable('attractioncomment', (table) => {
         table.increments();
         table.integer('userid');
         table.foreign('userid').references('users.id');
         table.integer('attractionid');
         table.foreign('attractionid').references('attraction.id');
         table.string("comment");
         table.enu("rate", [1, 2, 3, 4, 5]);
         //table.timestamps(false, true);
      }).createTable('plan', (table) => {
         table.increments();
         table.integer('userid');
         table.foreign('userid').references('users.id');
         table.string('name');
         //table.timestamps(false, true);
      }).createTable('attractioninplan', (table) => {
         table.increments();
         table.integer('planid');
         table.foreign('planid').references('plan.id');
         table.integer('attractionid');
         table.foreign('attractionid').references('attraction.id');
         table.date('date');
         table.enu("time" , ["day","night"]);
         //table.timestamps(false, true);
      }).then(() => {
         // Promise.all([
         //    knex('city').insert([
         //       { name: "Hong Kong", description: "Hong Kong (Chinese: 香港; pronunciation in Hong Kong Cantonese: [hœ́ːŋ.kɔ̌ːŋ] (About this soundlisten)), officially the Hong Kong Special Administrative Region of the People's Republic of China, is a special administrative region on the eastern side of the Pearl River estuary in southern China. With over 7.4 million people of various nationalities[c] in a 1,104-square-kilometre (426 sq mi) territory, Hong Kong is the world's fourth-most-densely-populated region.", latitude: 22.28552, longitude: 114.15769, image: '' },
         //       { name: "Osaka", description: "Osaka (大阪市 Ōsaka-shi) (Japanese pronunciation: [oːsaka]; About this soundlisten (help·info)) is a designated city in the Kansai region of Japan. It is the capital city of Osaka Prefecture and the largest component of the Keihanshin Metropolitan Area, the second largest metropolitan area in Japan and among the largest in the world with over 19 million inhabitants. Osaka will host Expo 2025. The current mayor of Osaka is Hirohumi Yoshimura.", latitude: 34.652500, longitude: 135.506302, image: '' },
         //       { name: "Tokyo", description: "Tokyo (東京 Tōkyō, /ˈtoʊkioʊ/;[8] Japanese: [toːkʲoː] (About this soundlisten)), officially Tokyo Metropolis (東京都 Tōkyō-to), one of the 47 prefectures of Japan, has served as the Japanese capital since 1869.[9][10] As of 2014 the Greater Tokyo Area ranked as the most populous metropolitan area in the world.[4] The urban area houses the seat of the Emperor of Japan, of the Japanese government and of the National Diet. Tokyo forms part of the Kantō region on the southeastern side of Japan's main island, Honshu, and includes the Izu Islands and Ogasawara Islands.[11] Tokyo was formerly named Edo when Shōgun Tokugawa Ieyasu made the city as his headquarters in 1603. It became the capital after Emperor Meiji moved his seat to the city from Kyoto in 1868; at that time Edo was renamed Tokyo. Tokyo Metropolis formed in 1943 from the merger of the former Tokyo Prefecture (東京府 Tōkyō-fu) and the city of Tokyo (東京市 Tōkyō-shi).", latitude: 35.652832, longitude: 139.839478, image: '' }
         //    ]),
         //    knex('attraction').insert([
         //       { cityid: 1, type: "shop", latitude: "22.313235", longitude: "114.041271", image: "" },
         //       { cityid: 1, type: "restaurant", latitude: "344.1233", longitude: "50.1231", image: "" },
         //       { cityid: 1, type: "sleep", latitude: "44.338383", longitude: "34.92828", image: "" },
         //       { cityid: 2, type: "restaurant", latitude: "22.313235", longitude: "114.041271", image: "" },
         //       { cityid: 3, type: "go", latitude: "393.292919", longitude: "114.041271", image: "" }
         //    ])
         // ]);
      })
   ]);
};

exports.down = function (knex, Promise) {
   return knex.schema.dropTable('attractioncomment').dropTable('bookmark').dropTable('usersubmitattraction').dropTable('attractioninplan').dropTable('plan').dropTable('attractionimage').dropTable('attraction').dropTable('city').dropTable('users');
};
