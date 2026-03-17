export const CAREER_START_DATE = new Date("2022-06-01");

export const calculateExperience = () => {
  const today = new Date();
  let years = today.getFullYear() - CAREER_START_DATE.getFullYear();
  const monthDiff = today.getMonth() - CAREER_START_DATE.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < CAREER_START_DATE.getDate())) {
    years--;
  }

  return years;
};

export const YEARS_OF_EXPERIENCE = calculateExperience();
