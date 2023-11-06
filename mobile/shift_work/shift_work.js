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
            this.heap = [new nurse("", 0, [])];
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
                this.heap = [new nurse("", 0, [])];
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
    shift_work.main = function (n, m, nurses) {
        // 간호사 정보 받아오기
        var nurse_list = new Array(n);
        for (var i = 0; i < n; i++) {
            nurse_list[i] = new nurse(nurses[i].name, nurses[i].career, nurses[i].off_day);
        }
        var month = dayofmonth[m];
        // const workplan: day[] = Array.from({ length: 10 }, () => ({
        //   day: [],
        //   evening: [],
        //   night: [],
        // }));
        for (var day = 0; day < month; day++) {
            for (var _i = 0, worktypes_1 = worktypes; _i < worktypes_1.length; _i++) {
                var time = worktypes_1[_i];
                for (var peoplecount = 0; peoplecount < needpeople[time]; peoplecount++) {
                    var heap = new Heap();
                    for (var _a = 0, nurse_list_1 = nurse_list; _a < nurse_list_1.length; _a++) {
                        var nurse_1 = nurse_list_1[_a];
                        if (nurse_1.work_count != day)
                            continue;
                        nurse_1.setpriority(time);
                        heap.heappush(nurse_1);
                    }
                    while (true) {
                        var temp_nurse = heap.heappop();
                        if ((time === "day" || time === "evening") &&
                            temp_nurse.work_plan[day] === "night")
                            continue;
                        if (temp_nurse.work_plan[day] === "off")
                            continue;
                        temp_nurse.setWork(time, day);
                        // workplan[day][time].push(temp_nurse);
                        break;
                    }
                }
            }
            for (var _b = 0, nurse_list_2 = nurse_list; _b < nurse_list_2.length; _b++) {
                var nurse_2 = nurse_list_2[_b];
                if (nurse_2.work_count != day)
                    continue;
                nurse_2.work_plan[day] = "off";
                nurse_2.work_count += 1;
            }
        }
        for (var _c = 0, nurse_list_3 = nurse_list; _c < nurse_list_3.length; _c++) {
            var nurse_3 = nurse_list_3[_c];
            console.log(nurse_3);
            console.log(nurse_3.day_count + nurse_3.evening_count + nurse_3.nigth_count);
            console.log("=============================");
        }
    };
})(shift_work || (shift_work = {}));
var n = 20;
var m = 11;
var nurse_info = [];
for (var i = 0; i < n; i++) {
    var temp = {
        name: String(i),
        career: Math.floor(Math.random() * 9 + 1),
        off_day: [],
    };
    for (var i_1 = 0; i_1 < Math.floor(Math.random() * 10); i_1++) {
        while (true) {
            var num = Math.floor(Math.random() * 29 + 1);
            if (temp.off_day.includes(num))
                continue;
            temp.off_day.push(num);
            break;
        }
    }
    nurse_info.push(temp);
}
console.log(nurse_info.length);
shift_work.main(n, m, nurse_info);
