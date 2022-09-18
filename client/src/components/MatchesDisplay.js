import { useState, useEffect } from 'react';
import { getManyUsers } from '../utils/crud';
export default function MatchesDisplay({ matches, setClickedUser }) {
  const [matchedProfiles, setMatchedProfiles] = useState(null);
  const matchedUserId = matches.map(({ user_id }) => user_id);

  const getMatches = async (userIds) => {
    try {
      const response = await getManyUsers(userIds);
      setMatchedProfiles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMatches(matchedUserId);
  }, []);

  console.log(matchedProfiles);

  return (
    <div className="matches-display">
      {matchedProfiles?.map((match, _index) => {
        return (
          <div
            key={_index}
            className="match-card"
            onClick={() => setClickedUser(match)}
          >
            <div className="img-container">
              <img
                src={match?.url}
                alt={`${match?.first_name}'s profile image`}
              />
            </div>
            <h3>{match?.first_name}</h3>
          </div>
        );
      })}
    </div>
  );
}
