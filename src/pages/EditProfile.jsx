// src/pages/EditProfile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, Stack } from '@mui/material';

import EditProfileHeader from '../components/editProfile/EditProfileHeader/EditProfileHeader';
import PersonalInfoSection from '../components/editProfile/PersonalInfoSection/PersonalInfoSection';
import BirthdatePicker from '../components/editProfile/BirthdatePicker/BirthdatePicker';
import LocationField from '../components/editProfile/LocationField/LocationField';
import ProfessionPicker from '../components/editProfile/ProfessionPicker/ProfessionPicker';
import InterestsSection from '../components/editProfile/InterestsSection/InterestsSection';
import SaveButtons from '../components/editProfile/SaveButtons/SaveButtons';

const EditProfile = ({ currentUser = {}, updateUser }) => {
  const navigate = useNavigate();

  // Safe default values so no errors if data is missing
  const safeUser = {
    name: '',
    username: '',
    bio: '',
    profilePic: '',
    birthdate: '',
    location: '',
    profession: '',
    interests: [],
    privacy: { location: true, profession: true, birthdate: true, interests: true },
    ...currentUser
  };

  // All states for the form
  const [name, setName] = useState(safeUser.name);
  const [username, setUsername] = useState(safeUser.username);
  const [bio, setBio] = useState(safeUser.bio);
  const [profilePic, setProfilePic] = useState(safeUser.profilePic);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [location, setLocation] = useState(safeUser.location);
  const [profession, setProfession] = useState(safeUser.profession);
  const [interests, setInterests] = useState(safeUser.interests || []);
  const [interestInput, setInterestInput] = useState('');
  const [privacy, setPrivacy] = useState(safeUser.privacy);

  // Fill birthdate fields when currentUser has birthdate
  useEffect(() => {
    if (safeUser.birthdate) {
      const date = new Date(safeUser.birthdate);
      if (!isNaN(date.getTime())) {
        setDay(date.getDate());
        const months = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        setMonth(months[date.getMonth()]);
        setYear(date.getFullYear());
      }
    }
  }, [safeUser.birthdate]);

  // Save all changes
  const handleSave = () => {
    let birthdate = null;
    if (day && month && year) {
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const monthIndex = months.indexOf(month);
      if (monthIndex !== -1) {
        birthdate = new Date(year, monthIndex, day).toISOString();
      }
    }

    const updatedUser = {
      ...currentUser,
      name,
      username,
      bio,
      profilePic,
      birthdate,
      location,
      profession,
      interests,
      privacy
    };

    updateUser(updatedUser);
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5efe6', py: 6 }}>
      <Paper elevation={6} sx={{ maxWidth: 900, mx: 'auto', p: { xs: 3, sm: 5 }, borderRadius: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#3b2a20' }}>
          Edit Profile
        </Typography>

        {/* Profile picture section */}
        <EditProfileHeader
          profilePic={profilePic}
          setProfilePic={setProfilePic}
          currentUser={currentUser}
        />

        {/* All other sections */}
        <Stack spacing={5} mt={3}>
          <PersonalInfoSection
            name={name}
            setName={setName}
            username={username}
            setUsername={setUsername}
            bio={bio}
            setBio={setBio}
          />

          <BirthdatePicker
            day={day}
            setDay={setDay}
            month={month}
            setMonth={setMonth}
            year={year}
            setYear={setYear}
            privacy={privacy}
            setPrivacy={setPrivacy}
          />

          <LocationField
            location={location}
            setLocation={setLocation}
            privacy={privacy}
            setPrivacy={setPrivacy}
          />

          <ProfessionPicker
            profession={profession}
            setProfession={setProfession}
            privacy={privacy}
            setPrivacy={setPrivacy}
          />

          <InterestsSection
            interests={interests}
            setInterests={setInterests}
            interestInput={interestInput}
            setInterestInput={setInterestInput}
            privacy={privacy}
            setPrivacy={setPrivacy}
          />

          <SaveButtons onSave={handleSave} onCancel={() => navigate('/')} />
        </Stack>
      </Paper>
    </Box>
  );
};

export default EditProfile;