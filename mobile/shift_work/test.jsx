// import { main } from "./shift_work";
const shift_work = require("./shift_work");

//includes가 없다고 떠서 만든 isinclude함수
var isinclude = function (array, value) {
  for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
    var ele = array_1[_i];
    if (ele === value) return true;
  }
  return false;
};
//테스트 케이스 19만번 실행
for (var i = 0; i < 1; i++) {
  var n = 28;
  var m = 11;
  var nurse_info = [];
  //간호사 데이터 랜덤 생성
  for (var i_2 = 1; i_2 < n + 1; i_2++) {
    var temp = {
      name: i_2,
      career: i_2 < 21 ? 5 : 15,
      off_day: [],
    };
    for (var i_3 = 0; i_3 < Math.floor(Math.random() * 10); i_3++) {
      while (true) {
        var num = Math.floor(Math.random() * 29 + 1);
        // if (temp.off_day.includes(num as shift_work.KeyType)) continue;
        if (isinclude(temp.off_day, num)) continue;
        temp.off_day.push(num);
        break;
      }
    }
    nurse_info.push(temp);
  }

  // console.log(shift_work);
  const work = shift_work.main(n, m, 2023, nurse_info);
  console.log(work);
}
