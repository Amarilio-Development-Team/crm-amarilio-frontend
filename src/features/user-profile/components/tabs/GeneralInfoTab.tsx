import React from 'react';
import UserAvatarPreview from '../components/UserAvatarPreview';
import UserInfo from '../components/UserInfo';

const GeneralInfoTab: React.FC = () => {
  return (
    <section className="flex w-full flex-col gap-4">
      <article>
        <h2 className="text-medium text-lg font-bold">Información General</h2>
        <p className="text-low text-sm font-light">Actualiza aquí tu foto de perfil y tu información personal.</p>
      </article>

      <article className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
        <div className="col-span-1">
          <UserAvatarPreview name="John Doe" />
        </div>

        <div className="col-span-1 md:col-span-2">
          <UserInfo id="62734234" name="John Doe" paternalName="Doe" maternalName="Smith" email="john.doe@example.com" phoneNumber="1234567890" state="Morelos" />
        </div>
      </article>
    </section>
  );
};
export default GeneralInfoTab;
