namespace shift_work {
  export type KeyType =
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30
    | 31;

  type worktype = "day" | "evening" | "night" | "off";

  const dayofmonth = {
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

  export interface nurse_input {
    name: string;
    career: number;
    off_day: KeyType[];
  }

  interface day {
    day: Array<nurse>;
    evening: Array<nurse>;
    night: Array<nurse>;
  }

  class nurse {
    name: string;
    career: number;
    work_count: number;
    day_count: number;
    evening_count: number;
    nigth_count: number;
    work_plan: worktype[];
    priority: number;

    constructor(name: string, career: number, off_day: KeyType[]) {
      this.name = name;
      this.career = career;
      this.work_count = 0;
      this.day_count = 0;
      this.evening_count = 0;
      this.nigth_count = 0;

      this.work_plan = new Array<worktype>(dayofmonth[31]);
      off_day.forEach((day: KeyType) => {
        this.work_plan[day] = "off";
      });
    }

    setWork(worktype: worktype, day: number) {
      this.work_count += 1;
      this.work_plan[day] = worktype;
      if (worktype === "day") this.day_count += 1;
      else if (worktype === "evening") this.evening_count += 1;
      else if (worktype === "night") this.nigth_count += 1;
      return this;
    }

    setpriority(worktype: worktype) {
      let count: number =
        this.day_count + this.evening_count + this.nigth_count;
      let typecount: number = 0;
      if (worktype === "day") typecount = this.day_count;
      else if (worktype === "evening") typecount = this.evening_count;
      else if (worktype === "night") typecount = this.nigth_count;

      this.priority =
        count * 10000 +
        Math.round((count / (this.work_count ? this.work_count : 1)) * 100) *
          100 +
        Math.round(typecount / (count ? count : 1)) * 100;
      return this;
    }
  }

  class Heap {
    private heap: Array<nurse>;
    constructor() {
      this.heap = [new nurse("", 0, [])];
    }

    heappush(value: nurse) {
      this.heap.push(value);
      let curIdx = this.heap.length - 1;
      let parIdx = (curIdx / 2) >> 0;

      while (
        curIdx > 1 &&
        this.heap[parIdx].priority > this.heap[curIdx].priority
      ) {
        [this.heap[parIdx], this.heap[curIdx]] = [
          this.heap[curIdx],
          this.heap[parIdx],
        ];
        curIdx = parIdx;
        parIdx = (curIdx / 2) >> 0;
      }
    }

    heappop() {
      if (this.heap.length === 1) {
        throw new Error("heap is empty");
      }
      const min = this.heap[1];
      if (this.heap.length <= 2) this.heap = [new nurse("", 0, [])];
      else this.heap[1] = this.heap.pop();

      let curIdx = 1;
      let leftIdx = curIdx * 2;
      let rightIdx = curIdx * 2 + 1;

      if (!this.heap[leftIdx]) return min;
      if (!this.heap[rightIdx]) {
        if (this.heap[leftIdx].priority < this.heap[curIdx].priority) {
          [this.heap[leftIdx], this.heap[curIdx]] = [
            this.heap[curIdx],
            this.heap[leftIdx],
          ];
        }
        return min;
      }

      while (
        this.heap[leftIdx] < this.heap[curIdx] ||
        this.heap[rightIdx] < this.heap[curIdx]
      ) {
        const minIdx =
          this.heap[leftIdx] > this.heap[rightIdx] ? rightIdx : leftIdx;
        [this.heap[minIdx], this.heap[curIdx]] = [
          this.heap[curIdx],
          this.heap[minIdx],
        ];
        curIdx = minIdx;
        leftIdx = curIdx * 2;
        rightIdx = curIdx * 2 + 1;
      }

      return min;
    }
  }

  const needpeople = {
    day: 4,
    evening: 4,
    night: 3,
  };
  const worktypes: Array<worktype> = ["day", "evening", "night"];

  export const main = (n: number, m: number, nurses: nurse_input[]) => {
    // 간호사 정보 받아오기
    const nurse_list = new Array<nurse>(n);
    for (let i = 0; i < n; i++) {
      nurse_list[i] = new nurse(
        nurses[i].name,
        nurses[i].career,
        nurses[i].off_day
      );
    }

    const month = dayofmonth[m];
    // const workplan: day[] = Array.from({ length: 10 }, () => ({
    //   day: [],
    //   evening: [],
    //   night: [],
    // }));

    for (let day = 0; day < month; day++) {
      for (let time of worktypes) {
        for (
          let peoplecount = 0;
          peoplecount < needpeople[time];
          peoplecount++
        ) {
          const heap = new Heap();
          for (const nurse of nurse_list) {
            if (nurse.work_count != day) continue;
            nurse.setpriority(time);
            heap.heappush(nurse);
          }
          while (true) {
            const temp_nurse = heap.heappop();
            if (
              (time === "day" || time === "evening") &&
              temp_nurse.work_plan[day] === "night"
            )
              continue;

            if (temp_nurse.work_plan[day] === "off") continue;

            temp_nurse.setWork(time, day);
            // workplan[day][time].push(temp_nurse);
            break;
          }
        }
      }
      for (const nurse of nurse_list) {
        if (nurse.work_count != day) continue;
        nurse.work_plan[day] = "off";
        nurse.work_count += 1;
      }
    }

    for (const nurse of nurse_list) {
      console.log(nurse);
      console.log(nurse.day_count + nurse.evening_count + nurse.nigth_count);
      console.log("=============================");
    }
  };
}

const n = 20;
const m = 11;
const nurse_info: Array<shift_work.nurse_input> = [];

for (let i = 0; i < n; i++) {
  const temp: shift_work.nurse_input = {
    name: String(i),
    career: Math.floor(Math.random() * 9 + 1),
    off_day: [] as shift_work.KeyType[],
  };
  for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
    while (true) {
      const num = Math.floor(Math.random() * 29 + 1);
      if (temp.off_day.includes(num as shift_work.KeyType)) continue;
      temp.off_day.push(num as shift_work.KeyType);
      break;
    }
  }

  nurse_info.push(temp);
}

console.log(nurse_info.length);
shift_work.main(n, m, nurse_info);
