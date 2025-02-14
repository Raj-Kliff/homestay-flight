const flightClass = [
  { name: 'All', val: 1 },
  { name: 'Economy', val: 2 },
  { name: 'PremiumEconomy', val: 3 },
  { name: 'Business', val: 4 },
  { name: 'PremiumBusiness', val: 5 },
  { name: 'First', val: 6 },
];

export const getCabinClassName = (val) => {
    if(val == 0){
      return 'N/A';
    }
    return flightClass.find((item) => item.val === val).name
  }

export { flightClass };