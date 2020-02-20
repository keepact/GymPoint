import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateAvatar } from '~/store/modules/user';

import { Container } from './styles';

function AvatarInput() {
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.user);

  const handleChange = e => {
    dispatch(updateAvatar(e.target.files[0]));
  };

  return (
    <Container>
      <label htmlFor="avatar_id">
        <img
          src={
            profile
              ? profile.avatar.url
              : 'https://api.adorable.io/avatars/50/abott@adorable.png'
          }
          alt="avatar ou foto do usuário"
        />

        <input
          type="file"
          id="avatar_id"
          accept="image/*"
          data-file={profile && profile.avatar.id}
          onChange={handleChange}
        />
      </label>
    </Container>
  );
}

export default AvatarInput;
