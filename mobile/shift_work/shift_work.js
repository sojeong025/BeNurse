var shift_work;
(function (shift_work) {
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
            this.work_plan = new Array(dayofmonth[31]);
            off_day.forEach(function (day) {
                _this.work_plan[day] = "off";
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
                count * 10000 +
                    Math.round((count / (this.work_count ? this.work_count : 1)) * 100) *
                        100 +
                    Math.round(typecount / (count ? count : 1)) * 100;
            return this;
        };
        return nurse;
    }());
    var Heap = /** @class */ (function () {
        function Heap() {
            this.heap = [new nurse(0, 0, [])];
        }
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
    var needpeople = {
        day: 4,
        evening: 4,
        night: 3,
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
            if (nurse_1.day_count + nurse_1.evening_count + nurse_1.nigth_count > 19 ||
                nurse_1.day_count + nurse_1.evening_count + nurse_1.nigth_count < 14)
                return "근무일수 불균형";
            for (var i = 1; i < nurse_1.work_plan.length; i++) {
                if (nurse_1.work_plan[i] === "day" &&
                    nurse_1.work_plan[i] === "evening" &&
                    nurse_1.work_plan[i - 1] === "night")
                    return "퐁당근무";
            }
        }
        return "이상 무";
    };
    shift_work.main = function (n, m, nurses) {
        // 간호사 정보 받아오기
        var nurse_list = new Array(n);
        for (var i_1 = 0; i_1 < n; i_1++) {
            nurse_list[i_1] = new nurse(nurses[i_1].name, nurses[i_1].career, nurses[i_1].off_day);
        }
        var month = dayofmonth[m];
        var month_plan = new Array(0);
        for (var day = 0; day < month; day++) {
            month_plan.push({ day: [], evening: [], night: [] });
            for (var _i = 0, worktypes_1 = worktypes; _i < worktypes_1.length; _i++) {
                var time = worktypes_1[_i];
                for (var peoplecount = 0; peoplecount < needpeople[time]; peoplecount++) {
                    var heap = new Heap();
                    for (var _a = 0, nurse_list_2 = nurse_list; _a < nurse_list_2.length; _a++) {
                        var nurse_2 = nurse_list_2[_a];
                        if (nurse_2.work_count != day)
                            continue;
                        nurse_2.setpriority(time);
                        heap.heappush(nurse_2);
                    }
                    while (true) {
                        var temp_nurse = heap.heappop();
                        if ((time === "day" || time === "evening") &&
                            temp_nurse.work_plan[day - 1] === "night")
                            continue;
                        if (temp_nurse.work_plan[day] === "off")
                            continue;
                        temp_nurse.setWork(time, day);
                        try {
                            month_plan[day][time].push(temp_nurse.name);
                        }
                        catch (_b) {
                            console.log(month_plan);
                            throw Error;
                        }
                        break;
                    }
                }
            }
            for (var _c = 0, nurse_list_3 = nurse_list; _c < nurse_list_3.length; _c++) {
                var nurse_3 = nurse_list_3[_c];
                if (nurse_3.work_count != day)
                    continue;
                nurse_3.work_plan[day] = "off";
                nurse_3.work_count += 1;
            }
        }
        // for (const nurse of nurse_list) {
        //   // apirequest(nurse, 11, 2023);
        //   console.log(nurse);
        //   console.log(nurse.day_count + nurse.evening_count + nurse.nigth_count);
        //   console.log("=============================");
        // }
        // console.log(month_plan);
        console.log(ckecklosic(nurse_list));
    };
})(shift_work || (shift_work = {}));
for (var i = 0; i < 100; i++) {
    var n = 20;
    var m = 11;
    var nurse_info = [];
    //includes가 없다고 떠서 만든 isinclude함수
    var isinclude = function (array, value) {
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var ele = array_1[_i];
            if (ele === value)
                return true;
        }
        return false;
    };
    //간호사 데이터 랜덤 생성
    for (var i_2 = 1; i_2 < n + 1; i_2++) {
        var temp = {
            name: i_2,
            career: Math.floor(Math.random() * 9 + 1),
            off_day: [],
        };
        for (var i_3 = 0; i_3 < Math.floor(Math.random() * 10); i_3++) {
            while (true) {
                var num = Math.floor(Math.random() * 29 + 1);
                // if (temp.off_day.includes(num as shift_work.KeyType)) continue;
                if (isinclude(temp.off_day, num))
                    continue;
                temp.off_day.push(num);
                break;
            }
        }
        nurse_info.push(temp);
    }
    shift_work.main(n, m, nurse_info);
}
