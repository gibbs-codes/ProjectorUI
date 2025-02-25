export default function checkTime(time){
    if (time === '1') {
      return '1 minute';
    } else if(time === '0') {
      return 'Now';
    } else if (time === 'DLY') {
      return 'Delayed';
    } else if (Number(time) <0){
      return "Gone"
    } else if (time === 'DUE') {
      return 'Now';
    } else {
      return time + ' minutes';
    }
  }