import React, { useEffect, useState } from 'react'
import './UserView.css'
import { Button } from '../../components/common/Button/Button'
import { UserMenuHeader } from '../../components/UserMenuHeader/UserMenuHeader'
import { useDispatch } from 'react-redux'
import { UserAvatarBig } from '../../components/UserAvatarBig/UserAvatarBig'
import { setJwt } from '../../store/slices/user-slice'
import { api } from '../../utils/api/api'
import { HttpMethods } from '../../types/http-methods'
import { useUserDataAuth } from '../../hooks/useUserDataAuth'
import {
  openAccountSettings,
  openAddAnnouncement,
  openAnnouncements,
  openNone,
} from '../../store/slices/app-slice'
import { ErrorResponse, UserLogoutResponse } from 'types';
import { apiUrl } from '../../config'

export const UserView = () => {
  const [error, setError] = useState<string | null>(null);
  const [logoutStatus, setLogoutStatus] = useState<number | null>(null);

  const dispatch = useDispatch();
  const userData = useUserDataAuth();

  useEffect(() => {
    // if (!userData) dispatch(openNone());
  }, [userData]);

  useEffect(() => {
    if(logoutStatus === 200) {
      dispatch(setJwt(null));
      dispatch(openNone());
    }
  }, [logoutStatus]);

  const goBackHandler = () => {
    dispatch(openNone());
  }

  const logoutHandler = async () => {
    const logoutData = await api<UserLogoutResponse>(`${apiUrl}/auth/logout`, {
      method: HttpMethods.DELETE
    });

    if(logoutData.status === 200) setLogoutStatus(200);
    else setError((logoutData.data as ErrorResponse)?.error || null)
  }

  const goAccountSettingsHandler = () => {
    dispatch(openAccountSettings(null));
  }

  const goAddAnnouncementHandler = () => {
    dispatch(openAddAnnouncement());
  }

  const goAnnouncementHandler = () => {
    dispatch(openAnnouncements(null));
  }

  return(
    <section className="UserView">
      <UserMenuHeader title="Użytkownik" onClick={goBackHandler}/>
      <div className="UserView__avatar">
        <UserAvatarBig/>
      </div>

      <h3 className="UserView__name">{userData?.firstName + ' ' + userData?.lastName}</h3>

      {error && <p className="UserView__error">{error}</p>}
      <nav className="UserView__buttons-container">
        <Button onClick={goAnnouncementHandler}>Twoje ogłoszenia</Button>
        <Button onClick={goAddAnnouncementHandler}>Dodaj ogłoszenie</Button>
        <Button onClick={goAccountSettingsHandler}>Zarządzaj kontem</Button>
      </nav>

      <nav className="UserView__buttons-container">
        <Button onClick={logoutHandler}>Wyloguj się</Button>
      </nav>
    </section>
  );
}
