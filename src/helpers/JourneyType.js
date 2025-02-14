const JourneyType = [
    { name: 'OneWay', val: 1 },
    { name: 'Return', val: 2 },
    { name: 'Multi City', val: 3 },
    { name: 'Advance Search', val: 4 },
    { name: 'Special Return', val: 5 },
  ];
  
  export const getName = (val) => {
      if(val == 0){
        return 'N/A';
      }
      return JourneyType.find((item) => item.val === val).name
    }
  
  export { JourneyType };