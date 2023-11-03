export interface nfcdata_data {
  name: string;
}

export interface nfcdata {
  type: string;
  data: nfcdata_data;
}

export class data_templat {
  patient: string;
  device: string;
  location: string;
  nurse: string;

  constructor(nurse: string) {
    this.nurse = nurse;
  }

  set_patient(patient: string) {
    const new_data = new data_templat(this.nurse);
    new_data.patient = patient;
    new_data.device = this.device;
    new_data.location = this.location;
    new_data.nurse = this.nurse;
    return new_data;
  }
  set_device(device: string) {
    const new_data = new data_templat(this.nurse);
    new_data.patient = this.patient;
    new_data.device = device;
    new_data.location = this.location;
    new_data.nurse = this.nurse;
    return new_data;
  }
  set_location(location: string) {
    const new_data = new data_templat(this.nurse);
    new_data.patient = this.patient;
    new_data.device = this.device;
    new_data.location = location;
    new_data.nurse = this.nurse;
    return new_data;
  }
  set_nurse(nurse: string) {
    const new_data = new data_templat(this.nurse);
    new_data.patient = this.patient;
    new_data.device = this.device;
    new_data.location = this.location;
    new_data.nurse = nurse;
    return new_data;
  }
}

export const temp_data = async (tagid: string): Promise<nfcdata> => {
  return new Promise<nfcdata>((resolve, reject) => {
    if (tagid === '533736E2500001') {
      resolve({
        type: 'patient',
        data: {
          name: '개구리',
        },
      });
    } else if (tagid === '531E31E2500001') {
      resolve({
        type: 'patient',
        data: {
          name: '공룡',
        },
      });
    } else if (tagid === '537331E2500001') {
      resolve({
        type: 'device',
        data: {
          name: '팜레스트',
        },
      });
    } else {
      reject({
        type: 'unknown',
        data: {
          name: 'unknown',
        },
      });
    }
  });
};

export const our_beacon = async (hospital: string): Promise<string[]> => {
  hospital.length;
  return new Promise(resolve => {
    resolve([
      'E3:2F:4B:F3:F2:77',
      'DF:8F:78:F0:06:1F',
      'CA:8D:AC:9C:63:64',
      'CA:87:66:3E:6E:38',
    ]);
  });
};
