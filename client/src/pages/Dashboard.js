import TinderCard from 'react-tinder-card';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import ChatContainer from '../components/ChatContainer';
import {
  getOneUser,
  getGenderedUsers,
  getUsersWithoutMe,
  updateMatches,
} from '../utils/crud';

export default function Dashboard() {
  const [lastDirection, setLastDirection] = useState();
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [genderedUsers, setGenderedUsers] = useState(null);

  const userId = cookies.UserId;
  console.log(userId);

  const getUser = async (id) => {
    try {
      const response = await getOneUser(id);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGenderedUsers = async (genderInterest) => {
    try {
      const response = await getGenderedUsers(genderInterest);
      setGenderedUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEveryOne = async (id) => {
    try {
      const response = await getUsersWithoutMe(id);
      setGenderedUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser(userId);
  }, []);

  useEffect(() => {
    if (user) {
      if (user.gender_interest === 'everyone') {
        fetchEveryOne(userId);
      }
      fetchGenderedUsers(user.gender_interest);
    }
  }, [user]);

  console.log(user);

  console.log(genderedUsers);

  const getUpdateMatches = async (id, matchedId) => {
    try {
      await updateMatches(id, matchedId);
      getUser(id);
    } catch (error) {
      console.log(error);
    }
  };

  const swiped = (direction, swipedUserId) => {
    if (direction === 'right') {
      getUpdateMatches(userId, swipedUserId);
      console.log(userId, swipedUserId);
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!');
  };
  // const matchedUserIds = user?.matches
  //   .map(({ user_id }) => user_id)
  //   .concat(userId);

  // const filteredGenderedUsers = genderedUsers?.filter(
  //   (genderedUser) => !matchedUserIds.includes(genderedUser.user_id)
  // );

  return (
    <>
      {user && (
        <div className="dashboard">
          <ChatContainer user={user} />
          <div className="swiper-container">
            <div className="card-container">
              {genderedUsers?.map((genderedUser) => (
                <TinderCard
                  className="swipe"
                  key={genderedUser.user_id}
                  onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                  onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}
                >
                  <div
                    style={{
                      backgroundImage: 'url(' + genderedUser.url + ')',
                    }}
                    className="card"
                  >
                    <h3>{genderedUser.first_name}</h3>
                  </div>
                </TinderCard>
              ))}

              <div className="swipe-info">
                {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
