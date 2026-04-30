const avatarColors = ['bg-red-500', 'bg-orange-500', 'bg-emerald-500', 'bg-teal-500', 'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500'];

export const getRandomAvatarColor = (name: string) => {
  if (!name) return 'bg-gray-500';

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash += name.charCodeAt(i);
  }

  const index = hash % avatarColors.length;

  return avatarColors[index];
};
