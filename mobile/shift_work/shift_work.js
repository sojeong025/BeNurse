"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var dayofmonth = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
    13: 29,
};
var nurse = /** @class */ (function () {
    function nurse(name, career, off_day) {
        var _this = this;
        this.name = name;
        this.career = career;
        this.work_count = 0;
        this.day_count = 0;
        this.evening_count = 0;
        this.nigth_count = 0;
        this.off_count = 0;
        this.work_plan = new Array(dayofmonth[31]);
        off_day.forEach(function (day) {
            _this.work_plan[day] = "off";
            _this.off_count += 1;
        });
    }
    nurse.prototype.setWork = function (worktype, day) {
        this.work_count += 1;
        this.work_plan[day] = worktype;
        if (worktype === "day")
            this.day_count += 1;
        else if (worktype === "evening")
            this.evening_count += 1;
        else if (worktype === "night")
            this.nigth_count += 1;
        return this;
    };
    nurse.prototype.setpriority = function (worktype) {
        var count = this.day_count + this.evening_count + this.nigth_count;
        var typecount = 0;
        if (worktype === "day")
            typecount = this.day_count;
        else if (worktype === "evening")
            typecount = this.evening_count;
        else if (worktype === "night")
            typecount = this.nigth_count;
        this.priority =
            Math.round((count / (this.work_count ? this.work_count : 1)) * 100) *
                10000 +
                Math.round((typecount / (count ? count : 1)) * 100) * 100 -
                Math.round((this.off_count / (this.work_count ? this.work_count : 1)) * 100);
        return this;
    };
    return nurse;
}());
var Heap = /** @class */ (function () {
    function Heap() {
        this.heap = [new nurse(0, 0, [])];
    }
    Heap.prototype.isempty = function () {
        if (this.heap.length === 1)
            return true;
        return false;
    };
    Heap.prototype.heappush = function (value) {
        var _a;
        this.heap.push(value);
        var curIdx = this.heap.length - 1;
        var parIdx = (curIdx / 2) >> 0;
        while (curIdx > 1 &&
            this.heap[parIdx].priority > this.heap[curIdx].priority) {
            _a = [
                this.heap[curIdx],
                this.heap[parIdx],
            ], this.heap[parIdx] = _a[0], this.heap[curIdx] = _a[1];
            curIdx = parIdx;
            parIdx = (curIdx / 2) >> 0;
        }
    };
    Heap.prototype.heappop = function () {
        var _a, _b;
        if (this.heap.length === 1) {
            throw new Error("heap is empty");
        }
        var min = this.heap[1];
        if (this.heap.length <= 2)
            this.heap = [new nurse(0, 0, [])];
        else
            this.heap[1] = this.heap.pop();
        var curIdx = 1;
        var leftIdx = curIdx * 2;
        var rightIdx = curIdx * 2 + 1;
        if (!this.heap[leftIdx])
            return min;
        if (!this.heap[rightIdx]) {
            if (this.heap[leftIdx].priority < this.heap[curIdx].priority) {
                _a = [
                    this.heap[curIdx],
                    this.heap[leftIdx],
                ], this.heap[leftIdx] = _a[0], this.heap[curIdx] = _a[1];
            }
            return min;
        }
        while (this.heap[leftIdx] < this.heap[curIdx] ||
            this.heap[rightIdx] < this.heap[curIdx]) {
            var minIdx = this.heap[leftIdx] > this.heap[rightIdx] ? rightIdx : leftIdx;
            _b = [
                this.heap[curIdx],
                this.heap[minIdx],
            ], this.heap[minIdx] = _b[0], this.heap[curIdx] = _b[1];
            curIdx = minIdx;
            leftIdx = curIdx * 2;
            rightIdx = curIdx * 2 + 1;
        }
        return min;
    };
    return Heap;
}());
var needpeople = function (time, year, month, day, nomal) {
    if (nomal) {
        if (time === "day")
            return 4;
        if (time === "evening")
            return 4;
        if (time === "night")
            return 3;
    }
    else {
        var date = new Date(year, month - 1, day);
        if (date.getDay() % 6 === 0)
            return 1;
        if (time === "day")
            return 2;
        if (time === "evening")
            return 2;
        if (time === "night")
            return 1;
    }
    return 0;
};
var worktypes = ["day", "evening", "night"];
var apirequest = function (nurse, month, year) {
    var axios = require("axios");
    var tempchange = {
        day: "D",
        evening: "E",
        night: "N",
        off: "O",
    };
    for (var day in nurse.work_plan) {
        var data = {
            hospitalID: 4,
            nurseID: nurse.name,
            workdate: "".concat(year, "-").concat(month, "-").concat((Number(day) + 1)
                .toString()
                .padStart(2, "0")),
            wardID: 4,
            worktime: tempchange[nurse.work_plan[day]],
        };
        axios
            .post("https://k9e105.p.ssafy.io:9000/api/benurse/Schedule", data, {
            headers: {
                "Content-Type": "application/json",
                accept: "*/*",
            },
        })
            .then(function (response) {
            console.log("성공적으로 요청을 보냈습니다.");
        })
            .catch(function (error) {
            console.error("요청 중 오류가 발생했습니다.", error);
        });
    }
};
var ckecklosic = function (nurse_list) {
    for (var _i = 0, nurse_list_1 = nurse_list; _i < nurse_list_1.length; _i++) {
        var nurse_1 = nurse_list_1[_i];
        if (nurse_1.career < 11 &&
            (nurse_1.day_count + nurse_1.evening_count + nurse_1.nigth_count > 18 ||
                nurse_1.day_count + nurse_1.evening_count + nurse_1.nigth_count < 16))
            return "근무일수 불균형";
        else if (nurse_1.career > 10 &&
            (nurse_1.day_count + nurse_1.evening_count + nurse_1.nigth_count > 19 ||
                nurse_1.day_count + nurse_1.evening_count + nurse_1.nigth_count < 17))
            for (var i = 1; i < nurse_1.work_plan.length; i++) {
                if ((nurse_1.work_plan[i] === "day" || nurse_1.work_plan[i] === "evening") &&
                    nurse_1.work_plan[i - 1] === "night")
                    return "퐁당 근무";
                if (nurse_1.work_plan[i] === "day" &&
                    nurse_1.work_plan[i - 1] === "evening")
                    return "퐁당근무";
            }
    }
    return "이상 무";
};
var main = function (n, m, year, nurses) {
    // 간호사 정보 받아오기
    var nurse_list = new Array(n);
    for (var i = 0; i < n; i++) {
        nurse_list[i] = new nurse(nurses[i].name, nurses[i].career, nurses[i].off_day);
    }
    var month = dayofmonth[m];
    // const month_plan: Array<dayplan> = new Array<dayplan>(0);
    for (var day = 0; day < month; day++) {
        // month_plan.push({ day: [], evening: [], night: [] });
        for (var _i = 0, worktypes_1 = worktypes; _i < worktypes_1.length; _i++) {
            var time = worktypes_1[_i];
            for (var peoplecount = 0; peoplecount < needpeople(time, year, m, day, true); peoplecount++) {
                var heap = new Heap();
                for (var _a = 0, nurse_list_2 = nurse_list; _a < nurse_list_2.length; _a++) {
                    var nurse_2 = nurse_list_2[_a];
                    if (nurse_2.work_count != day || nurse_2.career > 10)
                        continue;
                    nurse_2.setpriority(time);
                    heap.heappush(nurse_2);
                }
                while (!heap.isempty()) {
                    var temp_nurse = heap.heappop();
                    if ((time === "day" || time === "evening") &&
                        temp_nurse.work_plan[day - 1] === "night")
                        continue;
                    if (time === "day" && temp_nurse.work_plan[day - 1] === "evening")
                        continue;
                    temp_nurse.setWork(time, day);
                    // try {
                    //   month_plan[day][time].push(temp_nurse.name);
                    // } catch {
                    //   console.log(month_plan);
                    //   throw Error;
                    // }
                    break;
                }
            }
            for (var peoplecount = 0; peoplecount < needpeople(time, year, m, day, false); peoplecount++) {
                var heap = new Heap();
                for (var _b = 0, nurse_list_3 = nurse_list; _b < nurse_list_3.length; _b++) {
                    var nurse_3 = nurse_list_3[_b];
                    if (nurse_3.work_count != day || nurse_3.career < 11)
                        continue;
                    nurse_3.setpriority(time);
                    heap.heappush(nurse_3);
                }
                while (!heap.isempty()) {
                    var temp_nurse = heap.heappop();
                    if ((time === "day" || time === "evening") &&
                        temp_nurse.work_plan[day - 1] === "night")
                        continue;
                    if (time === "day" && temp_nurse.work_plan[day - 1] === "evening")
                        continue;
                    temp_nurse.setWork(time, day);
                    // try {
                    //   month_plan[day][time].push(temp_nurse.name);
                    // } catch {
                    //   console.log(month_plan);
                    //   throw Error;
                    // }
                    break;
                }
            }
        }
        for (var _c = 0, nurse_list_4 = nurse_list; _c < nurse_list_4.length; _c++) {
            var nurse_4 = nurse_list_4[_c];
            if (nurse_4.work_count != day)
                continue;
            nurse_4.work_plan[day] = "off";
            nurse_4.work_count += 1;
            nurse_4.off_count += 1;
        }
    }
    ///////////////////////////////////////////////////////////
    // for (const nurse of nurse_list) {
    //   console.log(nurse);
    //   console.log(nurse.day_count + nurse.evening_count + nurse.nigth_count);
    //   console.log("==================================");
    // }
    // console.log(month_plan);
    /////////////////////////////////////////////////////////
    return nurse_list;
    // return ckecklosic(nurse_list);
};
exports.main = main;
// const result = {
//   "근무일수 불균형": 0,
//   "퐁당 근무": 0,
//   "이상 무": 0,
// };
// //includes가 없다고 떠서 만든 isinclude함수
// const isinclude = (array: KeyType[], value: KeyType): boolean => {
//   for (const ele of array) {
//     if (ele === value) return true;
//   }
//   return false;
// };
// //테스트 케이스 19만번 실행
// for (var i = 0; i < 1; i++) {
//   const n = 28;
//   const m = 11;
//   const nurse_info: Array<nurse_input> = [];
//   //간호사 데이터 랜덤 생성
//   for (let i = 1; i < n + 1; i++) {
//     const temp: nurse_input = {
//       name: i,
//       career: i < 21 ? 5 : 15,
//       off_day: [] as KeyType[],
//     };
//     for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
//       while (true) {
//         const num = Math.floor(Math.random() * 29 + 1);
//         // if (temp.off_day.includes(num as shift_work.KeyType)) continue;
//         if (isinclude(temp.off_day, num as KeyType)) continue;
//         temp.off_day.push(num as KeyType);
//         break;
//       }
//     }
//     nurse_info.push(temp);
//   }
//   result[main(n, m, 2023, nurse_info)] += 1;
// }
// console.log(result);
