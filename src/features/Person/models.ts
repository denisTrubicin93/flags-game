export type Profile = {
  gender: 'male' | 'female' | 'unknown';
  age: number;
  emotion: string;
  marriage: boolean;
  haveChildren: boolean;
};

const isProfile = (arg: unknown): arg is Profile => {
  const u = arg as Profile;

  return (
    typeof u?.gender === 'string' &&
    typeof u?.age === 'number' &&
    typeof u?.emotion === 'string' &&
    typeof u?.marriage === 'boolean' &&
    typeof u?.haveChildren === 'boolean'
  );
};

const getAgeLabel = (age: number): string => {
  if (age < 20) return '';
  if (age < 30) return '20代';
  if (age < 40) return '30代';
  if (age < 50) return '40代';
  if (age < 60) return '50代';
  if (age < 70) return '60代';
  return '';
};

const getGenderLabel = (gender: 'male' | 'female' | 'unknown'): string => {
  if (gender === 'male') return '男性';
  if (gender === 'female') return '女性';
  if (gender === 'unknown') return '';
  return '';
};

const getMarriageLabel = (marriage: boolean) => {
  return marriage ? '既婚' : '未婚';
};

const getHaveChildrenLabel = (haveChildren: boolean) => {
  return haveChildren ? 'いる' : 'いない';
};

export {
  isProfile,
  getAgeLabel,
  getGenderLabel,
  getMarriageLabel,
  getHaveChildrenLabel,
};
