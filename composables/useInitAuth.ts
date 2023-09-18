import { UserDto } from '@/types/models';
import { useAuthenStore } from '@/stores/authenStore';
export default () => {
  // const { callAxios } = usePreFetch(ssrContext, redirect);
  const authenStore = useAuthenStore();
  const init = async (): Promise<UserDto | null> => {
    const userData = await getAndSetCurrentUserData();
    console.log('useInitAuth/init/userData', userData);
    // await checkRefreshToken(userData);
    // redirect if require deference path home
    return new Promise((resolve) => {
      authenStore.setAuthen(userData);
      resolve(userData);
    });
  };
  const getAndSetCurrentUserData = async (): Promise<UserDto> => {
    // const data = await callAxios<UserDto>({
    //   API: '/api/user/currentUserData',
    //   method: 'GET',
    // });
    // console.log('currentUserData', data);
    // return new Promise((resolve) => {
    //   resolve(data);
    // });
    return new Promise((resolve) => {
      resolve({
        id: 1,
        email: 'admin@mydomain.com',
        username: 'admin',
        avatarFileId: 30,
        avatar: {
          image: 'https://i.pravatar.cc/960',
          thumbnail: 'https://i.pravatar.cc/175',
        },
        cover: {
          image: 'https://images.unsplash.com/photo-1678664755731-5c893669ea3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
          thumbnail: 'https://images.unsplash.com/photo-1678664755731-5c893669ea3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
        },
        userData: null,
        active: true,
      });
    });
  };
  return { init, getAndSetCurrentUserData };
};
