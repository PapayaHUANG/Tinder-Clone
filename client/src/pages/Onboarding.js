import { useState } from 'react';
import Nav from '../components/Nav';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../utils/crud';

export default function Onboarding() {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    first_name: '',
    dob_day: '',
    dob_month: '',
    dob_year: '',
    show_gender: false,
    gender_identity: '',
    gender_interest: '',
    url: '',
    about: '',
    matches: [],
  });

  console.log(cookies);
  console.log(formData);

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUser(formData);
      const success = response.status === 200;
      if (success) navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnchange = (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  console.log(formData);

  return (
    <>
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />
      <div className="onboarding">
        <h2>CREATE ACCOUNT</h2>
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="First Name"
              required={true}
              value={formData.first_name}
              onChange={handleOnchange}
            />
            <label>Birthday</label>
            <div className="multiple-input-container">
              <input
                id="dob_day"
                type="number"
                name="dob_day"
                placeholder="DD"
                required={true}
                value={formData.dob_day}
                onChange={handleOnchange}
              />
              <input
                id="dob_month"
                type="number"
                name="dob_month"
                placeholder="MM"
                required={true}
                value={formData.dob_month}
                onChange={handleOnchange}
              />
              <input
                id="dob_year"
                type="number"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                value={formData.dob_year}
                onChange={handleOnchange}
              />
            </div>
            <label>Gender</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-identity"
                type="radio"
                name="gender_identity"
                required={true}
                value="man"
                onChange={handleOnchange}
                checked={formData.gender_identity === 'man'}
              />
              <label htmlFor="man-gender-identity">Man</label>
              <input
                id="woman-gender-identity"
                type="radio"
                name="gender_identity"
                required={true}
                value="woman"
                onChange={handleOnchange}
                checked={formData.gender_identity === 'woman'}
              />
              <label htmlFor="woman-gender-identity">Woman</label>
              <input
                id="more-gender-identity"
                type="radio"
                name="gender_identity"
                required={true}
                value="more"
                onChange={handleOnchange}
                checked={formData.gender_identity === 'more'}
              />
              <label htmlFor="more-gender-identity">More</label>
            </div>
            <label htmlFor="show-gender">Show gender on my profile</label>
            <input
              id="show-gender"
              type="checkbox"
              name="show_gender"
              required={true}
              onChange={handleOnchange}
              checked={formData.show_gender}
            />
            <label>Show me</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-interest"
                type="radio"
                name="gender_interest"
                required={true}
                value="man"
                onChange={handleOnchange}
                checked={formData.gender_interest === 'man'}
              />
              <label htmlFor="man-gender-interest">Man</label>
              <input
                id="woman-gender-interest"
                type="radio"
                name="gender_interest"
                required={true}
                value="woman"
                onChange={handleOnchange}
                checked={formData.gender_interest === 'woman'}
              />
              <label htmlFor="woman-gender-interest">Woman</label>
              <input
                id="everyone-gender-interest"
                type="radio"
                name="gender_interest"
                required={true}
                value="everyone"
                onChange={handleOnchange}
                checked={formData.gender_interest === 'everyone'}
              />
              <label htmlFor="everyone-gender-interest">Everyone</label>
            </div>
            <label htmlFor="about">About me</label>
            <input
              id="about"
              type="text"
              name="about"
              required={true}
              placeholder="I like long walks..."
              value={formData.about}
              onChange={handleOnchange}
            />
            <input type="submit" />
          </section>
          <section>
            <label htmlFor="about">Profile Photo</label>
            <input
              type="url"
              name="url"
              id="url"
              required={true}
              onChange={handleOnchange}
            />
            <div className="photo-container">
              {formData.url && (
                <img src={formData.url} alt="profile pic preview" />
              )}
            </div>
          </section>
        </form>
      </div>
    </>
  );
}
