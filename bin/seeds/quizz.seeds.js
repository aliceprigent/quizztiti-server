var axios = require("axios");

const quizzUrl = [
  "https://www.kiwime.com/oqdb/files/2164852257/OpenQuizzDB_164/openquizzdb_164.json",
  //   "https://www.kiwime.com/oqdb/files/2165472333/OpenQuizzDB_165/openquizzdb_165.json",
  //   "https://www.kiwime.com/oqdb/files/2167325638/OpenQuizzDB_167/openquizzdb_167.json",
  //   "https://www.kiwime.com/oqdb/files/2168235464/OpenQuizzDB_168/openquizzdb_168.json",
  //   "https://www.kiwime.com/oqdb/files/2174524525/OpenQuizzDB_174/openquizzdb_174.json",
  //   "https://www.kiwime.com/oqdb/files/3220495553/OpenQuizzDB_220/openquizzdb_220.json",
  //   "https://www.kiwime.com/oqdb/files/3219637788/OpenQuizzDB_219/openquizzdb_219.json",
  //   'https://www.kiwime.com/oqdb/files/3224652244/OpenQuizzDB_224/openquizzdb_224.json',
  // //   "https://www.kiwime.com/oqdb/files/3233548326/OpenQuizzDB_233/openquizzdb_233.json",
  //   "https://www.kiwime.com/oqdb/files/2166587884/OpenQuizzDB_166/openquizzdb_166.json",
];

var promises = [];
var quizzes = [];

for (i = 0; i < quizzUrl.length; i++) {
  promises.push(
    axios
      .get(quizzUrl[i])
      .then((response) => {
        quizzes.push(response.data);
        console.log(quizzes);
      })
      .catch((err) => {
        console.log("this is my error", err);
      })
  );
}

let newQuizz;

Promise.all(promises).then((resp) => {
  quizzes.map((quizz) => {
    newQuizz = [
      {
        fournisseur: quizz.fournisseur,
        rédacteur: quizz.rédacteur,
        description: quizz.thème,
      },
    ];
    console.log(newQuizz);
  });
});

// //  Promise.all()

// //  .then((quizzs)=>{

// //    let newQuizz = {
// //        name: quizzUrl.
// //    }
// //  })
// //  .catch((err)=>{
// //
// //  })
// // }
