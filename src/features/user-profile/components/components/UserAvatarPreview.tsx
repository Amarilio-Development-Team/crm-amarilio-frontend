import { getRandomAvatarColor } from '@/shared/utils/random-avatar-color';
import Image from 'next/image';
import React from 'react';

interface UserAvatarPreviewProps {
  avatarUrl?: string;
  name: string;
}

const UserAvatarPreview: React.FC<UserAvatarPreviewProps> = ({ avatarUrl, name }) => {
  return (
    <article className="container-color relative flex h-full min-h-[350px] w-full flex-col items-center justify-center gap-4 rounded-md">
      <div className="absolute top-4 flex flex-col gap-0.5 px-6">
        <h5 className="text-medium text-lg font-semibold">Foto de perfil</h5>
        <p className="text-low text-sm font-light">Actualiza tu foto de perfil para que tus compañeros puedan reconocerte fácilmente.</p>
      </div>

      <div className="flex flex-col items-center gap-2.5">
        {avatarUrl ? (
          <Image src={avatarUrl} width={80} height={80} alt="Vista previa" className="size-[70px] rounded-full object-cover lg:size-20" />
        ) : (
          <div className="avatar placeholder">
            <div className={`w-12 rounded-full border border-white/20 text-white ${getRandomAvatarColor(name)}`}>
              <span className="text-lg font-bold">{name.charAt(0).toUpperCase()}</span>
            </div>
          </div>
        )}

        <button className="rounded-md border px-2 py-1.5 text-sm transition-all duration-200 hover:bg-primary hover:text-black">Subir nueva foto</button>
        <button className="text-sm text-red-500">Eliminar foto</button>
      </div>
    </article>
  );
};

export default UserAvatarPreview;
