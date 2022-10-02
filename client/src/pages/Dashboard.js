import TinderCard from 'react-tinder-card';
import { useState, useEffect, useRef, useCallback } from 'react';
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
  const [matches, setMatches] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [genderedUsers, setGenderedUsers] = useState(null);
  const isMounted = useRef(false);

  const userId = cookies.UserId;

  const getUser = async (id) => {
    try {
      const response = await getOneUser(id);
      setUser(response.data);
      setMatches(response.data.matches);
    } catch (error) {
      console.log(error);
    }
  };

  const matchedUserIds = user?.matches
    .map(({ user_id }) => user_id)
    .concat(userId);

  const fetchGenderedUsers = async (genderInterest) => {
    try {
      const response = await getGenderedUsers(genderInterest);
      const users = response.data;
      const filteredUsers = users?.filter(
        (user) => !matchedUserIds.includes(user.user_id)
      );
      setGenderedUsers(filteredUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEveryOne = async (id) => {
    try {
      const response = await getUsersWithoutMe(id);
      const users = response.data;
      const filteredUsers = await users?.filter(
        (user) => !matchedUserIds.includes(user.user_id)
      );
      setGenderedUsers(filteredUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const swiped = async (direction, swipedUserId) => {
    console.log(direction, swipedUserId);
    if (direction === 'right') {
      isMounted.current = true;
      if (isMounted.current) {
        await getUpdateMatches(user.user_id, swipedUserId);
      }
      return () => {
        isMounted.current = false;
      };
    }
    setLastDirection(direction);
  };

  useEffect(() => {
    isMounted.current = true;
    if (isMounted.current) {
      getUser(userId);
    }
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    isMounted.current = true;
    if (isMounted) {
      if (user) {
        if (user.gender_interest === 'everyone') {
          fetchEveryOne(user?.user_id);
        } else {
          fetchGenderedUsers(user?.gender_interest);
        }
      }
    }
    return () => {
      isMounted.current = false;
    };
  }, [user]);

  console.log(user);
  console.log(matches);

  const getUpdateMatches = async (id, matchedId) => {
    try {
      await updateMatches(id, matchedId);
      getUser(userId);
    } catch (error) {
      console.log(error);
    }
  };

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!');
  };

  return (
    <>
      {user && matches && (
        <div className="dashboard">
          <ChatContainer user={user} matches={matches} />
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
